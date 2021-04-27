import { errorHandler, urlNotFound } from './middleware/error.middleware.js';

import UserRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
// this is required, even though not used
import colors from 'colors';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import orderRoutes from './routes/order.routes.js';
import path from 'path';
import productRoutes from './routes/product.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import reviewRoutes from './routes/review.routes.js';

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
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID),
);

// mimic __dirname from common js which
// insint available in the type: module synthax
const __dirname = path.resolve();
// this is how we can make a folder static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
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
