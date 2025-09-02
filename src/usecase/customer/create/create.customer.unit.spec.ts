import CreateCustomerUseCase from "./create.customer.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn().mockResolvedValue(Promise.resolve()),
    update: jest.fn(),
  };
};

describe("Create customer use case unit tests", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const input = {
      name: "John",
      address: {
        street: "Street 1",
        number: 1,
        zipCode: "Zipcode 1",
        city: "City 1",
      },
    };

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: "John",
      address: {
        street: "Street 1",
        number: 1,
        zipCode: "Zipcode 1",
        city: "City 1",
      },
    });
  });

  it("should throw error when name is missing", async () => {
    const customerRepository = MockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const input = {
      name: "",
      address: {
        street: "Street 1",
        number: 1,
        zipCode: "Zipcode 1",
        city: "City 1",
      },
    };

    await expect(useCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw error when street is missing", async () => {
    const customerRepository = MockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const input = {
      name: "",
      address: {
        street: "",
        number: 1,
        zipCode: "Zipcode 1",
        city: "City 1",
      },
    };

    await expect(useCase.execute(input)).rejects.toThrow("Street is required");
  });
});
