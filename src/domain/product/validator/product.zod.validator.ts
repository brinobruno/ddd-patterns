import type ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import { z } from "zod";

export default class ProductZodValidator
  implements ValidatorInterface<Product>
{
  validate(entity: Product): void {
    const schema = z.object({
      id: z.string().min(1, "Id is required"),
      name: z.string().min(1, "Name is required"),
      price: z.number().min(0, "Price must be greater than zero"),
    });

    const result = schema.safeParse(entity);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        entity.notification.addError({
          context: "product",
          message: issue.message,
        });
      });
    }
  }
}
