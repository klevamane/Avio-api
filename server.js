import express from 'express';
// this is required, even though not used
import colors from 'colors';

import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

import productRoute from './routes/product.js';
import { urlNotFound, errorHandler } from './middleware/error.js';

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

app.use('/api/products', productRoute);

// app.use((err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(statusCode);
//   res.json({
//     message: err.message,
//     stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//   });
//   next();
// });
app.use(errorHandler);

app.use(urlNotFound);

// app.use((req, res, next) => {
//   const error = new Error(`Url - ${req.originalUrl} Not found`);
//   next(error);
// });

const port = process.env.PORT || 6000;

app.listen(
  port,
  console.log(
    `The Server is running in ${process.env.NODE_ENV} mode on port ${port}`.cyan
      .underline,
  ),
);
