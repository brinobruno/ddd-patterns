import express, { Request, Response } from "express";

import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import type { CreateProductInputDto } from "../../../usecase/product/create/create.product.dto";

export const productRoute = express.Router();

productRoute.post("/", async (request: Request, response: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository());

  const { name, price } = request.body;

  try {
    const productDto: CreateProductInputDto = {
      name,
      price,
    };

    const output = await useCase.execute(productDto);
    response.status(201).send(output);
  } catch (err) {
    console.error(err);
    response.status(500).send(err);
  }
});

productRoute.get("/", async (request: Request, response: Response) => {
  const useCase = new ListProductUseCase(new ProductRepository());

  try {
    const output = await useCase.execute({});
    response.send(output).status(200);
  } catch (err) {
    console.error(err);
    response.status(500).send(err);
  }
});
