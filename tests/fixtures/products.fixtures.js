import Order from '../../models/order.js';
import Product from '../../models/product.js';
import { factory } from 'fakingoose';

export const productFactory = factory(Product.schema, {
  reviews: { skip: true },
});

export const orderFactory = factory(Order.schema);
