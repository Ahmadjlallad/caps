const io = require("socket.io-client");
const socket = io("http://localhost:3000");
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
  console.log(`DRIVER: picked up ${payload.orderId}.\n`);
  socket.emit("in-transit", payload);
  console.log(`DRIVER: delivered ${payload.orderId}\n`);
  socket.emit("delivered", payload);
};
socket.connect();
socket.on("pickup", (p) => {
  handler(p, socket);
});

module.exports = handler;
