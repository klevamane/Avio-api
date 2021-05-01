import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { expect } from 'chai';
import Product from '../models/product.js';

import productsFixture from './fixtures/products.fixtures.js';

let mongoServer;

before(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Products', () => {
  it('should get the total number of products', async () => {
    const cnt = await Product.countDocuments();
    expect(cnt).to.equal(0);
  });
});
