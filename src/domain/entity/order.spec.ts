import Order from "./order";
import OrderItem from "./orderItem";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when id customer is empty", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrowError("Customer Id is required");
  });

  it("should throw error when item is empty", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrowError("Items are required");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("1", "item", 10, "Product 1", 1);
    const item2 = new OrderItem("2", "item2", 20, "Product 2", 2);

    const order = new Order("1", "c1", [item1, item2]);
    const total = order.total()

    expect(total).toBe(50)
  })

  it("should throw when item qtd is less than zero", () => {
    expect(() => {
      const item1 = new OrderItem("1", "item", 10, "Product 1", -1);
      const order = new Order("1", "c1", [item1]);
    }).toThrowError("Quantity must be greater than zero");
  })
})