import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Update product use case integration tests", () => {
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    const product = new Product("123", "Product 1", 10);

    await productRepository.create(product);

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
});
