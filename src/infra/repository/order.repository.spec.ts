import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../db/sequelize/model/customer.model';
import OrderModel from '../db/sequelize/model/order.model';
import OrderItemModel from '../db/sequelize/model/order-item.model';
import ProductModel from '../db/sequelize/model/product.model';
import CustomerRepository from './customer.repository';
import Customer from '../../domain/customer/entity/customer';
import Address from '../../domain/customer/value-object/address';
import ProductRepository from './product.repository';
import { Product } from '../../domain/product/entity/product';
import Order from '../../domain/checkout/entity/order';
import OrderRepository from './order.repository';
import OrderItem from '../../domain/checkout/entity/orderItem';

describe('Order repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: '123'
        }
      ]
    });
  });

  it('should find an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      1
    );

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderResult = await orderRepository.find(order.id);

    expect(order).toStrictEqual(orderResult);
  });

  it('should throw an error when an order is not found', async () => {
    const orderRepository = new OrderRepository();

    expect(async () => {
      await orderRepository.find('ABC');
    }).rejects.toThrow('Order not found');
  });

  it('should update an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    const product2 = new Product('321', 'Product 2', 20);
    await productRepository.create(product);
    await productRepository.create(product2);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    });

    expect(orderModel.items).toHaveLength(1);
    expect(orderModel.total).toEqual(20);

    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      product2.id,
      4
    );

    const order2 = new Order('123', '123', [orderItem2]);
    await orderRepository.update(order2);

    const result = await orderRepository.find('123');
    expect(result.items).toHaveLength(2);
    expect(result.total()).toEqual(100);
  });

  it('should throw an error when update an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    const product2 = new Product('321', 'Product 2', 20);
    await productRepository.create(product);
    await productRepository.create(product2);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    });

    expect(orderModel.items).toHaveLength(1);
    expect(orderModel.total).toEqual(20);

    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      product2.id,
      4
    );

    const order2 = new Order('321', '123', [orderItem2]);
    expect(async () => {
      await orderRepository.update(order2);
    }).rejects.toThrow('Error updating order and items');
  });

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    const product2 = new Product('321', 'Product 2', 1);
    await productRepository.create(product);
    await productRepository.create(product2);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      1
    );

    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      product2.id,
      1
    );

    const order = new Order('123', '123', [orderItem]);
    const order2 = new Order('321', '123', [orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const result = await orderRepository.findAll();

    expect(result).toHaveLength(2);
    expect(result).toContainEqual(order);
    expect(result).toContainEqual(order2);
  });

  it('should throw an error when any order are found', async () => {
    const orderRepository = new OrderRepository();

    expect(async () => {
      await orderRepository.findAll();
    }).rejects.toThrow('Orders not found');
  });
});
