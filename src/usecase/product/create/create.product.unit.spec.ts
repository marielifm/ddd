import ProductCreateUseCase from './create.product.usecase';

const input = {
  name: 'Product',
  price: 10.9
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  };
};

describe('Create Product Use Case Unit Tests', () => {
  it('should create a new product', async () => {
    const repository = MockRepository();
    const productCreateUseCase = new ProductCreateUseCase(repository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    });
  });

  it('should thrown an error when name is missing', async () => {
    const repository = MockRepository();
    const productCreateUseCase = new ProductCreateUseCase(repository);

    input.name = '';

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      'name is required'
    );
  });

  it('should thrown an error when price is invalid', async () => {
    const repository = MockRepository();
    const productCreateUseCase = new ProductCreateUseCase(repository);

    input.name = 'Product';
    input.price = -10;

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      'price is invalid'
    );
  });
});
