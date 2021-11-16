const io = require("socket.io-client");
const socket = io("http://localhost:3000");
const driver = require("../helpers/driver");
socket.connect();
const faker = require("faker");
const store = `acme - widgets`;
socket.emit("pickup", {
  store,
  orderId: faker.commerce.productName(),
  customer: faker.name.findName(),
  address: `${faker.address.cityName()} ${faker.address.streetAddress()}`,
});
socket.on("connect", () => {
  socket.emit("getAll");
});
socket.on("pickup", (p) => {
  driver(p, socket);
});
