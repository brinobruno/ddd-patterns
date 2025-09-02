import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import type CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository-interface";
import Address from "../../../domain/customer/value-object/address";
import type {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from "./create.customer.dto";

export default class CreateCustomerUseCase {
  private readonly customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: InputCreateCustomerDto
  ): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(
        input.address.street,
        input.address.number,
        input.address.city,
        input.address.zipCode
      )
    );

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zipCode: customer.address.zipCode,
        city: customer.address.city,
      },
    };
  }
}
