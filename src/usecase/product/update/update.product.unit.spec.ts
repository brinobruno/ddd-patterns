import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Product 1", 10);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn().mockReturnValue(Promise.resolve()),
  };
};

describe("Update product use case unit tests", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "Product 1 updated",
      price: 20,
    };

    const output = {
      id: product.id,
      name: input.name,
      price: input.price,
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should throw an error when product not found", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockReturnValue(
      Promise.reject(new Error("Product not found"))
    );
    const useCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "Product 1 updated",
      price: 20,
    };

    await expect(useCase.execute(input)).rejects.toThrow("Product not found");
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = MockRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "",
      price: 20,
    };

    await expect(useCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is less than zero", async () => {
    const productRepository = MockRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "Product 1 updated",
      price: -1,
    };

    await expect(useCase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
