import {PubSubServiceClient} from "../proto/message_grpc_pb";
import {ChannelCredentials} from "@grpc/grpc-js";
import {
    DropRequest,
    InfoRequest,
    MessageCommit, MessageHistoryRequest, MessageHistoryResponse, PubMessageRequest,
    PubRequest,
    PurgeRequest,
    SubscribeMessage,
    SubscribeRequest
} from "../proto/message_pb";

export declare type ApophisReadFunc = (msg: Uint8Array | null) => Promise<MessageCommit>;

export class ApophisError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "ApophisError";
    }
}

export interface Create {
    name: string
    durable?: boolean
    keepMessages?: boolean
    tags?: string[]
    retryInterval?: string
    retryDuration?: string
}

export interface Info {
    name: string
}

export interface Purge {
    name: string
}

export interface Drop {
    name: string
    keepHistoryMessage?: boolean
}

export interface PubMessage {
    name: string
    contentType: string
    headers?: { [key: string]: string; }
    body: Buffer
    tags?: string[]
}

export interface MessageHistory {
    id?: string
    name: string
    tags?: string[]
    status?: string[]
    skip?: number
    limit?: number
}

export class ServerApophis {
    private readonly _host: string;
    private readonly _port: number;
    private _client: PubSubServiceClient;

    constructor(host: string, port: number) {
        this._host = host;
        this._port = port;
    }

    open() {
        try {
            this._client = new PubSubServiceClient(`${this._host}:${this._port}`, ChannelCredentials.createSsl())
        } catch (err: any) {
            throw new ApophisError(err.message)
        }
    }

    create(input: Create): Promise<any> {
        const req = new PubRequest();
        req.setDurable(input.durable || true)
        req.setKeepmessages(input.keepMessages || true)
        req.setTagsList(input.tags || [])
        req.setUniqid(input.name)
        req.setRetryinterval(input.retryInterval || "5s")
        req.setRetryduration(input.retryDuration || "5m")
        return new Promise((resolve, reject) => {
            this._client.create(req, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    subscribe(call: ApophisReadFunc): Promise<any> {
        console.log("start subscribe..")
        this.open()
        const stream = this._client.subscribe();
        return new Promise<void>((resolve, reject) => {
            stream.on('data', (msg: SubscribeMessage) => {

                call(msg.getBody() as Uint8Array).then((c: MessageCommit) => {
                    const resp = new SubscribeMessage()
                    resp.setId(msg.getId())
                    resp.setUniqid(msg.getUniqid())
                    resp.setDeliverytag(msg.getDeliverytag())
                    resp.setChannelcode(msg.getChannelcode())
                    resp.setCommit(c)
                    stream.write(resp)
                })


            });
            stream.on('end', resolve);
            stream.on('error', reject);

            const sing = new SubscribeRequest()
            sing.setUniqid("minalba")
            sing.setParallelism(1)
            const sub = new SubscribeMessage()
            sub.setSign(sing)

            stream.write(sub);
        })
            .catch(err => {
                console.log(err.message)
                try {
                    stream.destroy()
                    console.log('destroyed stream')
                } catch (err: any) {
                    console.log("error in destroy:", err.message)
                }
                return this.subscribe(call)
            })
    }

    publish(input: PubMessage): Promise<any> {
        const req = new PubMessageRequest()
        req.setUniqid(input.name)
        req.setContenttype(input.contentType)
        req.setBody(input.body)
        req.setTagsList(input.tags || [])
        for (const [key, value] of Object.entries(input.headers)) {
            req.getHeadersMap().set(key, value)
        }
        return new Promise((resolve, reject) => {
            this._client.publish(req, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    messages(input: MessageHistory) : Promise<any>{
        const req = new MessageHistoryRequest()
        if(input.id) {
            req.setId(input.id)
        }
        req.setUniqid(input.name)
        req.setStatusList(input.status)
        req.setTagsList(input.tags)
        req.setSkip(input.skip)
        req.setLimit(input.limit)

        const stream = this._client.messageHistory(req)
        return new Promise<void>((resolve, reject) => {
            stream.on('data', (msg: MessageHistoryResponse) => {
                console.log( msg.getId() )
            })
            stream.on('end', resolve);
            stream.on('error', reject);
        })
    }

    drop(input: Drop): Promise<any> {
        const req = new DropRequest()
        req.setUniqid(input.name)
        req.setKeepmessagesread(input.keepHistoryMessage || true)
        return new Promise((resolve, reject) => {
            this._client.drop(req, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    purge(input: Purge): Promise<any> {
        const req = new PurgeRequest()
        req.setUniqid(input.name)
        return new Promise((resolve, reject) => {
            this._client.purge(req, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    info(input: Info): Promise<any> {
        const req = new InfoRequest()
        req.setUniqid(input.name)
        return new Promise((resolve, reject) => {
            this._client.info(req, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    }

}
