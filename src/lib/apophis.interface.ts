import {
    CreateInput,
    CreateOutput,
    DropOutput,
    InfoOutput, MessageHistoryCall, MessageHistoryInput, PublishInput, PublishOutput,
    PurgeOutput, SubscribeCall
} from "./apophis.data";

export interface Apophis {

    create(input?: CreateInput): Promise<CreateOutput>;

    drop(keepHistoryMessage?: boolean): Promise<DropOutput>;

    info(): Promise<InfoOutput>;

    purge(): Promise<PurgeOutput>;

    publish(input: PublishInput): Promise<PublishOutput>;

    subscribe(call: SubscribeCall, parallelism?: number): Promise<void>;

    messages(input: MessageHistoryInput, call: MessageHistoryCall): Promise<void>;

    disconnect();

    isConnected(): boolean;

    ping(): Promise<any>;

}