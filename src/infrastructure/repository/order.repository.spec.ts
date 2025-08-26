import { Sequelize } from "sequelize-typescript";
import OrderModel from "../db/sequelize/model/order.model";
import OrderRepository from "./order.repository";
import Address from "../../domain/customer/value-object/address";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/customer/entity/customer";
import ProductRepository from "./product.repository";
import Product from "../../domain/product/entity/product";
import Order from "../../domain/checkout/entity/order";
import OrderItem from "../../domain/checkout/entity/order-item";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "o1",
      product.name,
      product.price,
      product.id,
      2
    );
    const order = new Order("o1", "c1", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel!.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          product_id: product.id,
          quantity: orderItem.quantity,
          order_id: order.id,
        },
      ],
    });
  });

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "o1",
      product.name,
      product.price,
      product.id,
      2
    );
    const order = new Order("o1", "c1", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const updatedCustomer = new Customer("c2", "Customer 2");
    updatedCustomer.changeAddress(address);
    await customerRepository.create(updatedCustomer);

    order.changeCustomer("c2");

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel!.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: updatedCustomer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          product_id: product.id,
          quantity: orderItem.quantity,
          order_id: order.id,
        },
      ],
    });
  });

  it("should find an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "o1",
      product.name,
      product.price,
      product.id,
      2
    );
    const order = new Order("o1", "c1", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundOrder = await orderRepository.find(order.id);

    expect(foundOrder).toStrictEqual(order);
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer("c1", "Customer 1");
    const customer2 = new Customer("c2", "Customer 2");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer1.changeAddress(address);
    customer2.changeAddress(address);
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const productRepository = new ProductRepository();
    const product1 = new Product("p1", "Product 1", 10);
    const product2 = new Product("p2", "Product 2", 20);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const orderItem1a = new OrderItem(
      "oi1",
      product1.name,
      product1.price,
      product1.id,
      2
    );
    const orderItem2a = new OrderItem(
      "oi2",
      product2.name,
      product2.price,
      product2.id,
      4
    );

    const orderItem1b = new OrderItem(
      "oi3",
      product1.name,
      product1.price,
      product1.id,
      2
    );
    const orderItem2b = new OrderItem(
      "oi4",
      product2.name,
      product2.price,
      product2.id,
      4
    );

    const order1 = new Order("o1", customer1.id, [orderItem1a]);
    const order2 = new Order("o2", customer1.id, [orderItem2a]);
    const order3 = new Order("o3", customer2.id, [orderItem1b, orderItem2b]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);
    await orderRepository.create(order2);
    await orderRepository.create(order3);

    const foundOrders = await orderRepository.findAll();

    expect(foundOrders).toHaveLength(3);
    expect(foundOrders).toStrictEqual([order1, order2, order3]);
  });
});
