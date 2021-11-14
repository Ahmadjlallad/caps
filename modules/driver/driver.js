const Event = require("../../HUB");
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

Event.on("pickup", handler);
module.exports = handler;
