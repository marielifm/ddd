import Address from '../../entity/address';
import Customer from '../../entity/customer';
import CustomerAddressChangedEvent from '../customer/address-changed.event';
import CustomerCreatedEvent from '../customer/customer-created.event';
import SendConsoleLog1Handler from '../customer/handler/send-console-log1.handler';
import SendConsoleLog2Handler from '../customer/handler/send-console-log2.handler';
import SendConsoleLog3Handler from '../customer/handler/send-console-log3.handler';
import SendEmailWhenProductIsCreatedHandler from '../product/handler/send-email-when-productIs-created.handler';
import ProductCreatedEvent from '../product/product-created.event';
import EventDispatcher from './event-dispatcher';

describe('Domain events tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent']
    ).toBeDefined();

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
      1
    );

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);
  });

  it('should unregister the event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent']
    ).toBeDefined();

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
      0
    );
  });

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent']
    ).toBeUndefined();
  });

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product 1',
      description: 'Product description',
      price: '100.0'
    });

    eventDispatcher.notify(productCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  });

  it('should register an event when a user is created', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1);

    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent']
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]
    ).toMatchObject(eventHandler1);

    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent']
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length
    ).toBe(2);
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]
    ).toMatchObject(eventHandler2);
  });

  it('should unregister the user created event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]
    ).toMatchObject(eventHandler1);

    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]
    ).toMatchObject(eventHandler2);
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length
    ).toBe(2);

    eventDispatcher.unregister('CustomerCreatedEvent', eventHandler1);

    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent']
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]
    ).toMatchObject(eventHandler2);
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length
    ).toBe(1);
  });

  it('should unregister all user created event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]
    ).toMatchObject(eventHandler1);

    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]
    ).toMatchObject(eventHandler2);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent']
    ).toBeUndefined();
  });

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle');
    const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]
    ).toMatchObject(eventHandler1);

    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]
    ).toMatchObject(eventHandler2);

    const userCreatedEvent = new CustomerCreatedEvent({
      name: 'User 1',
      address: '123 Main Street',
      age: 18
    });

    eventDispatcher.notify(userCreatedEvent);
    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it('should notify event handler when customer changes the address', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog3Handler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChangedEvent']
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0]
    ).toMatchObject(eventHandler);

    const customer = new Customer('1', 'User One');
    const address = new Address('Street Address', 1, '00000000', 'City');
    customer.changeAddress(address);

    const changeAddressEvent = new CustomerAddressChangedEvent({
      id: customer.id,
      nome: customer.name,
      endereco: customer.Address.street
    });

    eventDispatcher.notify(changeAddressEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
