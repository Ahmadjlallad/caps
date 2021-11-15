const io = require("socket.io-client");
const socket = io("http://localhost:3000");
const faker = require("faker");

socket.connect();
socket.emit("pickup", {
  store: faker.company.companyName(),
  orderId: faker.commerce.productName(),
  customer: faker.name.findName(),
  address: `${faker.address.cityName()} ${faker.address.streetAddress()}`,
});
