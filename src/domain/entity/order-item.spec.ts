import OrderItem from "./order-item";

describe("Order item unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const item = new OrderItem("", "item 1", 100, "p1", 1);
      return item;
    }).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const item = new OrderItem("1", "", 100, "p1", 1);
      return item;
    }).toThrow("Name is required");
  });

  it("should throw error when price is zero", () => {
    expect(() => {
      const item = new OrderItem("1", "item 1", 0, "p1", 1);
      return item;
    }).toThrow("Price must be greater than 0");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const item = new OrderItem("1", "item 1", -1, "p1", 1);
      return item;
    }).toThrow("Price must be greater than 0");
  });

  it("should throw error when product id is empty", () => {
    expect(() => {
      const item = new OrderItem("1", "item 1", 100, "", 1);
      return item;
    }).toThrow("ProductId is required");
  });

  it("should throw error when quantity is equal or less than 0", () => {
    expect(() => {
      const item = new OrderItem("1", "item 1", 100, "p1", 0);
      return item;
    }).toThrow("items quantity must be greater than 0");
  });

  it("should return price", () => {
    const item = new OrderItem("1", "item 1", 100, "p1", 1);
    expect(item.price).toBe(100);
  });

  it("should return quantity", () => {
    const item = new OrderItem("1", "item 1", 100, "p1", 4);
    expect(item.quantity).toBe(4);
  });
});
