import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import type CustomerRepositoryInterface from "../../domain/repository/customer.repository-interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity?.address?.street ?? null,
      number: entity?.address?.number ?? null,
      zipCode: entity?.address?.zipCode ?? null,
      city: entity?.address?.city ?? null,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        id: entity.id,
        name: entity.name,
        street: entity?.address?.street ?? null,
        number: entity?.address?.number ?? null,
        zipCode: entity?.address?.zipCode ?? null,
        city: entity?.address?.city ?? null,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: { id: entity.id },
      }
    );
  }

  async find(id: string): Promise<Customer> {
    let customerModel;

    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });

      if (!customerModel) {
        throw new Error("Customer not found");
      }

      const customer = new Customer(customerModel.id, customerModel.name);

      if (
        customerModel.street &&
        customerModel.number &&
        customerModel.city &&
        customerModel.zipCode
      ) {
        const address = new Address(
          customerModel.street,
          customerModel.number,
          customerModel.city,
          customerModel.zipCode
        );
        customer.setAddress(address);
      }

      return customer;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error("Customer not found");
    }
  }

  async findAll(): Promise<Customer[]> {
    const customerModel = await CustomerModel.findAll();

    const customers = customerModel.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);
      this.maybeAssignAddress(customer, customerModel);

      return customer;
    });

    return customers;
  }

  private maybeAssignAddress(
    customer: Customer,
    customerModel: CustomerModel
  ): void {
    if (
      customerModel.street &&
      customerModel.number &&
      customerModel.city &&
      customerModel.zipCode
    ) {
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.city,
        customerModel.zipCode
      );
      customer.setAddress(address);
    }
  }
}
