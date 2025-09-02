import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("List product use case integration tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new ListProductUseCase(productRepository);

    const product1 = new Product("1", "Product 1", 10);
    const product2 = new Product("2", "Product 2", 30);
    await productRepository.create(product1);
    await productRepository.create(product2);

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
