import CreateCustomerUseCase from './create.customer.usecase';

const input = {
  name: 'John',
  address: {
    street: 'Street',
    number: 123,
    zip: 'zip',
    city: 'City'
  }
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  };
};

describe('Create Customer Use Case Unit Test', () => {
  it('should create a customer', async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const output = await customerCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip
      }
    });
  });

  it('should thrown an error when name is missing', async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = '';

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      'name is required'
    );
  });

  it('should thrown an error when street is missing', async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = '';

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      'street is required'
    );
  });
});
