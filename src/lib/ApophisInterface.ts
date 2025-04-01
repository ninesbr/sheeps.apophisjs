import {
    CreateInput,
    CreateOutput,
    DropOutput,
    InfoOutput, 
    MessageHistoryCall, 
    MessageHistoryInput, 
    PingOutput, 
    PublishInput, 
    PublishOutput,
    PurgeOutput, 
    SubscribeCall
} from "./ApophisData";

export interface ApophisInterface {

    create(input?: CreateInput): Promise<CreateOutput>;

    drop(keepHistoryMessage?: boolean): Promise<DropOutput>;

    info(): Promise<InfoOutput>;

    purge(): Promise<PurgeOutput>;

    publish(input: PublishInput): Promise<PublishOutput>;

    subscribe(call: SubscribeCall, parallelism?: number): Promise<void>;

    messages(input: MessageHistoryInput, call: MessageHistoryCall): Promise<void>;

    disconnect(): void;

    isConnected(): boolean;

    ping(): Promise<PingOutput>;
}