const driver = require("../modules/driver/driver");
const vendor = require("../modules/vendor/vendor");
describe("", () => {
  let con;
  beforeEach(() => {
    con = jest.spyOn(console, "log").mockImplementation();
  });
  afterEach(() => {
    con = null;
  });
  test("should call the console.log for driver", () => {
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
  test("should call the console.log for endor", () => {
    vendor({
      store: "Kuvalis - Terry",
      orderId: "Handcrafted Soft Shirt",
      customer: "Mr. Lynn Blick",
      address: "Commerce City 96034 Hand Corners",
    });
    expect(con).toHaveBeenCalled();
  });
});
