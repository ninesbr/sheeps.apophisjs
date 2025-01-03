import {
    CreateInput,
    CreateOutput,
    DropInput,
    DropOutput,
    InfoInput,
    InfoOutput,
    MessageHistoryCall,
    MessageHistoryInput,
    PublishInput,
    PublishOutput,
    PurgeInput,
    PurgeOutput, SubscribeCall, SubscribeInput, Target
} from "./apophis.data";

export interface ApophisServerInterface {
    connect(waitSeconds?: number): Promise<ApophisServerInterface>;

    create(target: Target, input: CreateInput): Promise<CreateOutput>;

    drop(target: Target,input: DropInput): Promise<DropOutput>;

    info(target: Target): Promise<InfoOutput>;

    purge(target: Target): Promise<PurgeOutput>;

    publish(target: Target, input: PublishInput): Promise<PublishOutput>;

    subscribe(target: Target, input: SubscribeInput, call: SubscribeCall): Promise<void>;

    messages(target: Target, input: MessageHistoryInput, call: MessageHistoryCall): Promise<void>;

    ping(): Promise<any>;

    disconnect();

    isConnect(): boolean;
}