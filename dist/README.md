# Apophis Client Javascript ☄️

```javascript
import {New} from '@sheepsbr/apophisjs';

const queue = await New('my-queue', {
    host: "<host:strig>",
    port: <port:number>,
    insecure: <insecure:boolean>,
    // optional create with queue
    queueDefinition: {
        keepMessages: true,
        tags: ['jobs','payments'],
        retryInterval: '5s',
        retryDuration: '15m'
    }
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
    tags: ['A', 'B'],
    customId: 'my-custom-id', // optional
    trackingId: 'my-tracking-id', // optional
});

// consumer
let parallelism = 2; // optional 
await queue.subscribe(async (msg, confirm) => {
    console.log(msg);
    confirm.OK();
    // confirm.Discard();
    // confirm.Retry({"optional-header": 100 });
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
            
// ping
const ping = await apophis.ping();
console.log( ping );
            
// disconnect
await queue.disconnect();
```

## Using with pool

```javascript
import { ApophisPool } from '@sheepsbr/apophisjs';

const apophis = ApophisPool.Create({
    // note: name is required for pool
    name: `my-queue`, 
    host: "<host:strig>",
    port: <port:number>,
    insecure: <insecure:boolean>,
    readTimeoutInSeconds: 5,
    // optional create with queue
    queueDefinition: {
        keepMessages: true,
        tags: ['jobs','payments'],
        retryInterval: '5s',
        retryDuration: '15m'
    }
});
```

👋 bye sheepers
