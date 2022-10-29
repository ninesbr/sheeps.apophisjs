export interface Target {
    target: string
}

export interface CreateInput {
    durable?: boolean
    keepMessages?: boolean
    tags?: string[]
    retryInterval?: string
    retryDuration?: string
}

export interface CreateOutput {
    name: string
}

export interface DropInput {
    keepHistoryMessage?: boolean
}

export interface DropOutput {
    name: string
}

export interface InfoInput {
}

export interface InfoOutput {
    messages: number,
    consumers: number,
    name: string
}

export interface PurgeInput {
}

export interface PurgeOutput {
    target: string
    name: string
}

export interface SubscribeInput {
    parallelism?: number
}

export interface SubscribeOutput {
    id: string
    mimeType: string
    headers: { [key: string]: any; }
    body: Buffer
}

export enum SubscribeConfirm {
    OK,
    Discard,
    Retry
}

export interface PublishInput {
    contentType: string
    headers?: { [key: string]: string; }
    body: Buffer
    tags?: string[]
}

export interface PublishOutput {
    id: string
}

export interface MessageHistoryInput {
    id?: string
    tags?: string[]
    status?: string[]
    skip?: number
    limit?: number
}

export interface MessageHistoryOutput {
    id: string
    mimeType: string
    headers: { [key: string]: any; }
    tracking: { [key: string]: any; }
    body: Buffer
    tags?: string[]
}

export declare type SubscribeCall = (msg: SubscribeOutput | null) => Promise<SubscribeConfirm>;

export declare type MessageHistoryCall = (msg: MessageHistoryOutput | null) => void;

export interface ApophisConfiguration {
    host: string
    port: number
    insecure?: boolean
    readTimeoutInSeconds?: number
}