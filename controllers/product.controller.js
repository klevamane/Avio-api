import Product from '../models/product.js';
import asyncHandler from 'express-async-handler';

/**
 * Returns all products
 * @function getProducts
 * @param  {object} req  The request object.
 * @param  {object} res  The response object
 * @param  {String} next Moves the operation to the next handler or middleware
 * @return {object}
 */
const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.json({ products });
});

/**
 * Returns a single product by it's id
 * @function getProducts
 * @param  {object} req  The request object.
 * @param  {object} res  The response object
 * @param  {String} next Moves the operation to the next handler or middleware
 * @return {object}
 */
const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error('Product not found');
});

/**
 * Deletes a single product by it's id (Admin Only)
 * @function getProducts
 * @param  {object} req  The request object.
 * @param  {object} res  The response object
 * @param  {String} next Moves the operation to the next handler or middleware
 * @return {object}
 */
const deleteProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.remove();
    return res.json({ message: 'Operation successfull' });
  }
  res.status(404);
  throw new Error('Product not found');
});

export { getProducts, getProductById, deleteProductById };
