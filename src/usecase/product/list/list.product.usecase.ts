import type ProductRepositoryInterface from "../../../domain/product/repository/product.repository-interface";
import type {
  ListProductInputDto,
  ListProductOutputDto,
} from "./list.product.dto";

export default class FindProductUseCase {
  private readonly productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(input: ListProductInputDto): Promise<ListProductOutputDto> {
    const results = await this.productRepository.findAll();

    return {
      products: results.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
