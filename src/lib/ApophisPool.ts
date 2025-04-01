import { 
    CreateInput, 
    CreateOutput, 
    DropOutput, 
    InfoOutput, 
    PurgeOutput, 
    PublishInput, 
    PublishOutput, 
    SubscribeCall, 
    MessageHistoryInput, 
    MessageHistoryCall, 
    PingOutput, 
    ApophisConfiguration
} from "./ApophisData";
import { ApophisInterface } from "./ApophisInterface";
import { Logger, NewLogger } from "./Logger";
import { ClientPoolUsage } from "./ClientPoolUsage";
import { GrpcClient } from "./GrpcClient";

export class ApophisPool implements ApophisInterface {

    private readonly pool: ClientPoolUsage;
    private readonly logger: Logger;
    
    constructor(pool: ClientPoolUsage) {
        this.pool = pool;
        this.logger = NewLogger(pool.getConfiguration().logLevel);
    }

    create(input?: CreateInput): Promise<CreateOutput> {
        const target = this.pool.configuraion.name;
        this.pool.configuraion.queueDefinition = input;
        return this.pool.exec(async (session: GrpcClient) => {
            return await session.create({ target }, this.pool.configuraion.queueDefinition);
        });
    }

    drop(keepHistoryMessage?: boolean): Promise<DropOutput> {
        const target = this.pool.configuraion.name;
        return this.pool.exec(async (session: GrpcClient) => {
            return await session.drop({ target }, { keepHistoryMessage });
        });
    }

    info(): Promise<InfoOutput> {
        const target = this.pool.configuraion.name;
        return this.pool.exec(async (session: GrpcClient) => {
            return await session.info({ target });
        });
    }

    purge(): Promise<PurgeOutput> {
        const target = this.pool.configuraion.name;
        return this.pool.exec(async (session: GrpcClient) => {
            return await session.purge({ target });
        });
    }

    publish(input: PublishInput): Promise<PublishOutput> {
        const target = this.pool.configuraion.name;
        return this.pool.exec(async (session: GrpcClient) => {
            try {
                return await session.publish({ target }, input);
            }
            catch (e: any) {
                if (e.code && e.code === 'QueueNotFound') {
                    this.logger.info('QueueNotFound, trying to create queue');
                    if (this.pool.configuraion.queueDefinition) {
                        await session.create({ target }, this.pool.configuraion.queueDefinition);
                        return await session.publish({ target }, input);
                    }
                }
            }
        });
    }

    subscribe(call: SubscribeCall, parallelism?: number): Promise<void> {
        const target = this.pool.configuraion.name;

        return this.pool.exec(async (session: GrpcClient) => {
            try {
                return await session.subscribe({ target }, { parallelism }, call);
            } catch (e: any) {
                if (e.code && e.code === 'QueueNotFound') {
                    this.logger.info('QueueNotFound, trying to create queue');
                    if (this.pool.configuraion.queueDefinition) {
                        await session.create({ target }, this.pool.configuraion.queueDefinition);
                        return await session.subscribe({ target }, { parallelism }, call);
                    }
                }
            }
        });
    }

    messages(input: MessageHistoryInput, call: MessageHistoryCall): Promise<void> {
        const target = this.pool.configuraion.name;
        return this.pool.exec(async (session: GrpcClient) => {
            return await session.messages({ target }, input, call);
        });
    }

    disconnect(): void {
        this.pool.destroyQuietly();
    }

    isConnected(): boolean {
        return this.pool.isConnect();
    }

    ping(): Promise<PingOutput> {
        return this.pool.exec(async (session: GrpcClient) => {
            return await session.ping();
        });
    }

    static Create(config: ApophisConfiguration): ApophisInterface {
        return new ApophisPool(ClientPoolUsage.create(config));
    }

}