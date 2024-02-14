import { Product } from '../../../domain/product/entity/product';
import ListProductsUseCase from './list.product.usecase';

const product1 = new Product('123', 'product 1', 10.99);
const product2 = new Product('321', 'product 2', 14.16);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2]))
  };
};

describe('List Product Use Case Unit Tests', () => {
  it('should list all products', async () => {
    const repository = MockRepository();
    const useCase = new ListProductsUseCase(repository);

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
