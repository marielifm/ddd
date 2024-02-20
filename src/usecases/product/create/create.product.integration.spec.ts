import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import ProductRepository from '../../../infra/product/repository/sequelize/product.repository';
import CreateProductUseCase from './create.product.usecase';

describe('Create Product Use Case Integration Tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const repository = new ProductRepository();
    const useCase = new CreateProductUseCase(repository);

    const input = {
      name: 'Product',
      price: 10.0
    };

    const result = await useCase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    });
  });

  it('should thrown an error when name is missing', async () => {
    const repository = new ProductRepository();
    const useCase = new CreateProductUseCase(repository);

    const input = {
      name: '',
      price: 10.0
    };

    await expect(useCase.execute(input)).rejects.toThrow('name is required');
  });

  it('should thrown an error when price is invalid', async () => {
    const repository = new ProductRepository();
    const useCase = new CreateProductUseCase(repository);

    const input = {
      name: 'product',
      price: -10.0
    };

    await expect(useCase.execute(input)).rejects.toThrow('price is invalid');
  });
});
