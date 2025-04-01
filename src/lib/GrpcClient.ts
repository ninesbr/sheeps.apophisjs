import {
    CreateInput,
    CreateOutput,
    DropInput,
    DropOutput,
    InfoOutput,
    MessageHistoryCall,
    MessageHistoryInput,
    PingOutput,
    PublishInput,
    PublishOutput,
    PurgeOutput,
    SubscribeCall,
    SubscribeInput,
    Target
} from "./ApophisData";
import { Comparable } from "./Comparable";

export interface GrpcClient extends Comparable<GrpcClient> {

    connect(waitSeconds?: number): Promise<GrpcClient>;

    create(target: Target, input: CreateInput): Promise<CreateOutput>;

    drop(target: Target, input: DropInput): Promise<DropOutput>;

    info(target: Target): Promise<InfoOutput>;

    purge(target: Target): Promise<PurgeOutput>;

    publish(target: Target, input: PublishInput): Promise<PublishOutput>;

    subscribe(target: Target, input: SubscribeInput, call: SubscribeCall): Promise<void>;

    messages(target: Target, input: MessageHistoryInput, call: MessageHistoryCall): Promise<void>;

    ping(): Promise<PingOutput>;

    disconnect(): void;

    isConnect(): boolean;

    getId(): string;
}