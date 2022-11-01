# Apophis Client Javascript ☄️

```javascript
import {NewApophis, SubscribeConfirm} from '@sheepsbr/apophisjs';

const queue = await NewApophis('my-queue', {
    host: "<host:strig>",
    port: <port:number>,
    insecure: <insecure:boolean>
});

// create
await queue.create({
    keepMessages: true,
    tags: ['jobs','payments'],
    retryInterval: '5s',
    retryDuration: '15m'
});

// publish message
await queue.publish({
    contentType: "application/json",
    headers: {"abc": "abc"},
    body: Buffer.from(JSON.stringify({})),
    tags: ['A', 'B']
});

// consumer
let parallelism = 2; // optional 
await queue.subscribe(async (msg) => {
    console.log(msg);
    return SubscribeConfirm.OK;
}, parallelism);

// history message stream
await queue.messages({
   tags: ['A'],
   status: ['DRAFT', 'READ'],
   limit: 100,
}, (msg) => {
   console.log(msg);
});

// purge messages
await queue.purge();

// drop queue
await queue.drop();

// info queue
const info = await queue.info();
console.log( info );

// disconnect
await queue.disconnect();

```
👋
