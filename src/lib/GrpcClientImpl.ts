import { PubSubServiceClient } from "./message_grpc_pb";
import { ChannelCredentials } from "@grpc/grpc-js";
import { ApophisError } from "./ApophisError";
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import { GrpcClient } from "./GrpcClient";
import {
    DropRequest,
    InfoRequest,
    MessageCommit,
    MessageHistoryRequest,
    MessageHistoryResponse,
    PubMessageRequest,
    PubRequest,
    PurgeRequest,
    SubscribeMessage,
    SubscribeRequest, UnSubscribeRequest,
    PingRequest,
} from "./message_pb";
import {
    CreateInput,
    CreateOutput,
    DropInput,
    DropOutput,
    InfoOutput,
    MessageHistoryCall,
    MessageHistoryInput,
    PingOutput,
    PublishInput,
    PublishOutput,
    PurgeOutput,
    SubscribeCall,
    SubscribeConfirm,
    SubscribeInput,
    Target
} from "./ApophisData";
import { Logger } from "./Logger";
import { jsonMarshall, jsonUnmarshall } from "./Util";

export class GrpcClientImpl implements GrpcClient {
    private readonly _host: string;
    private readonly _port: number;
    private readonly _insecure: boolean;
    private _selfDisconnect: boolean;
    private readonly _id: string;
    private readonly logger: Logger;
    private _client: PubSubServiceClient;

    constructor(host: string, port: number, insecure?: boolean, logger?: Logger) {
        this._host = host;
        this._port = port;
        this._selfDisconnect = false;
        this._insecure = insecure === undefined ? true : insecure;
        this._id = Math.random().toString(36).substring(7);
        this.logger = logger || new Logger();
    }

    getId(): string {
        return this._id;
    }

    connect(waitSeconds?: number): Promise<GrpcClient> {
        let ops: any;
        if (this._insecure) {
            ops = ChannelCredentials.createInsecure();
        } else {
            ops = ChannelCredentials.createSsl();
        }
        return new Promise<GrpcClient>((resolve, reject) => {
            this._client = new PubSubServiceClient(`${this._host}:${this._port}`, ops);
            const deadline = new Date();
            deadline.setSeconds(deadline.getSeconds() + (waitSeconds || 5));
            this._client.waitForReady(deadline, (err: Error) => {
                if (err) {
                    this.logger.error("connect error:", err);
                    reject(new ApophisError('ServiceUnavailable', err.message));
                    return;
                }
                this.logger.debug(`connect queue: ${this._host} ${this._port}`);
                resolve(this);
            });
        });
    }

    create(target: Target, input: CreateInput): Promise<CreateOutput> {
        const req = new PubRequest();
        req.setDurable(input.durable == undefined ? true : input.durable);
        req.setKeepmessages(input.keepMessages == undefined ? false : input.keepMessages);
        req.setTagsList(input.tags || []);
        req.setUniqid(target.target);
        req.setRetryinterval(input.retryInterval || "5s");
        req.setRetryduration(input.retryDuration || "5m");
        return new Promise((resolve, reject) => {
            if (this.logger.isDebug()) {
                this.logger.debug(`create queue: ${jsonMarshall(req.toObject())}`);
            }
            this._client.create(req, (err, res) => {
                if (err) {
                    this.logger.error("create error:", err);
                    reject(new ApophisError(err.message));
                    return;
                }
                resolve({
                    name: res.getName()
                });
            });
        });
    }

    drop(target: Target, input: DropInput): Promise<DropOutput> {
        const req = new DropRequest();
        req.setUniqid(target.target);
        req.setKeepmessagesread(input.keepHistoryMessage || false);
        return new Promise((resolve, reject) => {
            this._client.drop(req, (err, res) => {
                if (this.logger.isDebug()) {
                    this.logger.debug(`drop queue: ${jsonMarshall(req.toObject())}`);
                }
                if (err) {
                    this.logger.error("drop error:", err);
                    reject(ApophisError.Resolve(err.message));
                    return;
                }
                resolve({
                    name: res.getUniqid(),
                    error: res.getError()?.getReasonList()
                });
            });
        });
    }

    info(target: Target): Promise<InfoOutput> {
        const req = new InfoRequest();
        req.setUniqid(target.target);
        return new Promise((resolve, reject) => {
            this._client.info(req, (err, res) => {
                if (this.logger.isDebug()) {
                    this.logger.debug(`info queue: ${jsonMarshall(req.toObject())}`);
                }
                if (err) {
                    this.logger.error("info error:", err);
                    reject(ApophisError.Resolve(err.message));
                    return;
                }
                resolve({
                    consumers: res.getConsumers(),
                    messages: res.getMessages(),
                    name: res.getName()
                });
            });
        });
    }

    purge(target: Target): Promise<PurgeOutput> {
        const req = new PurgeRequest();
        req.setUniqid(target.target);
        return new Promise((resolve, reject) => {
            this._client.purge(req, (err, res) => {
                if (this.logger.isDebug()) {
                    this.logger.debug(`purge queue: ${jsonMarshall(req.toObject())}`);
                }
                if (err) {
                    this.logger.error("purge error:", err);
                    reject(ApophisError.Resolve(err.message));
                    return;
                }
                resolve({
                    target: res.getUniqid(),
                    name: res.getName()
                });
            });
        });
    }

    ping(): Promise<PingOutput> {
        return new Promise((resolve, reject) => {
            const timestamp = Timestamp.fromDate(new Date());
            const req = new PingRequest()
            req.setNow(timestamp);
            this._client.ping(req, (err, res) => {
                if (this.logger.isDebug()) {
                    this.logger.debug(`ping queue: ${jsonMarshall(req.toObject())}`);
                }
                if (err) {
                    this.logger.error("ping error:", err);
                    reject(ApophisError.Resolve(err.message));
                    return;
                }

                const now = res.getNow();

                resolve({
                    latency: res.getLatency(),
                    now: now?.toDate(),
                });
            });
        });
    }

    publish(target: Target, input: PublishInput): Promise<PublishOutput> {
        const req = new PubMessageRequest();
        req.setUniqid(target.target);
        req.setContenttype(input.contentType);
        req.setBody(input.body instanceof Buffer ? new Uint8Array(input.body) : input.body);

        req.setTagsList(input.tags || []);
        if (input.headers) {
            for (const [key, value] of Object.entries(input.headers)) {
                req.getHeadersMap().set(key, value);
            }
        }
        if (input.trackingId) {
            req.setTrackingid(input.trackingId);
        }
        if (input.customId) {
            req.setCustomid(input.customId);
        }
        return new Promise((resolve, reject) => {
            this._client.publish(req, (err, res) => {
                if (this.logger.isDebug()) {
                    this.logger.debug(`publish queue: ${jsonMarshall(req.toObject())}`);
                }
                if (err) {
                    this.logger.error("publish error:", err);
                    reject(ApophisError.Of(err));
                    return;
                }
                resolve({
                    id: res.getMsgid(),
                });
            });
        });
    }

    async subscribe(target: Target, input: SubscribeInput, call: SubscribeCall): Promise<void> {
        const stream = this._client.subscribe();
        const timer = setInterval(() => {
            if (this._selfDisconnect) {
                clearInterval(timer);
                const unSing = new UnSubscribeRequest();
                unSing.setUniqid(target.target);
                const sub = new SubscribeMessage();
                sub.setUnsing(unSing)
                try {
                    if (this.logger.isDebug()) {
                        this.logger.debug(`unsubscribe queue: ${jsonMarshall(unSing.toObject())}`);
                    }
                    stream.write(sub);
                } catch (e) {
                    this.logger.error("💣 subscribe error:", e);
                }
            }
        }, 1500);

        return new Promise<void>((resolve, reject) => {
            stream.on('data', (msg: SubscribeMessage) => {
                const resp = new SubscribeMessage();
                const headers: { [key: string]: any; } = {};

                msg.getHeadersMap().forEach((v: string, k: any) => {
                    headers[k] = v;
                    resp.getHeadersMap().set(k, v);
                })

                resp.setId(msg.getId());
                resp.setUniqid(msg.getUniqid());
                resp.setDeliverytag(msg.getDeliverytag());
                resp.setChannelcode(msg.getChannelcode());
                resp.setMime(msg.getMime());

                const confirm: SubscribeConfirm = new class implements SubscribeConfirm {
                    Discard() {
                        resp.setCommit(MessageCommit.DISCARD);
                        stream.write(resp);
                    }
                    OK() {
                        resp.setCommit(MessageCommit.OK);
                        stream.write(resp);
                    }
                    Retry(headers?: { [p: string]: string }) {
                        if (headers) {
                            for (const [key, value] of Object.entries(headers)) {
                                resp.getHeadersMap().set(key, value);
                            }
                        }

                        resp.setBody(msg.getBody_asU8());
                        resp.setCommit(MessageCommit.RETRY);
                        stream.write(resp);
                    }
                };

                const recmsg = {
                    id: msg.getId(),
                    mimeType: msg.getMime(),
                    headers: headers,
                    body: Buffer.from(msg.getBody_asU8())
                };

                if (this.logger.isDebug()) {
                    this.logger.debug(`subscribe queue: ${jsonMarshall(recmsg)}`);
                }

                call(recmsg, confirm)?.catch(_ => {
                    confirm.Discard();
                });
            });
            stream.on('end', resolve);
            stream.on('error', (err: any) => reject(ApophisError.Of(err)));
            stream.on('close', () => {
                if (this._selfDisconnect) {
                    reject(new ApophisError('SelfDisconnected', 'self disconnected'));
                }
            });

            const sing = new SubscribeRequest();
            sing.setUniqid(target.target);
            sing.setParallelism(input.parallelism || 1);
            const sub = new SubscribeMessage();
            sub.setSign(sing);
            stream.write(sub);
        })
            .catch(async (err: any) => {
                stream.destroy();
                if (err.code === 'UnSing') {
                    return Promise.reject(err);
                }
                if (err.code === 'SelfDisconnected') {
                    return Promise.reject(err);
                }
                if (err.code === 'QueueNotFound') {
                    return Promise.reject(err);
                }
                await new Promise(resolve => setTimeout(resolve, 5000))
                this.logger.error("💣 subscribe error:", err);
                return this.subscribe(target, input, call)
            });
    }

    messages(target: Target, input: MessageHistoryInput, call: MessageHistoryCall): Promise<void> {
        const req = new MessageHistoryRequest();
        if (input.id) {
            req.setId(input.id);
        }
        req.setUniqid(target.target);
        req.setStatusList(input.status);
        req.setTagsList(input.tags);
        req.setSkip(input.skip || 0);
        req.setLimit(input.limit || 100);

        const stream = this._client.messageHistory(req);
        return new Promise<void>((resolve, reject) => {
            stream.on('data', (msg: MessageHistoryResponse) => {
                call({
                    id: msg.getId(),
                    mimeType: msg.getMime(),
                    tags: msg.getTagsList(),
                    body: Buffer.from(msg.getBody_asU8()),
                    headers: jsonUnmarshall(msg.getHeaders_asU8()),
                    tracking: jsonUnmarshall(msg.getHeaders_asU8()),
                })
            })
            stream.on('end', resolve);
            stream.on('error', reject);
        });
    }

    disconnect(): void {
        this._selfDisconnect = true;
        if (this._client) {
            try {
                this.logger.debug("disconnect queue:");
                this._client.close();
            } catch (ignore) { }
        }
    }

    isConnect(): boolean {
        return this._client && this._client.getChannel().getConnectivityState(false) === 2;
    }

    equals(other: GrpcClient): boolean {
        return this.getId() === other.getId();
    }
}
