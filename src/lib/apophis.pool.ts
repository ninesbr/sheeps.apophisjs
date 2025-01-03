import { Pool } from 'sequelize-pool';
import { isEmpty } from "class-validator";
import { Apophis } from './apophis.interface';
import { New } from './apophis';
import { ApophisConfiguration } from './apophis.data';

export class Pooling {

    private readonly pool: Pool<Apophis>;
    private readonly configuration: ApophisConfiguration;
    
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

        this.pool = new Pool({
            name: config.poolName || 'apophisPool',
            create: async (): Promise<Apophis> => {
                return await New({
                    name: config.name,
                    host: config.host,
                    port: config.port,
                    insecure: (config.insecure == undefined) ? true : config?.insecure,
                    readTimeoutInSeconds: config.readTimeoutInSeconds || 30,
                    queueDefinition: config.queueDefinition
                });
            },
            destroy: (conn: Apophis) => {
                conn.disconnect();
            },
            validate: (conn: Apophis): boolean => {
                return conn.isConnected();
            },
            max: config.poolMax || 2,
            min: config.poolMin || 1,
        });
        
        this.configuration = config;
    }

    public async exec <T>(func: (session: Apophis) => Promise<T>): Promise<T>  {
        let apophis: Apophis;
        try {
            apophis = await this.pool.acquire();
            return await func(apophis);
        } catch (e: any) {
            throw e;
        } finally {
            if (apophis) {
                this.pool.release(apophis);
            }
        }
    };

    public async destroy(): Promise<void> {
       await this.pool.drain();
       await this.pool.destroyAllNow();
    }

    public async destroyQuietly(): Promise<void> {
        try {
            await this.destroy();
        } catch (e: any) {
            // do nothing
        }
    }

    public isConnect(): boolean {
        return  this.pool.size > 0;
    }

    get configuraion(): ApophisConfiguration {
        return this.configuration;
    }

    public static Create(config: ApophisConfiguration): Pooling {
        return new Pooling(config);
    }
}