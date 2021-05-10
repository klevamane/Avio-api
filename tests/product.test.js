import { clearDB, closeDB, connectDB } from '../config/db.js';

import Product from '../models/product.js';
import User from '../models/user.js';
import app from '../server.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
import colors from 'colors';
import { productFactory as productFixture } from './fixtures/products.fixtures.js';

const { expect } = chai;
chai.use(chaiHttp);

let adminUserToken;

/**
 * Connect to a new in-memory database before running any tests.
 */
before(async () => {
  connectDB();

  const user = new User({
    email: 'admin@test.com',
    password: 'password123#',
    isAdmin: true,
    name: 'admin user',
  });
  await user.save();
  const {
    body: {
      user: { token },
    },
  } = await chai
    .request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@test.com', password: 'password123#' });
  adminUserToken = token;
});

/**
 * Create an admin user before each test.
 */

/**
 * Clear all test data after every test.
 */
// afterEach(async () => await clearDB());

/**
 * Remove and close the db and server.
 */
after(async () => {
  await clearDB();
  await closeDB();
});

/**
 * Product test suite.
 */
describe('Products'.yellow, () => {
  it('should get the list of products product', async () => {
    await Product(productFixture.generate()).save();
    const response = await chai.request(app).get('/api/products');
    const { body } = response;
    expect(response).to.have.status(200);
    expect(body).to.have.key('products', 'page', 'pages');
    expect(body).to.have.property('products');
    expect(body).to.have.nested.property('products[0].brand');
  });

  it('should get a product by Id', async () => {
    const product = await Product(productFixture.generate()).save();
    // product = await product.save();
    const { body, status } = await chai
      .request(app)
      .get(`/api/products/${product._id}`);
    productAssertions(body, status);
  });

  it('should not create a product (permission denied)', async () => {
    const data = productFixture.generate();
    const { body, status } = await chai
      .request(app)
      .post('/api/products/admin/create')
      .send(data);
    expect(status).to.equals(401);
    expect(body.message).to.equal(
      "Permission denied token not found or it's invalid",
    );
  });
});

describe('Admin Products'.yellow, () => {
  it('should create a product by admin', async () => {
    const response = await chai
      .request(app)
      .post('/api/products/admin/create')
      .set('Authorization', `Bearer ${adminUserToken}`)
      .send({});
    const { body, status } = response;
    expect(body).to.have.property('product');
    productAssertions(body.product, status, 201);
  });

  it('should update a product by admin', async () => {
    const product = await Product.findOne();
    const response = await chai
      .request(app)
      .patch(`/api/products/admin/update/${product._id}`)
      .set('Authorization', `Bearer ${adminUserToken}`)
      .send({
        name: 'newProductName',
        price: 300,
        description: 'new description',
      });
    const { body, status } = response;
    expect(body).to.have.property('product');
    expect(status).to.equal(200);
    expect(body.product.name).to.be.equal('newProductName');
    expect(body.product.price).to.be.equal(300);
    expect(body.product.description).to.be.equal('new description');
  });
});

const productAssertions = (body, status, statusCode = 200) => {
  expect(status).to.equal(statusCode);
  const attributes = [
    'reviews',
    'price',
    'user',
    'brand',
    'category',
    'description',
    'numReviews',
  ];
  for (const idx in attributes) {
    expect(body).to.have.property(attributes[idx]);
  }
};
