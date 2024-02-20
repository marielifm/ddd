import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import ProductRepository from '../../../infra/product/repository/sequelize/product.repository';
import ListProductsUseCase from './list.product.usecase';
import { Product } from '../../../domain/product/entity/product';

describe('List Product Use Case Integration Tests', () => {
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
  it('should list all products', async () => {
    const repository = new ProductRepository();
    const useCase = new ListProductsUseCase(repository);

    const product1 = new Product('123', 'product1', 23.55);
    const product2 = new Product('223', 'product2', 41.83);
    repository.create(product1);
    repository.create(product2);

    const output = await useCase.execute({});

    expect(output.products.length).toEqual(2);
    expect(output.products[0].id).toEqual(product1.id);
    expect(output.products[0].name).toEqual(product1.name);
    expect(output.products[0].price).toEqual(product1.price);

    expect(output.products[1].id).toEqual(product2.id);
    expect(output.products[1].name).toEqual(product2.name);
    expect(output.products[1].price).toEqual(product2.price);
  });
});
