import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import { v4 as uuid } from "uuid";

interface GenericItem {
  name: string;
  productId: string;
  quantity: number;
  price: number;
}

interface OrderFactoryProps {
  customerId: string;
  items: GenericItem[];
}

export default class OrderFactory {
  public static create(props: OrderFactoryProps): Order {
    const items = props.items.map((item) => {
      return new OrderItem(
        uuid(),
        item.name,
        item.price,
        item.productId,
        item.quantity
      );
    });

    const order = new Order(uuid(), props.customerId, items);

    return order;
  }
}
