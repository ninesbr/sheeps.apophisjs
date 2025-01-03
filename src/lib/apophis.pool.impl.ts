import { CreateInput, CreateOutput, DropOutput, InfoOutput, PurgeOutput, PublishInput, PublishOutput, SubscribeCall, MessageHistoryInput, MessageHistoryCall } from "./apophis.data";
import { Apophis } from "./apophis.interface";
import { Pooling } from "./apophis.pool";

export class ApophisPool implements Apophis {

    private readonly pool: Pooling;

    constructor(pool: Pooling) {
        this.pool = pool;
    }

    create(input?: CreateInput): Promise<CreateOutput> {
        this.pool.configuraion.queueDefinition = input;
        return this.pool.exec(async (session: Apophis) => {
            return await session.create(this.pool.configuraion.queueDefinition);
        });
    }

    drop(keepHistoryMessage?: boolean): Promise<DropOutput> {
        return this.pool.exec(async (session: Apophis) => {
            return await session.drop(keepHistoryMessage);
        });
    }

    info(): Promise<InfoOutput> {
        return this.pool.exec(async (session: Apophis) => {
            return await session.info();
        });
    }

    purge(): Promise<PurgeOutput> {
        return this.pool.exec(async (session: Apophis) => {
            return await session.purge();
        });
    }

    publish(input: PublishInput): Promise<PublishOutput> {
        return this.pool.exec(async (session: Apophis) => {
            try {
                return await session.publish(input);
            }
            catch (e: any) {
                if (e.code && e.code === 'QueueNotFound') {
                    console.log('QueueNotFound, trying to create queue');
                    if (this.pool.configuraion.queueDefinition) {
                        await session.create(this.pool.configuraion.queueDefinition);
                        return await session.publish(input);
                    }
                }
            }
        });
    }

    subscribe(call: SubscribeCall, parallelism?: number): Promise<void> {
        return this.pool.exec(async (session: Apophis) => {
            try {
                return await session.subscribe(call, parallelism);
            } catch (e: any) {
                if (e.code && e.code === 'QueueNotFound') {
                    console.log('QueueNotFound, trying to create queue');
                    if (this.pool.configuraion.queueDefinition) {
                        await session.create(this.pool.configuraion.queueDefinition);
                        return await session.subscribe(call, parallelism);
                    }
                }
            }
        });
    }

    messages(input: MessageHistoryInput, call: MessageHistoryCall): Promise<void> {
        return this.pool.exec(async (session: Apophis) => {
            return await session.messages(input, call);
        });
    }

    disconnect() {
        this.pool.destroyQuietly();
    }

    isConnected(): boolean {
        return this.pool.isConnect();
    }

    ping(): Promise<any> {
        return this.pool.exec(async (session: Apophis) => {
            return await session.ping();
        });
    }

    static Create(config: any): ApophisPool {
        return new ApophisPool(Pooling.Create(config));
    }

}