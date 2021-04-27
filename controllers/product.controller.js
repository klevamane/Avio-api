import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';

/**
 * Returns all products
 * @function getProducts
 * @param  {object} req  The request object.
 * @param  {object} res  The response object
 * @param  {String} next Moves the operation to the next handler or middleware
 * @return {object}
 */
const getProducts = asyncHandler(async (req, res, next) => {
  const { pageSize = 10 } = req.query;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i', // case insensitive
        },
      }
    : {};
  const totalCount = await Product.count({ ...keyword });

  const products = await Product.find({ ...keyword })
    .sort({ createdAt: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  // console.log('TOTAL COUNT2 ', products.length);
  res.json({ products, page, pages: Math.ceil(totalCount / pageSize) });
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
  const product = await (await Product.findById(req.params.id)).populate(
    'reviews',
    'name user',
  );
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

/**
 * Create a product (Admin Only)
 * @function getProducts
 * @param  {object} req  The request object.
 * @param  {object} res  The response object
 * @param  {String} next Moves the operation to the next handler or middleware
 * @return {object}
 */
const createProduct = asyncHandler(async (req, res, next) => {
  const product = new Product({
    user: req.user._id,
    name: 'Sample name',
    description: 'Sample description',
    image: 'images/sample.jpg',
    category: 'Sample category',
    brand: 'Sample brand',
    numReviews: 0,
    countInStock: 0,
    price: 0,
  });
  const createdProduct = await product.save();
  res.status(201).json({ product: createdProduct });
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const { _id, ...data } = { ...req.body };
  // return new(updated document) after the update
  const product = await Product.findByIdAndUpdate(req.params.id, data, {
    new: true,
  });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ product });
});

export {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
};
