import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const customer = new Customer("", "John");
      return customer;
    }).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const customer = new Customer("1", "");
      return customer;
    }).toThrow("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("1", "John");
    customer.changeName("Jane");

    expect(customer.name()).toBe("Jane");
  });

  it("should not change to invalid name", () => {
    const customer = new Customer("1", "John");

    expect(() => {
      customer.changeName("");
    }).toThrow("Name is required");

    expect(customer.name()).toBe("John");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "John");
    const address = new Address("Street 1", 123, "City 1", "12233-000");
    customer.setAddress(address);

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
    customer.setAddress(address);

    customer.activate();
    expect(customer.isActive()).toBe(true);

    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });
});
