// TODO: to be deleted
// sample file to add dummy data

// import faker module for dummy data
import faker from 'faker';

// import models
import User from './model/User.js';
import Order from './model/Order.js';
import Worker from './model/Worker.js';

// import mongoose for database connection
import mongoose from 'mongoose';
import dotenv from 'dotenv-safe';

// data containers
const users = [];
const orders = [];
const workers = [];

for (var ctr = 0; ctr < 10; ctr++) {
  const fname = faker.name.firstName(ctr % 2);
  const lname = faker.name.lastName(ctr % 2);
  const uname = fname + lname;
  users.push({
    username: uname,
    password: faker.internet.password(10, true),
    firstname: fname,
    lastname: lname,
    email: faker.internet.email(),
    contactNo: faker.phone.phoneNumber(),
  });
  
  const wfname = faker.name.firstName(ctr % 2);
  const wlname = faker.name.lastName(ctr % 2);
  const wuname = wfname + wlname;
  workers.push({
    username: wuname,
    password: faker.internet.password(10, true),
    firstname: wfname,
    lastname: wlname,
    email: faker.internet.email(),
    contactNo: faker.phone.phoneNumber(),
    isSystemAdmin: ctr % 2 === 0 ? true : false,
  });

  orders.push({
    id: ctr,
    user: faker.name.findName(),
    workerInCharge: faker.name.findName(),
    description: faker.lorem.word(),
    price: 500.0,
    status: faker.lorem.word(),
    size: faker.lorem.word(),
    dataRequested: faker.date.future(),
    dateShipped: faker.date.future(),
  });
}

dotenv.config();

const { PORT, HOST, MONGO_URI, SECRET } = process.env;

// connect to database
// additional connection options
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
// mongodb server
const url = MONGO_URI;
// connect using mongoose
mongoose.connect(url, options, function (error) {
  if (error) throw error;
});


User.insertMany(users);
Order.insertMany(orders);
Worker.insertMany(workers);