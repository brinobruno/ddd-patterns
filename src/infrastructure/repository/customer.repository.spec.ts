import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "12345-678", "City 1");
    customer.setAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      street: address.street,
      number: address.number,
      zipCode: address.zipCode,
      city: address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "12345-678", "City 1");
    customer.setAddress(address);
    await customerRepository.create(customer);

    customer.changeName("Customer 2");
    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      street: address.street,
      number: address.number,
      zipCode: address.zipCode,
      city: address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should find a customer without address", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer 1");

    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(foundCustomer);
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "12345-678", "City 1");
    customer.setAddress(address);
    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(foundCustomer);
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("1", "Customer 1");
    const customer2 = new Customer("2", "Customer 2");

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const foundCustomers = await customerRepository.findAll();
    const customers = [customer1, customer2];

    expect(customers).toEqual(foundCustomers);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("1");
    }).rejects.toThrow("Customer not found");
  });
});
