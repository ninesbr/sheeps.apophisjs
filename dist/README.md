# Apophis Client Javascript ☄️

```javascript
import {ApophisPool, ApophisConfiguration} from '@sheepsbr/apophisjs';


const config: ApophisConfiguration = {
    host: string, //required
    port: number, //required
    name: string, //required
    insecure: boolean, //optional
    queueDefinition: { //optional
        keepMessages: true,
        tags: ['jobs','payments'],
        retryInterval: '5s',
        retryDuration: '15m'
    }
    // optional values
    readTimeoutInSeconds: number,                  // default 5
    poolMin?: number                               // default 1
    poolMax?: number                               // default 2
    logLevel?: 'debug' | 'info' | 'error' | 'off', // error
}

const apophis = ApophisPool.Create(config);


// create
await apophis.create({
    keepMessages: true,
    tags: ['jobs','payments'],
    retryInterval: '5s',
    retryDuration: '15m'
});

// publish message
await apophis.publish({
    contentType: "application/json",
    headers: {"abc": "abc"},
    body: Buffer.from(JSON.stringify({})),
    tags: ['A', 'B'],
    customId: 'my-custom-id',
    trackingId: 'my-tracking-id',
});

// consumer
let parallelism = 2; 
await apophis.subscribe(async (msg, confirm) => {
    console.log(msg);
    confirm.OK();
    // confirm.Discard();
    // confirm.Retry({"optional-header": 100 });
}, parallelism);

// history message stream
await apophis.messages({
   tags: ['A'],
   status: ['DRAFT', 'READ'],
   limit: 100,
}, (msg) => {
   console.log(msg);
});

// purge messages
await apophis.purge();

// drop queue
await apophis.drop();

// info queue
const info = await apophis.info();
console.log( info );
            
// ping
const ping = await apophis.ping();
console.log( ping );
            
// disconnect
await apophis.disconnect();
```

👋 bye sheepers
