import type ValidatorInterface from "../../@shared/validator/validator.interface";
import type Product from "../entity/product";
import ProductZodValidator from "../validator/product.zod.validator";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<Product> {
    return new ProductZodValidator();
  }
}
