const driver = require("../modules/driver/driver");
const endor = require("../modules/vendor/endor");
describe("", () => {
  let con;
  beforeEach(() => {
    con = jest.spyOn(console, "log").mockImplementation();
  });
  afterEach(() => {
    con = null;
  });
  test("should call the console.log for driver", () => {
    driver({
      store: "Kuvalis - Terry",
      orderId: "Handcrafted Soft Shirt",
      customer: "Mr. Lynn Blick",
      address: "Commerce City 96034 Hand Corners",
    });
    expect(con).toHaveBeenCalled();
  });
  test("should call the console.log for endor", () => {
    endor({
      store: "Kuvalis - Terry",
      orderId: "Handcrafted Soft Shirt",
      customer: "Mr. Lynn Blick",
      address: "Commerce City 96034 Hand Corners",
    });
    expect(con).toHaveBeenCalled();
  });
});
