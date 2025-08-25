import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
  it("should get total of all orders", () => {
    const item1 = new OrderItem("1", "Item 1", 100, "p1", 1);
    const item2 = new OrderItem("2", "Item 2", 200, "p1", 2);

    const order1 = new Order("o1", "c1", [item1]);
    const order2 = new Order("o2", "c1", [item1, item2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(600);
  });
});
