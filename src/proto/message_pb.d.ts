// package: pb
// file: message.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Error extends jspb.Message { 
    getCode(): number;
    setCode(value: number): Error;
    clearReasonList(): void;
    getReasonList(): Array<string>;
    setReasonList(value: Array<string>): Error;
    addReason(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Error.AsObject;
    static toObject(includeInstance: boolean, msg: Error): Error.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Error, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Error;
    static deserializeBinaryFromReader(message: Error, reader: jspb.BinaryReader): Error;
}

export namespace Error {
    export type AsObject = {
        code: number,
        reasonList: Array<string>,
    }
}

export class PubRequest extends jspb.Message { 
    getUniqid(): string;
    setUniqid(value: string): PubRequest;
    getDurable(): boolean;
    setDurable(value: boolean): PubRequest;
    getKeepmessages(): boolean;
    setKeepmessages(value: boolean): PubRequest;
    getRetryinterval(): string;
    setRetryinterval(value: string): PubRequest;
    getRetryduration(): string;
    setRetryduration(value: string): PubRequest;

    getPropsMap(): jspb.Map<string, string>;
    clearPropsMap(): void;
    clearTagsList(): void;
    getTagsList(): Array<string>;
    setTagsList(value: Array<string>): PubRequest;
    addTags(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PubRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PubRequest): PubRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PubRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PubRequest;
    static deserializeBinaryFromReader(message: PubRequest, reader: jspb.BinaryReader): PubRequest;
}

export namespace PubRequest {
    export type AsObject = {
        uniqid: string,
        durable: boolean,
        keepmessages: boolean,
        retryinterval: string,
        retryduration: string,

        propsMap: Array<[string, string]>,
        tagsList: Array<string>,
    }
}

export class PurgeRequest extends jspb.Message { 
    getUniqid(): string;
    setUniqid(value: string): PurgeRequest;
    getKeepmessagesread(): boolean;
    setKeepmessagesread(value: boolean): PurgeRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PurgeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PurgeRequest): PurgeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PurgeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PurgeRequest;
    static deserializeBinaryFromReader(message: PurgeRequest, reader: jspb.BinaryReader): PurgeRequest;
}

export namespace PurgeRequest {
    export type AsObject = {
        uniqid: string,
        keepmessagesread: boolean,
    }
}

export class DropRequest extends jspb.Message { 
    getUniqid(): string;
    setUniqid(value: string): DropRequest;
    getKeepmessagesread(): boolean;
    setKeepmessagesread(value: boolean): DropRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DropRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DropRequest): DropRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DropRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DropRequest;
    static deserializeBinaryFromReader(message: DropRequest, reader: jspb.BinaryReader): DropRequest;
}

export namespace DropRequest {
    export type AsObject = {
        uniqid: string,
        keepmessagesread: boolean,
    }
}

export class InfoRequest extends jspb.Message { 
    getUniqid(): string;
    setUniqid(value: string): InfoRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InfoRequest.AsObject;
    static toObject(includeInstance: boolean, msg: InfoRequest): InfoRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InfoRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InfoRequest;
    static deserializeBinaryFromReader(message: InfoRequest, reader: jspb.BinaryReader): InfoRequest;
}

export namespace InfoRequest {
    export type AsObject = {
        uniqid: string,
    }
}

export class PubResponse extends jspb.Message { 
    getUniqid(): string;
    setUniqid(value: string): PubResponse;
    getName(): string;
    setName(value: string): PubResponse;
    getMessages(): number;
    setMessages(value: number): PubResponse;
    getConsumers(): number;
    setConsumers(value: number): PubResponse;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): PubResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PubResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PubResponse): PubResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PubResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PubResponse;
    static deserializeBinaryFromReader(message: PubResponse, reader: jspb.BinaryReader): PubResponse;
}

export namespace PubResponse {
    export type AsObject = {
        uniqid: string,
        name: string,
        messages: number,
        consumers: number,
        error?: Error.AsObject,
    }
}

export class PubMessageRequest extends jspb.Message { 
    getUniqid(): string;
    setUniqid(value: string): PubMessageRequest;
    getContenttype(): string;
    setContenttype(value: string): PubMessageRequest;
    getBody(): Uint8Array | string;
    getBody_asU8(): Uint8Array;
    getBody_asB64(): string;
    setBody(value: Uint8Array | string): PubMessageRequest;

    getHeadersMap(): jspb.Map<string, string>;
    clearHeadersMap(): void;

    hasForcecreate(): boolean;
    clearForcecreate(): void;
    getForcecreate(): PubRequest | undefined;
    setForcecreate(value?: PubRequest): PubMessageRequest;
    clearTagsList(): void;
    getTagsList(): Array<string>;
    setTagsList(value: Array<string>): PubMessageRequest;
    addTags(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PubMessageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PubMessageRequest): PubMessageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PubMessageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PubMessageRequest;
    static deserializeBinaryFromReader(message: PubMessageRequest, reader: jspb.BinaryReader): PubMessageRequest;
}

export namespace PubMessageRequest {
    export type AsObject = {
        uniqid: string,
        contenttype: string,
        body: Uint8Array | string,

        headersMap: Array<[string, string]>,
        forcecreate?: PubRequest.AsObject,
        tagsList: Array<string>,
    }
}

export class PubMessageResponse extends jspb.Message { 
    getUniqid(): string;
    setUniqid(value: string): PubMessageResponse;
    getMsgid(): string;
    setMsgid(value: string): PubMessageResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PubMessageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PubMessageResponse): PubMessageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PubMessageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PubMessageResponse;
    static deserializeBinaryFromReader(message: PubMessageResponse, reader: jspb.BinaryReader): PubMessageResponse;
}

export namespace PubMessageResponse {
    export type AsObject = {
        uniqid: string,
        msgid: string,
    }
}

export class SubscribeRequest extends jspb.Message { 
    getUniqid(): string;
    setUniqid(value: string): SubscribeRequest;
    getParallelism(): number;
    setParallelism(value: number): SubscribeRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubscribeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SubscribeRequest): SubscribeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubscribeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubscribeRequest;
    static deserializeBinaryFromReader(message: SubscribeRequest, reader: jspb.BinaryReader): SubscribeRequest;
}

export namespace SubscribeRequest {
    export type AsObject = {
        uniqid: string,
        parallelism: number,
    }
}

export class SubscribeMessage extends jspb.Message { 
    getId(): string;
    setId(value: string): SubscribeMessage;
    getUniqid(): string;
    setUniqid(value: string): SubscribeMessage;
    getBody(): Uint8Array | string;
    getBody_asU8(): Uint8Array;
    getBody_asB64(): string;
    setBody(value: Uint8Array | string): SubscribeMessage;

    getHeadersMap(): jspb.Map<string, string>;
    clearHeadersMap(): void;
    getCommit(): MessageCommit;
    setCommit(value: MessageCommit): SubscribeMessage;

    hasSign(): boolean;
    clearSign(): void;
    getSign(): SubscribeRequest | undefined;
    setSign(value?: SubscribeRequest): SubscribeMessage;
    getDeliverytag(): number;
    setDeliverytag(value: number): SubscribeMessage;
    getChannelcode(): string;
    setChannelcode(value: string): SubscribeMessage;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubscribeMessage.AsObject;
    static toObject(includeInstance: boolean, msg: SubscribeMessage): SubscribeMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubscribeMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubscribeMessage;
    static deserializeBinaryFromReader(message: SubscribeMessage, reader: jspb.BinaryReader): SubscribeMessage;
}

export namespace SubscribeMessage {
    export type AsObject = {
        id: string,
        uniqid: string,
        body: Uint8Array | string,

        headersMap: Array<[string, string]>,
        commit: MessageCommit,
        sign?: SubscribeRequest.AsObject,
        deliverytag: number,
        channelcode: string,
    }
}

export class MessageHistoryRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): MessageHistoryRequest;
    getUniqid(): string;
    setUniqid(value: string): MessageHistoryRequest;
    clearTagsList(): void;
    getTagsList(): Array<string>;
    setTagsList(value: Array<string>): MessageHistoryRequest;
    addTags(value: string, index?: number): string;
    clearStatusList(): void;
    getStatusList(): Array<string>;
    setStatusList(value: Array<string>): MessageHistoryRequest;
    addStatus(value: string, index?: number): string;
    getSkip(): number;
    setSkip(value: number): MessageHistoryRequest;
    getLimit(): number;
    setLimit(value: number): MessageHistoryRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MessageHistoryRequest.AsObject;
    static toObject(includeInstance: boolean, msg: MessageHistoryRequest): MessageHistoryRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MessageHistoryRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MessageHistoryRequest;
    static deserializeBinaryFromReader(message: MessageHistoryRequest, reader: jspb.BinaryReader): MessageHistoryRequest;
}

export namespace MessageHistoryRequest {
    export type AsObject = {
        id: string,
        uniqid: string,
        tagsList: Array<string>,
        statusList: Array<string>,
        skip: number,
        limit: number,
    }
}

export class MessageHistoryResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): MessageHistoryResponse;
    getUniqid(): string;
    setUniqid(value: string): MessageHistoryResponse;
    getMime(): string;
    setMime(value: string): MessageHistoryResponse;
    getBody(): Uint8Array | string;
    getBody_asU8(): Uint8Array;
    getBody_asB64(): string;
    setBody(value: Uint8Array | string): MessageHistoryResponse;
    getHeaders(): Uint8Array | string;
    getHeaders_asU8(): Uint8Array;
    getHeaders_asB64(): string;
    setHeaders(value: Uint8Array | string): MessageHistoryResponse;
    getTracking(): Uint8Array | string;
    getTracking_asU8(): Uint8Array;
    getTracking_asB64(): string;
    setTracking(value: Uint8Array | string): MessageHistoryResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MessageHistoryResponse.AsObject;
    static toObject(includeInstance: boolean, msg: MessageHistoryResponse): MessageHistoryResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MessageHistoryResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MessageHistoryResponse;
    static deserializeBinaryFromReader(message: MessageHistoryResponse, reader: jspb.BinaryReader): MessageHistoryResponse;
}

export namespace MessageHistoryResponse {
    export type AsObject = {
        id: string,
        uniqid: string,
        mime: string,
        body: Uint8Array | string,
        headers: Uint8Array | string,
        tracking: Uint8Array | string,
    }
}

export enum MessageCommit {
    OK = 0,
    RETRY = 1,
    DISCARD = 2,
}
