import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";

describe("Order factory unit test", () => {
  it("should create an order", () => {
    const orderProps = {
      customerId: uuid(),
      items: [
        {
          name: "Product 1",
          productId: uuid(),
          quantity: 1,
          price: 100,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order.id).toBeDefined();
    expect(order.customerId).toEqual(orderProps.customerId);
    expect(order.items).toHaveLength(1);
    expect(order.items[0]?.name).toBe("Product 1");
  });
});
