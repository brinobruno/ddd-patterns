import type ValidatorInterface from "../../@shared/validator/validator.interface";
import type Customer from "../entity/customer";
import CustomerZodValidator from "../validator/customer.zod.validator";

export default class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerZodValidator();
  }
}
