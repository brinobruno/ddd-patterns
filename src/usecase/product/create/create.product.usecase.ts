import type Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import type ProductRepositoryInterface from "../../../domain/product/repository/product.repository-interface";
import type {
  CreateProductInputDto,
  CreateProductOutputDto,
} from "./create.product.dto";

export default class CreateProductUseCase {
  productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: CreateProductInputDto): Promise<CreateProductOutputDto> {
    const product = ProductFactory.create("a", input.name, input.price);

    await this.productRepository.create(product as Product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
