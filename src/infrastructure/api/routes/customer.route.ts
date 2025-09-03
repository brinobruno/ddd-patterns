import express, { Request, Response } from "express";

import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import type { InputCreateCustomerDto } from "../../../usecase/customer/create/create.customer.dto";

export const customerRoute = express.Router();

customerRoute.post("/", async (request: Request, response: Response) => {
  const useCase = new CreateCustomerUseCase(new CustomerRepository());

  const { name, address } = request.body;

  try {
    const customerDto: InputCreateCustomerDto = {
      name,
      address: {
        street: address.street,
        number: address.number,
        zipCode: address.zipCode,
        city: address.city,
      },
    };

    const output = await useCase.execute(customerDto);
    response.status(201).send(output);
  } catch (err) {
    console.error(err);
    response.status(500).send(err);
  }
});

customerRoute.get("/", async (request: Request, response: Response) => {
  const useCase = new ListCustomerUseCase(new CustomerRepository());

  try {
    const output = await useCase.execute({});
    response.send(output).status(200);
  } catch (err) {
    console.error(err);
    response.status(500).send(err);
  }
});
