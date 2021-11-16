const io = require("socket.io-client");
const socket = io("http://localhost:3000");
const faker = require("faker");
const handler = require("../helpers/vindor");
socket.connect();

socket.on("connect", () => {
  const store = `acme - widgets`;
  socket.emit("join-room", store);
  socket.emit("getAll", store);
});
socket.on("delivered", (p) => {
  console.log("delivered");
  handler(p);
  socket.emit("received", { ...p, event: "Vendor" });
});
