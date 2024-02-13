import CustomerAddressChangedEvent from '../../../domain/customer/event/address-changed.event';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import UpdateCustomerUseCase from './update.customer.usecase';

const customer = CustomerFactory.createWithAddress(
  'John',
  new Address('street', 123, 'zip', 'city')
);

const input = {
  id: customer.id,
  name: 'Jane',
  address: {
    street: 'street updated',
    number: 1233,
    zip: 'zip updated',
    city: 'city updated'
  }
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  };
};

describe('Update Customer Use Case Unit Test', () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository();
    const customerUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
