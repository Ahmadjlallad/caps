const io = require("socket.io-client");
const socket = io("http://localhost:3000");
const driver = require("../helpers/driver");
socket.connect();
socket.on("pickup", (p) => {
  driver(p, socket);
});
