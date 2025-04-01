import { ApophisConfiguration } from "./ApophisData";
import { BasicGenericPool } from "./BasicGenericPool";
import { GenericPoolResult } from "./GenericPool";
import { newInstance } from "./GrpcClientFactory";
import { GrpcClient } from "./GrpcClient";

export class GrpcClientPool extends BasicGenericPool<GrpcClient> {
    
    private readonly opts: ApophisConfiguration;

    constructor(opts: ApophisConfiguration) {
        super(opts.poolMin??1 , opts.poolMax??4);
        this.opts = opts;
    }

    async create(): Promise<GenericPoolResult<GrpcClient>> {
        try {
            const apophis = await newInstance(this.opts);
            return { obj: apophis };
        } catch (err) {
            return { obj: null, err: err };
        }
    }

    validate(apophis: GrpcClient): boolean {
        return apophis.isConnect();
    }

    close(apophis: GrpcClient): void {
        apophis.disconnect();
    }

}