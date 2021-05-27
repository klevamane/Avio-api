import Order from './models/order.js';
import Product from './models/product.js';
import User from './models/user.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import products from './data/products.js';
import users from './data/users.js';

dotenv.config();
// We have to do this again because it is no way
// connected to our server, as it's completely seperate
connectDB();

// It is important that the process is only run
// The firstime the app is deployed
// else ensure that the data in the staging/prod is not necessary
const seedData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    // since the admin user was the first to be inserted
    // above
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));
    await Product.insertMany(sampleProducts);
    console.log('Data Successfully Seeded'.green.inverse);
    process.exit();
  } catch (error) {
    console.error('An error occured during Seeding'.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Successfully Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.error('An error occured during Seeding'.red.inverse);
    process.exit(1);
  }
};

// this is used for passing termaials
// eg seeddata -d
// npm install <pkg_name> -d
if (process.argv[2] === '-d') {
  destroyData();
} else {
  seedData();
}
