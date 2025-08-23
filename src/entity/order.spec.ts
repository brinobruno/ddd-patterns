import Order from "./order";
import OrderItem from "./order-item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const order = new Order("", "123", []);
      return order;
    }).toThrow("Id is required");
  });

  it("should throw error when customer id is empty", () => {
    expect(() => {
      const order = new Order("123", "", []);
      return order;
    }).toThrow("customerId is required");
  });

  it("should throw error when customer id is empty", () => {
    expect(() => {
      const order = new Order("123", "123", []);
      return order;
    }).toThrow("items quantity must be greater than 0");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("1", "item 1", 100);
    const item2 = new OrderItem("2", "item 2", 150);
    const order1 = new Order("1", "123", [item1]);

    let total = order1.total();
    expect(total).toBe(100);

    const order2 = new Order("1", "123", [item1, item2]);

    total = order2.total();
    expect(total).toBe(250);
  });
});
