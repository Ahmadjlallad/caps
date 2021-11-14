const Event = require("./HUB");
const faker = require("faker");
const e = require("./e");

require("./modules/vendor/endor");
require("./modules/driver/driver");

const event = [...Event.eventNames(), "in-transit"];
event.forEach((e) => {
  Event.prependListener(e, (p) => {
    console.log(
      ` EVENT { 
   "event": ${e},
   "time": ${new Date().toISOString()},
   "payload": ${JSON.stringify(p).replaceAll(",", ",\n" + " ".padStart(15))}
              }\n`
    );
  });
});
Event.emit("pickup", {
  store: faker.company.companyName(),
  orderId: faker.commerce.productName(),
  customer: faker.name.findName(),
  address: `${faker.address.cityName()} ${faker.address.streetAddress()}`,
});
