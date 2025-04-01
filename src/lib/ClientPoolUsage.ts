import { ApophisConfiguration } from './ApophisData';
import { GenericPool } from './GenericPool';
import { GrpcClient } from "./GrpcClient";
import { GrpcClientPool } from "./GrpcClientPool";
import { isEmpty } from './Validator';
import { Logger, NewLogger } from './Logger';

export class ClientPoolUsage {

    private readonly pool: GenericPool<GrpcClient>;
    private readonly configuration: ApophisConfiguration;
    private readonly logger: Logger;

    constructor(config: ApophisConfiguration) {

        if (isEmpty(config.name)) {
            throw new Error("name is required");
        }

        if (isEmpty(config.host)) {
            throw new Error("host is required");
        }

        if (isEmpty(config.port)) {
            throw new Error("port is required");
        }

        this.logger = NewLogger(config.logLevel);
        this.pool = new GrpcClientPool(config);
        this.pool.init();

        this.configuration = config;
        
    }

    public async exec<T>(func: (session: GrpcClient) => Promise<T>): Promise<T> {
        let apophis: GrpcClient;
        try {
            const result = await this.pool.checkOut();
            if (result.err) {
                throw result.err;
            }
            apophis = result.obj;
            return await func(apophis);
        } catch (e: any) {
            this.logger.error('error in apophis pool acquire: ', e);
            throw e;
        } finally {
            if (apophis) {
                this.pool.checkIn(apophis);
            }
        }
    }

    public async destroy(): Promise<void> {
        await this.pool.destroyAllNow();
        this.logger.info('destroyed pool');
    }

    public async destroyQuietly(): Promise<void> {
        try {
            await this.destroy();
        } catch (e: any) {
            // do nothing
        }
    }

    public isConnect(): boolean {
        return this.pool.size() > 0;
    }

    get configuraion(): ApophisConfiguration {
        return this.configuration;
    }

    public static create(config: ApophisConfiguration): ClientPoolUsage {
        return new ClientPoolUsage(config);
    }

    getConfiguration(): ApophisConfiguration {
        return this.configuraion;
    }
}