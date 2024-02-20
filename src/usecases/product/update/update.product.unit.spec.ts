import { Product } from '../../../domain/product/entity/product';
import UpdateProductUseCase from './update.product.usecase';

const product = new Product('123', 'Product 1', 2.09);

const input = {
  id: product.id,
  name: 'Product 2',
  price: 10.86
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  };
};

describe('Update Product Use Case Unit Tests', () => {
  it('should update a product', async () => {
    const repository = MockRepository();
    const useCase = new UpdateProductUseCase(repository);

    const output = await useCase.execute(input);

    expect(output).toEqual(input);
  });
});
