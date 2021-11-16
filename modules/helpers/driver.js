/**
 *
 * @param {payload:"store": string,"orderId": string,"customer": string,"address": string} payload
 * @param {socket} io socket
 * @returns void
 * @description handler used to log the order emit a in transit event
 * log delivered event and emit a delivered event
 * log
 */
const handler = (payload, socket) => {
  console.log(`DRIVER: picked up ${payload.payload.orderId}.\n`);
  socket.emit("in-transit", payload);
  console.log(`DRIVER: delivered ${payload.payload.orderId}\n`);
  socket.emit("delivered", payload);
  socket.emit("received", { ...payload, event: "Driver" });
};
module.exports = handler;
