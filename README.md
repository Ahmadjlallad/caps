# caps

Code Academy Parcel Service caps for short is delivery management system

## Documentation

uml:
![uml](./assets/11.drawio.png)
![11](./assets/11.jpg)

## JSDoc

```js
/**
 *
 * @param {payload:"store": string,"orderId": string,"customer": string,"address": string}
 * logOrder when order is delivered
 */
const handler = (payload) => {
  console.log(`Thank you, ${payload.customer}\n`);
};
/**
 *
 * @param {payload:"store": string,"orderId": string,"customer": string,"address": string} payload
 * @returns void
 * @description handler used to log the order emit a in transit event
 * log delivered event and emit a delivered event
 * log
 */
const handler = (payload) => {
  console.log(`DRIVER: picked up ${payload.orderId}.\n`);
  Event.emit("in-transit", payload);
  console.log(`DRIVER: delivered ${payload.orderId}\n`);
  Event.emit("delivered", payload);
};
```
