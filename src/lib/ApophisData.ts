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
    error?: string[]
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

export interface SubscribeConfirm {
    OK(): void;
    Discard(): void;
    Retry(headers?: { [key: string]: string; }): void;
}

export interface PublishInput {
    contentType: string
    headers?: { [key: string]: string; }
    body: Buffer
    tags?: string[]
    trackingId?: string
    customId?: string
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

export declare type SubscribeCall = (msg: SubscribeOutput | null, confirm: SubscribeConfirm) => Promise<void>;

export declare type MessageHistoryCall = (msg: MessageHistoryOutput | null) => void;

export interface ApophisConfiguration {
    name: string
    host: string
    port: number
    insecure?: boolean
    readTimeoutInSeconds?: number
    queueDefinition?: CreateInput,
    poolMin?: number
    poolMax?: number
    logLevel?: 'debug' | 'info' | 'error' | 'off',
}

export interface PingOutput {
    latency: number
    now?: Date
}