// "redis": "^4.3.1"
import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

await client.set('myname', 'zhangsan');
const value = await client.get('myname');
console.log('value: ', value)