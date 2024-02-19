import request from 'supertest';
import { app, sequelize } from '../express';

describe('E2E tests for products', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const response = await request(app).post('/products').send({
      name: 'Product 1',
      price: 10.99
    });

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(expect.any(String));
    expect(response.body.name).toBe('Product 1');
    expect(response.body.price).toBe(10.99);
  });

  it('should not create a product', async () => {
    const response = await request(app).post('/products').send({
      name: 'Product'
    });

    expect(response.status).toBe(500);
  });

  it('should list all products', async () => {
    const product1 = await request(app).post('/products').send({
      name: 'Product 1',
      price: 10.9
    });

    const product2 = await request(app).post('/products').send({
      name: 'Product 2',
      price: 1.99
    });

    expect(product1.status).toBe(200);
    expect(product2.status).toBe(200);

    const listResponse = await request(app).get('/products').send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);

    const products1 = listResponse.body.products[0];
    const products2 = listResponse.body.products[1];

    expect(products1.name).toBe('Product 1');
    expect(products1.price).toBe(10.9);
    expect(products2.name).toBe('Product 2');
    expect(products2.price).toBe(1.99);
  });

  it('should find a product', async () => {
    const response = await request(app).post('/products').send({
      name: 'Product 1',
      price: 10.99
    });
    expect(response.status).toBe(200);

    const productId = response.body.id;
    const productResponse = await request(app)
      .get(`/products/${productId}`)
      .send();

    expect(productResponse.status).toBe(200);
    expect(productResponse.body.name).toBe('Product 1');
    expect(productResponse.body.price).toBe(10.99);
  });

  it('should not find a product', async () => {
    const productResponse = await request(app).get(`/products/abc-123`).send();

    expect(productResponse.status).toBe(500);
  });
});
