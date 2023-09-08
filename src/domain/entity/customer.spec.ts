import Address from './address';
import Customer from './customer';

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      let customer = new Customer('', 'John');
    }).toThrowError('ID is required');
  });

  it('should throw error when id is empty', () => {
    expect(() => {
      let customer = new Customer('1', '');
    }).toThrowError('name is required');
  });

  it('should change name', () => {
    let customer = new Customer('1', 'John');
    customer.changeName('Jane');
    expect(customer.name).toBe('Jane');
  });

  it('should throw error when new name is empty', () => {
    let customer = new Customer('1', 'John');
    expect(() => {
      customer.changeName('');
    }).toThrowError('name is required');
  });

  it('should activate customer', () => {
    const customer = new Customer('1', 'John');
    const address = new Address('Street', 123, '88132150', 'City');
    customer.Address = address;
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it('should deactivate customer', () => {
    const customer = new Customer('1', 'John');
    customer.deactivated();
    expect(customer.isActive()).toBe(false);
  });

  it('should throw error when address is undefined when a customer is activated', () => {
    expect(() => {
      const customer = new Customer('1', 'John');
      customer.activate();
    }).toThrowError('Address is mandatory to activate a customer');
  });

  it('should add reward points', () => {
    const customer = new Customer('1', 'John');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
