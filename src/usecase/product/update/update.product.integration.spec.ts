import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import ProductRepository from '../../../infra/product/repository/sequelize/product.repository';
import UpdateProductUseCase from './update.product.usecase';
import { Product } from '../../../domain/product/entity/product';

describe('Update Product Use Case Integration Test', () => {
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

  it('should update a product', async () => {
    const repository = new ProductRepository();
    const useCase = new UpdateProductUseCase(repository);

    const product = new Product('123', 'Product 1', 1.99);
    repository.create(product);

    const input = {
      id: '123',
      name: 'Product 2',
      price: 3.76
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(input);
  });
});
