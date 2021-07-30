// sample file to add dummy data
// TODO: update this file for data population

// import database module for database connection
import connectDB from './config/connectDB.js';

// import faker module for dummy data
import faker from 'faker';

// import models
import User from './model/User.js';
import Order from './model/Order.js';
import Worker from './model/Worker.js';

// import mongoose for database connection
import mongoose from 'mongoose';
import dotenv from 'dotenv-safe';
import db from './config/connectDB.js';

// data containers
const users = [];
const orders = [];
const workers = [];

for (const ctr = 0; ctr < 10; ctr++) {
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
    user: uname,
    workerInCharge: wuname,
    description: faker.lorem.word(),
    price: 500.0,
    status: faker.lorem.word(),
    size: faker.lorem.word(),
    dateRequested: '07-21-21',
    dateShipped: '07-22-21',
  });
}

// connect to database
db();

// insert data to database collections
User.insertMany(users);
Order.insertMany(orders);
Worker.insertMany(workers);

// disconnect to database afterwards
mongoose.disconnect();
