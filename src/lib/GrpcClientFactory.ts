import { ApophisConfiguration } from "./ApophisData";
import { GrpcClient } from "./GrpcClient";
import { GrpcClientImpl } from "./GrpcClientImpl";
import { Logger, NewLogger } from "./Logger";

export const newInstance = async (config: ApophisConfiguration): Promise<GrpcClient> => {
    const logger: Logger = NewLogger(config.logLevel);
    const server: GrpcClient = new GrpcClientImpl(config.host, config.port, config.insecure, logger);
    await server.connect(config.readTimeoutInSeconds);
    if (config.queueDefinition) {
        await server.create({target: config.name}, config.queueDefinition);
    }
    return server;
}
