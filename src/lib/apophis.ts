import {Apophis} from "./apophis.interface";
import {
    ApophisConfiguration,
    CreateInput,
    CreateOutput,
    DropOutput,
    InfoOutput,
    MessageHistoryCall,
    MessageHistoryInput, PublishInput, PublishOutput, PurgeOutput, SubscribeCall
} from "./apophis.data";
import {ApophisServerInterface} from "./apophis.server.interfaces";
import {ApophisServer} from "./apophis.server";

export const Create = async (target: string, config: ApophisConfiguration): Promise<Apophis> => {
    const server = new ApophisServer(config.host, config.port, config.insecure);
    await server.connect(config.readTimeoutInSeconds);
    const apophis = new ApophisImpl(target, server);
    if (config.queueDefinition) {
        await apophis.create(config.queueDefinition);
    }
    return apophis;
}

export class ApophisImpl implements Apophis {
    private readonly _server: ApophisServerInterface;
    private readonly _target: string;

    constructor(target: string, server: ApophisServerInterface) {
        this._target = target;
        this._server = server;
    }

    create(input?: CreateInput): Promise<CreateOutput> {
        return this._server.create({target: this._target}, input || {});
    }

    disconnect() {
        this._server.disconnect();
    }

    drop(keepHistoryMessage?: boolean): Promise<DropOutput> {
        return this._server.drop({target: this._target},{
            keepHistoryMessage: keepHistoryMessage,
        });
    }

    info(): Promise<InfoOutput> {
        return this._server.info({target: this._target});
    }

    messages(input: MessageHistoryInput, call: MessageHistoryCall): Promise<void> {
        return this._server.messages({target: this._target},input, call);
    }

    publish(input: PublishInput): Promise<PublishOutput> {
        return this._server.publish({target: this._target},input);
    }

    purge(): Promise<PurgeOutput> {
        return this._server.purge({
            target: this._target
        });
    }

    subscribe(call: SubscribeCall, parallelism?: number): Promise<void> {
        return this._server.subscribe({target: this._target},{
            parallelism: parallelism
        }, call);
    }
}