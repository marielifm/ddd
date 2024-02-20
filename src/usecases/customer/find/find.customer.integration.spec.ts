import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../infra/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infra/customer/repository/sequelize/customer.repository';
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import FindCustomerUseCase from './find.customer.usecase';

describe('Find Use Case test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a customer', async () => {
    const repository = new CustomerRepository();

    const useCase = new FindCustomerUseCase(repository);

    const customer = new Customer('123', 'John');
    const address = new Address('street', 123, 'zip', 'city');
    customer.changeAddress(address);
    repository.create(customer);

    const input = {
      id: '123'
    };

    const output = {
      id: '123',
      name: 'John',
      address: {
        street: 'street',
        number: 123,
        city: 'city',
        zip: 'zip'
      }
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });
});
