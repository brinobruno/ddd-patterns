import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order-item";

const customer = new Customer("1", "Customer 1");
const address = new Address("Street 1", 123, "City 1", "12233-000");

customer.setAddress(address);
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 15);

const order = new Order("1", "1", [item1, item2]);
console.log(order);
