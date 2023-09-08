
import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/orderItem";
import OrderService from "./order.service";

describe("Order Service unit tests", () => {
  it("should get total of all orders", () => {
    const item1 = new OrderItem("1", "Item 1", 100, " p1", 1);
    const item2 = new OrderItem("2", "Item 2", 200, " p2", 2);

    const order1 = new Order("1", " c1", [item1])
    const order2 = new Order("2", " c2", [item2])

    const total = OrderService.total([order1, order2])
    expect(total).toBe(500)
  });

  it("should place an order", () => {
    const item = new OrderItem("1", "Item 1", 10, " p1", 1);

    const customer = new Customer("c1", "John")

    const order = OrderService.placeOrder(customer, [item]);
    expect(customer.rewardPoints).toBe(5)
    expect(order.total()).toBe(10)

  })
})