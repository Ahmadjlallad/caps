const Event = require("../../HUB");
/**
 *
 * @param {payload:"store": string,"orderId": string,"customer": string,"address": string}
 * logOrder when order is delivered
 */
const handler = (payload) => {
  console.log(`Thank you, ${payload.customer}\n`);
};
Event.on("delivered", handler);
module.exports = handler;
