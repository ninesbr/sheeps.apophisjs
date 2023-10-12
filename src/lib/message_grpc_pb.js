// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var message_pb = require('./message_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_AboutResponse(arg) {
  if (!(arg instanceof message_pb.AboutResponse)) {
    throw new Error('Expected argument of type pb.AboutResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_AboutResponse(buffer_arg) {
  return message_pb.AboutResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_DropRequest(arg) {
  if (!(arg instanceof message_pb.DropRequest)) {
    throw new Error('Expected argument of type pb.DropRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_DropRequest(buffer_arg) {
  return message_pb.DropRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_InfoRequest(arg) {
  if (!(arg instanceof message_pb.InfoRequest)) {
    throw new Error('Expected argument of type pb.InfoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_InfoRequest(buffer_arg) {
  return message_pb.InfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_MessageHistoryRequest(arg) {
  if (!(arg instanceof message_pb.MessageHistoryRequest)) {
    throw new Error('Expected argument of type pb.MessageHistoryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_MessageHistoryRequest(buffer_arg) {
  return message_pb.MessageHistoryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_MessageHistoryResponse(arg) {
  if (!(arg instanceof message_pb.MessageHistoryResponse)) {
    throw new Error('Expected argument of type pb.MessageHistoryResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_MessageHistoryResponse(buffer_arg) {
  return message_pb.MessageHistoryResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_PingRequest(arg) {
  if (!(arg instanceof message_pb.PingRequest)) {
    throw new Error('Expected argument of type pb.PingRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_PingRequest(buffer_arg) {
  return message_pb.PingRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_PingResponse(arg) {
  if (!(arg instanceof message_pb.PingResponse)) {
    throw new Error('Expected argument of type pb.PingResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_PingResponse(buffer_arg) {
  return message_pb.PingResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_PubMessageRequest(arg) {
  if (!(arg instanceof message_pb.PubMessageRequest)) {
    throw new Error('Expected argument of type pb.PubMessageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_PubMessageRequest(buffer_arg) {
  return message_pb.PubMessageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_PubMessageResponse(arg) {
  if (!(arg instanceof message_pb.PubMessageResponse)) {
    throw new Error('Expected argument of type pb.PubMessageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_PubMessageResponse(buffer_arg) {
  return message_pb.PubMessageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_PubRequest(arg) {
  if (!(arg instanceof message_pb.PubRequest)) {
    throw new Error('Expected argument of type pb.PubRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_PubRequest(buffer_arg) {
  return message_pb.PubRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_PubResponse(arg) {
  if (!(arg instanceof message_pb.PubResponse)) {
    throw new Error('Expected argument of type pb.PubResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_PubResponse(buffer_arg) {
  return message_pb.PubResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_PurgeRequest(arg) {
  if (!(arg instanceof message_pb.PurgeRequest)) {
    throw new Error('Expected argument of type pb.PurgeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_PurgeRequest(buffer_arg) {
  return message_pb.PurgeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_SubscribeMessage(arg) {
  if (!(arg instanceof message_pb.SubscribeMessage)) {
    throw new Error('Expected argument of type pb.SubscribeMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_SubscribeMessage(buffer_arg) {
  return message_pb.SubscribeMessage.deserializeBinary(new Uint8Array(buffer_arg));
}


var PubSubServiceService = exports.PubSubServiceService = {
  about: {
    path: '/pb.PubSubService/About',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: message_pb.AboutResponse,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_pb_AboutResponse,
    responseDeserialize: deserialize_pb_AboutResponse,
  },
  ping: {
    path: '/pb.PubSubService/Ping',
    requestStream: false,
    responseStream: false,
    requestType: message_pb.PingRequest,
    responseType: message_pb.PingResponse,
    requestSerialize: serialize_pb_PingRequest,
    requestDeserialize: deserialize_pb_PingRequest,
    responseSerialize: serialize_pb_PingResponse,
    responseDeserialize: deserialize_pb_PingResponse,
  },
  create: {
    path: '/pb.PubSubService/Create',
    requestStream: false,
    responseStream: false,
    requestType: message_pb.PubRequest,
    responseType: message_pb.PubResponse,
    requestSerialize: serialize_pb_PubRequest,
    requestDeserialize: deserialize_pb_PubRequest,
    responseSerialize: serialize_pb_PubResponse,
    responseDeserialize: deserialize_pb_PubResponse,
  },
  drop: {
    path: '/pb.PubSubService/Drop',
    requestStream: false,
    responseStream: false,
    requestType: message_pb.DropRequest,
    responseType: message_pb.PubResponse,
    requestSerialize: serialize_pb_DropRequest,
    requestDeserialize: deserialize_pb_DropRequest,
    responseSerialize: serialize_pb_PubResponse,
    responseDeserialize: deserialize_pb_PubResponse,
  },
  purge: {
    path: '/pb.PubSubService/Purge',
    requestStream: false,
    responseStream: false,
    requestType: message_pb.PurgeRequest,
    responseType: message_pb.PubResponse,
    requestSerialize: serialize_pb_PurgeRequest,
    requestDeserialize: deserialize_pb_PurgeRequest,
    responseSerialize: serialize_pb_PubResponse,
    responseDeserialize: deserialize_pb_PubResponse,
  },
  info: {
    path: '/pb.PubSubService/Info',
    requestStream: false,
    responseStream: false,
    requestType: message_pb.InfoRequest,
    responseType: message_pb.PubResponse,
    requestSerialize: serialize_pb_InfoRequest,
    requestDeserialize: deserialize_pb_InfoRequest,
    responseSerialize: serialize_pb_PubResponse,
    responseDeserialize: deserialize_pb_PubResponse,
  },
  publish: {
    path: '/pb.PubSubService/Publish',
    requestStream: false,
    responseStream: false,
    requestType: message_pb.PubMessageRequest,
    responseType: message_pb.PubMessageResponse,
    requestSerialize: serialize_pb_PubMessageRequest,
    requestDeserialize: deserialize_pb_PubMessageRequest,
    responseSerialize: serialize_pb_PubMessageResponse,
    responseDeserialize: deserialize_pb_PubMessageResponse,
  },
  subscribe: {
    path: '/pb.PubSubService/Subscribe',
    requestStream: true,
    responseStream: true,
    requestType: message_pb.SubscribeMessage,
    responseType: message_pb.SubscribeMessage,
    requestSerialize: serialize_pb_SubscribeMessage,
    requestDeserialize: deserialize_pb_SubscribeMessage,
    responseSerialize: serialize_pb_SubscribeMessage,
    responseDeserialize: deserialize_pb_SubscribeMessage,
  },
  messageHistory: {
    path: '/pb.PubSubService/MessageHistory',
    requestStream: false,
    responseStream: true,
    requestType: message_pb.MessageHistoryRequest,
    responseType: message_pb.MessageHistoryResponse,
    requestSerialize: serialize_pb_MessageHistoryRequest,
    requestDeserialize: deserialize_pb_MessageHistoryRequest,
    responseSerialize: serialize_pb_MessageHistoryResponse,
    responseDeserialize: deserialize_pb_MessageHistoryResponse,
  },
};

exports.PubSubServiceClient = grpc.makeGenericClientConstructor(PubSubServiceService);
