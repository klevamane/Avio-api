import express from 'express';
import products from './data/products.js';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();

const corOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// configure third party middleware
app.use(cors(corOptions));

// Log HTTP methods to console
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('*', (req, res) => {
  console.log('Running here');
  res.send('API is currently running');
});

app.get('/api/products', (req, res) => {
  res.json({ products });
});

app.get('/api/products/:id', (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const product = products.find((prod) => prod._id == req.params.id);
  console.log('product is: ', product);
  res.json(product);
});

const port = process.env.PORT || 6000;

app.listen(
  port,
  console.log(
    `The Server is running in ${process.env.NODE_ENV} mode on port ${port}`.cyan
      .underline,
  ),
);
