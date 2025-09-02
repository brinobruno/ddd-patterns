import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John",
  new Address("Street 1", 1, "City 1", "Zipcode 1")
);

const input = {
  id: customer.id,
  name: "Updated John",
  address: {
    street: "Updated Street 1",
    number: 1234,
    city: "Updated City 1",
    zipCode: "Updated Zipcode 1",
  },
};

const mockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn().mockResolvedValue(Promise.resolve()),
  };
};

describe("Customer update use case unit tests", () => {
  it("should update a customer", async () => {
    const customerRepository = mockRepository();
    const useCase = new UpdateCustomerUseCase(customerRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual(input);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = mockRepository();
    customerRepository.find.mockReturnValue(
      Promise.reject(new Error("Customer not found"))
    );
    const useCase = new UpdateCustomerUseCase(customerRepository);

    await expect(useCase.execute(input)).rejects.toThrow("Customer not found");
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = mockRepository();
    const useCase = new UpdateCustomerUseCase(customerRepository);
    input.name = "";

    await expect(useCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when street is missing", async () => {
    const customerRepository = mockRepository();
    const useCase = new UpdateCustomerUseCase(customerRepository);
    input.name = "John";
    input.address.street = "";

    await expect(useCase.execute(input)).rejects.toThrow("Street is required");
  });
});
