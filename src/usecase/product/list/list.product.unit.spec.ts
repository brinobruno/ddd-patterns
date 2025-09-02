import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product1 = new Product("123", "Product 1", 10);
const product2 = new Product("1234", "Product 2", 20);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("List product use case unit tests", () => {
  it("should list products", async () => {
    const productRepository = MockRepository();
    const useCase = new ListProductUseCase(productRepository);

    const expectedOutput = {
      products: [
        { id: product1.id, name: product1.name, price: product1.price },
        { id: product2.id, name: product2.name, price: product2.price },
      ],
    };

    const result = await useCase.execute({});

    expect(result).toEqual(expectedOutput);
  });
});
