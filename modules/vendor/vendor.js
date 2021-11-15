const io = require("socket.io-client");
const socket = io("http://localhost:3000");
const faker = require("faker");
const handler = require("../helpers/vindor");
socket.connect();
socket.on("connect", () => {
  const store = faker.company.companyName();
  socket.emit("join-room", store);
  socket.emit("pickup", {
    store,
    orderId: faker.commerce.productName(),
    customer: faker.name.findName(),
    address: `${faker.address.cityName()} ${faker.address.streetAddress()}`,
  });
});
socket.on("delivered", (p) => {
  handler(p);
  process.exit();
});
