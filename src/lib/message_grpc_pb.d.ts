// package: pb
// file: message.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as message_pb from "./message_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IPubSubServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    about: IPubSubServiceService_IAbout;
    ping: IPubSubServiceService_IPing;
    create: IPubSubServiceService_ICreate;
    drop: IPubSubServiceService_IDrop;
    purge: IPubSubServiceService_IPurge;
    info: IPubSubServiceService_IInfo;
    publish: IPubSubServiceService_IPublish;
    subscribe: IPubSubServiceService_ISubscribe;
    messageHistory: IPubSubServiceService_IMessageHistory;
}

interface IPubSubServiceService_IAbout extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, message_pb.AboutResponse> {
    path: "/pb.PubSubService/About";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<message_pb.AboutResponse>;
    responseDeserialize: grpc.deserialize<message_pb.AboutResponse>;
}
interface IPubSubServiceService_IPing extends grpc.MethodDefinition<message_pb.PingRequest, message_pb.PingResponse> {
    path: "/pb.PubSubService/Ping";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<message_pb.PingRequest>;
    requestDeserialize: grpc.deserialize<message_pb.PingRequest>;
    responseSerialize: grpc.serialize<message_pb.PingResponse>;
    responseDeserialize: grpc.deserialize<message_pb.PingResponse>;
}
interface IPubSubServiceService_ICreate extends grpc.MethodDefinition<message_pb.PubRequest, message_pb.PubResponse> {
    path: "/pb.PubSubService/Create";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<message_pb.PubRequest>;
    requestDeserialize: grpc.deserialize<message_pb.PubRequest>;
    responseSerialize: grpc.serialize<message_pb.PubResponse>;
    responseDeserialize: grpc.deserialize<message_pb.PubResponse>;
}
interface IPubSubServiceService_IDrop extends grpc.MethodDefinition<message_pb.DropRequest, message_pb.PubResponse> {
    path: "/pb.PubSubService/Drop";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<message_pb.DropRequest>;
    requestDeserialize: grpc.deserialize<message_pb.DropRequest>;
    responseSerialize: grpc.serialize<message_pb.PubResponse>;
    responseDeserialize: grpc.deserialize<message_pb.PubResponse>;
}
interface IPubSubServiceService_IPurge extends grpc.MethodDefinition<message_pb.PurgeRequest, message_pb.PubResponse> {
    path: "/pb.PubSubService/Purge";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<message_pb.PurgeRequest>;
    requestDeserialize: grpc.deserialize<message_pb.PurgeRequest>;
    responseSerialize: grpc.serialize<message_pb.PubResponse>;
    responseDeserialize: grpc.deserialize<message_pb.PubResponse>;
}
interface IPubSubServiceService_IInfo extends grpc.MethodDefinition<message_pb.InfoRequest, message_pb.PubResponse> {
    path: "/pb.PubSubService/Info";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<message_pb.InfoRequest>;
    requestDeserialize: grpc.deserialize<message_pb.InfoRequest>;
    responseSerialize: grpc.serialize<message_pb.PubResponse>;
    responseDeserialize: grpc.deserialize<message_pb.PubResponse>;
}
interface IPubSubServiceService_IPublish extends grpc.MethodDefinition<message_pb.PubMessageRequest, message_pb.PubMessageResponse> {
    path: "/pb.PubSubService/Publish";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<message_pb.PubMessageRequest>;
    requestDeserialize: grpc.deserialize<message_pb.PubMessageRequest>;
    responseSerialize: grpc.serialize<message_pb.PubMessageResponse>;
    responseDeserialize: grpc.deserialize<message_pb.PubMessageResponse>;
}
interface IPubSubServiceService_ISubscribe extends grpc.MethodDefinition<message_pb.SubscribeMessage, message_pb.SubscribeMessage> {
    path: "/pb.PubSubService/Subscribe";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<message_pb.SubscribeMessage>;
    requestDeserialize: grpc.deserialize<message_pb.SubscribeMessage>;
    responseSerialize: grpc.serialize<message_pb.SubscribeMessage>;
    responseDeserialize: grpc.deserialize<message_pb.SubscribeMessage>;
}
interface IPubSubServiceService_IMessageHistory extends grpc.MethodDefinition<message_pb.MessageHistoryRequest, message_pb.MessageHistoryResponse> {
    path: "/pb.PubSubService/MessageHistory";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<message_pb.MessageHistoryRequest>;
    requestDeserialize: grpc.deserialize<message_pb.MessageHistoryRequest>;
    responseSerialize: grpc.serialize<message_pb.MessageHistoryResponse>;
    responseDeserialize: grpc.deserialize<message_pb.MessageHistoryResponse>;
}

export const PubSubServiceService: IPubSubServiceService;

export interface IPubSubServiceServer extends grpc.UntypedServiceImplementation {
    about: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, message_pb.AboutResponse>;
    ping: grpc.handleUnaryCall<message_pb.PingRequest, message_pb.PingResponse>;
    create: grpc.handleUnaryCall<message_pb.PubRequest, message_pb.PubResponse>;
    drop: grpc.handleUnaryCall<message_pb.DropRequest, message_pb.PubResponse>;
    purge: grpc.handleUnaryCall<message_pb.PurgeRequest, message_pb.PubResponse>;
    info: grpc.handleUnaryCall<message_pb.InfoRequest, message_pb.PubResponse>;
    publish: grpc.handleUnaryCall<message_pb.PubMessageRequest, message_pb.PubMessageResponse>;
    subscribe: grpc.handleBidiStreamingCall<message_pb.SubscribeMessage, message_pb.SubscribeMessage>;
    messageHistory: grpc.handleServerStreamingCall<message_pb.MessageHistoryRequest, message_pb.MessageHistoryResponse>;
}

export interface IPubSubServiceClient {
    about(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: message_pb.AboutResponse) => void): grpc.ClientUnaryCall;
    about(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.AboutResponse) => void): grpc.ClientUnaryCall;
    about(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.AboutResponse) => void): grpc.ClientUnaryCall;
    ping(request: message_pb.PingRequest, callback: (error: grpc.ServiceError | null, response: message_pb.PingResponse) => void): grpc.ClientUnaryCall;
    ping(request: message_pb.PingRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.PingResponse) => void): grpc.ClientUnaryCall;
    ping(request: message_pb.PingRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.PingResponse) => void): grpc.ClientUnaryCall;
    create(request: message_pb.PubRequest, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    create(request: message_pb.PubRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    create(request: message_pb.PubRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    drop(request: message_pb.DropRequest, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    drop(request: message_pb.DropRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    drop(request: message_pb.DropRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    purge(request: message_pb.PurgeRequest, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    purge(request: message_pb.PurgeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    purge(request: message_pb.PurgeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    info(request: message_pb.InfoRequest, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    info(request: message_pb.InfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    info(request: message_pb.InfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    publish(request: message_pb.PubMessageRequest, callback: (error: grpc.ServiceError | null, response: message_pb.PubMessageResponse) => void): grpc.ClientUnaryCall;
    publish(request: message_pb.PubMessageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.PubMessageResponse) => void): grpc.ClientUnaryCall;
    publish(request: message_pb.PubMessageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.PubMessageResponse) => void): grpc.ClientUnaryCall;
    subscribe(): grpc.ClientDuplexStream<message_pb.SubscribeMessage, message_pb.SubscribeMessage>;
    subscribe(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<message_pb.SubscribeMessage, message_pb.SubscribeMessage>;
    subscribe(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<message_pb.SubscribeMessage, message_pb.SubscribeMessage>;
    messageHistory(request: message_pb.MessageHistoryRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<message_pb.MessageHistoryResponse>;
    messageHistory(request: message_pb.MessageHistoryRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<message_pb.MessageHistoryResponse>;
}

export class PubSubServiceClient extends grpc.Client implements IPubSubServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public about(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: message_pb.AboutResponse) => void): grpc.ClientUnaryCall;
    public about(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.AboutResponse) => void): grpc.ClientUnaryCall;
    public about(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.AboutResponse) => void): grpc.ClientUnaryCall;
    public ping(request: message_pb.PingRequest, callback: (error: grpc.ServiceError | null, response: message_pb.PingResponse) => void): grpc.ClientUnaryCall;
    public ping(request: message_pb.PingRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.PingResponse) => void): grpc.ClientUnaryCall;
    public ping(request: message_pb.PingRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.PingResponse) => void): grpc.ClientUnaryCall;
    public create(request: message_pb.PubRequest, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    public create(request: message_pb.PubRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    public create(request: message_pb.PubRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    public drop(request: message_pb.DropRequest, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    public drop(request: message_pb.DropRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    public drop(request: message_pb.DropRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    public purge(request: message_pb.PurgeRequest, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    public purge(request: message_pb.PurgeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    public purge(request: message_pb.PurgeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    public info(request: message_pb.InfoRequest, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    public info(request: message_pb.InfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    public info(request: message_pb.InfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.PubResponse) => void): grpc.ClientUnaryCall;
    public publish(request: message_pb.PubMessageRequest, callback: (error: grpc.ServiceError | null, response: message_pb.PubMessageResponse) => void): grpc.ClientUnaryCall;
    public publish(request: message_pb.PubMessageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.PubMessageResponse) => void): grpc.ClientUnaryCall;
    public publish(request: message_pb.PubMessageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.PubMessageResponse) => void): grpc.ClientUnaryCall;
    public subscribe(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<message_pb.SubscribeMessage, message_pb.SubscribeMessage>;
    public subscribe(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<message_pb.SubscribeMessage, message_pb.SubscribeMessage>;
    public messageHistory(request: message_pb.MessageHistoryRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<message_pb.MessageHistoryResponse>;
    public messageHistory(request: message_pb.MessageHistoryRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<message_pb.MessageHistoryResponse>;
}
