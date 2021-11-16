/**
 *
 * @param {payload:"store": string,"orderId": string,"customer": string,"address": string}
 * logOrder when order is delivered
 */
const handler = (payload) => {
  console.log(payload);
  console.log(`Thank you, ${payload.payload.customer}\n`);
};
module.exports = handler;
