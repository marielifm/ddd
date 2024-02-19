import express, { Request, Response } from 'express';
import ProductCreateUseCase from '../../../usecase/product/create/create.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import ListProductsUseCase from '../../../usecase/product/list/list.product.usecase';
import FindProductUseCase from '../../../usecase/product/find/find.product.usecase';

export const productsRoute = express.Router();

productsRoute.post('/', async (req: Request, res: Response) => {
  const useCase = new ProductCreateUseCase(new ProductRepository());

  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price
    };

    const output = await useCase.execute(productDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productsRoute.get('/', async (req: Request, res: Response) => {
  const useCase = new ListProductsUseCase(new ProductRepository());

  try {
    const output = await useCase.execute({});
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productsRoute.get('/:id', async (req: Request, res: Response) => {
  const useCase = new FindProductUseCase(new ProductRepository());
  const { id } = req.params;

  try {
    const productDto = {
      id: id
    };

    const output = await useCase.execute(productDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
