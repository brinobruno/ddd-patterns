import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn().mockReturnValue(Promise.resolve()),
    update: jest.fn(),
  };
};

describe("Create product use case unit tests", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      price: 10,
    };

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: "Product 1",
      price: 10,
    });
  });

  it("should throw an error when product has invalid name", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const input = {
      name: "",
      price: 10,
    };

    await expect(useCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when product has invalid price", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      price: -1,
    };

    await expect(useCase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
