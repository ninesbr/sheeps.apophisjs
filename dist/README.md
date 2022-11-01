# Client Apophis Javascript

```javascript
import {NewApophis, SubscribeConfirm} from '@sheepsbr/apophisjs';

const queue = await NewApophis('my-queue', {
    host: "<host:strig>",
    port: <port:number>,
    insecure: <insecure:boolean>
});

// create
await queue.create();

// publish message
await queue.publish({
    contentType: "application/json",
    headers: {"abc": "abc"},
    body: Buffer.from(JSON.stringify({})),
    tags: ['A', 'B']
});

// consumer
await queue.subscribe(async (msg) => {
    console.log(msg);
    return SubscribeConfirm.OK;
});

// history message
await queue.messages({
    tags: ['A']
    status: ['DRAFT', 'READ'],
    limit: 100,
});

// purge messages
await queue.purge();

// drop queue
await queue.drop();

// info queue
await queue.info();

// disconnect
await queue.disconnect();

```
