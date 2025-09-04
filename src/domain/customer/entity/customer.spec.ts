import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const customer = new Customer("", "John");
      return customer;
    }).toThrow("customer: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const customer = new Customer("1", "");
      return customer;
    }).toThrow("customer: Name is required");
  });

  it("should throw errors when name and id are empty", () => {
    expect(() => {
      const customer = new Customer("", "");
      return customer;
    }).toThrow("customer: Id is required,customer: Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("1", "John");
    customer.changeName("Jane");

    expect(customer.name).toBe("Jane");
  });

  it("should not change to invalid name", () => {
    const customer = new Customer("1", "John");

    expect(() => {
      customer.changeName("");
    }).toThrow("Name is required");

    expect(customer.name).toBe("John");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "John");
    const address = new Address("Street 1", 123, "City 1", "12233-000");
    customer.changeAddress(address);

    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should not activate customer without address", () => {
    const customer = new Customer("1", "John");

    expect(() => {
      customer.activate();
    }).toThrow("Address is required to activate the customer");

    expect(customer.isActive()).toBe(false);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "John");
    const address = new Address("Street 1", 123, "City 1", "12233-000");
    customer.changeAddress(address);

    customer.activate();
    expect(customer.isActive()).toBe(true);

    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "John");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });

  it("should rollback name change if validation fails", () => {
    const customer = new Customer("1", "John");

    expect(() => {
      customer.changeName("");
    }).toThrow("customer: Name is required");

    expect(customer.name).toBe("John");
  });

  it("should get address", () => {
    const customer = new Customer("1", "John");
    const address = new Address("Street 1", 123, "City 1", "12233-000");
    customer.changeAddress(address);

    expect(customer.address).toBe(address);
  });

  it("should change address", () => {
    const customer = new Customer("1", "John");
    const address = new Address("Street 1", 123, "City 1", "12233-000");
    customer.changeAddress(address);

    expect(customer.address).toBe(address);

    const newAddress = new Address("Street 2", 456, "City 2", "98765-432");
    customer.changeAddress(newAddress);

    expect(customer.address).toBe(newAddress);
  });
});
