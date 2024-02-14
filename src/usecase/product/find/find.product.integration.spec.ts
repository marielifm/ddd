import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import ProductRepository from '../../../infra/product/repository/sequelize/product.repository';
import FindProductUseCase from './find.product.usecase';
import { Product } from '../../../domain/product/entity/product';

describe('Find Product Use Case Integration Test', () => {
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

  it('should find a product', async () => {
    const repository = new ProductRepository();
    const useCase = new FindProductUseCase(repository);

    const product = new Product('123', 'Product 1', 10.9);
    repository.create(product);

    const input = {
      id: '123'
    };

    const output = {
      id: '123',
      name: 'Product 1',
      price: 10.9
    };

    const result = await useCase.execute(input);
    expect(result).toEqual(output);
  });
});
