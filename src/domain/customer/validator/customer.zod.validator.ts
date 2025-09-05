import type ValidatorInterface from "../../@shared/validator/validator.interface";
import type Customer from "../entity/customer";
import { z } from "zod";

export default class CustomerZodValidator
  implements ValidatorInterface<Customer>
{
  validate(entity: Customer): void {
    const schema = z.object({
      id: z.string().min(1, "Id is required"),
      name: z.string().min(1, "Name is required"),
    });

    const result = schema.safeParse(entity);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        entity.notification.addError({
          context: "customer",
          message: issue.message,
        });
      });
    }
  }
}
