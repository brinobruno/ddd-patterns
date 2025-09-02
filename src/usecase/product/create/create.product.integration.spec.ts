import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Create from "./create.product.usecase";

describe("Create product use case integration tests", () => {
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

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new Create(productRepository);

    const input = {
      name: "Product 1",
      price: 10,
    };

    const expectedOutput = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(expectedOutput);
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = new ProductRepository();
    const useCase = new Create(productRepository);

    const input = {
      name: "",
      price: 10,
    };

    await expect(useCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is less than zero", async () => {
    const productRepository = new ProductRepository();
    const useCase = new Create(productRepository);

    const input = {
      name: "Product 1",
      price: -10,
    };

    await expect(useCase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
