import type Customer from "../../../domain/customer/entity/customer";
import type CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository-interface";
import type {
  InputListCustomerDto,
  OutputListCustomerDto,
} from "./list.customer.dto";

export default class ListCustomerUseCase {
  private readonly customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();

    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(customer: Customer[]): OutputListCustomerDto {
    return {
      customers: customer.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          zipCode: customer.address.zipCode,
          city: customer.address.city,
        },
      })),
    };
  }
}
