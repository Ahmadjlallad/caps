const driver = require("../modules/helpers/driver");
const vendor = require("../modules/helpers/vindor");
describe("", () => {
  let con;
  beforeEach(() => {
    con = jest.spyOn(console, "log").mockImplementation();
  });
  afterEach(() => {
    con = null;
  });
  test("should call the console.log for driver", async () => {
    driver(
      {
        store: "Kuvalis - Terry",
        orderId: "Handcrafted Soft Shirt",
        customer: "Mr. Lynn Blick",
        address: "Commerce City 96034 Hand Corners",
      },
      { emit: () => {} }
    );
    expect(con).toHaveBeenCalled();
  });
  test("should call the console.log for vendor", () => {
    vendor({
      store: "Kuvalis - Terry",
      orderId: "Handcrafted Soft Shirt",
      customer: "Mr. Lynn Blick",
      address: "Commerce City 96034 Hand Corners",
    });
    expect(con).toHaveBeenCalled();
  });
});
