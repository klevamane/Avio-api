import { MongoMemoryServer } from 'mongodb-memory-server-core';
import colors from 'colors';
import mongoose from 'mongoose';

const mongod = new MongoMemoryServer();
let uri;
export const connectDB = async () => {
  try {
    uri = process.env.MONGO_URI;
    if (process.env.NODE_ENV === 'test') {
      uri = await mongod.getConnectionString();
    }

    const conn = await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.white.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    console.log('Perhpas you can also check if mongodb is actually running');
    process.exit(1);
  }
};

export const clearDB = async () => {
  const { collections } = mongoose.connection;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

export const closeDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};
