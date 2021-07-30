// sample file to add dummy data
// TODO: update this file for data population

// import database module for database connection
import connectDB from './config/connectDB.js';

// import faker module for dummy data
import faker from 'faker';

// import uniqid for unique id generator
import uniqid from 'uniqid';

// import models
import User from './model/User.js';
import Order from './model/Order.js';
import Worker from './model/Worker.js';

// import mongoose for database connection
import mongoose from 'mongoose';
import dotenv from 'dotenv-safe';
import db from './config/connectDB.js';

// order statuses: Processing, Printing, Finishing, Ready for Delivery, Complete
const statuses = [
  'Processing',
  'Printing',
  'Finishing',
  'Ready for Delivery',
  'Complete',
];

// order types:
const types = ['Tarpaulin', 'Wallpaper', 'Canvas Prints', 'Stickers'];

// data containers
const users = [];
const orders = [];
const workers = [];

for (let ctr = 0; ctr < 10; ctr++) {
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
    id: uniqid(),
    name: uname,
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    contactNo: faker.phone.phoneNumber(),
    payMethod:
      ctr % statuses.length == 0 ? 'Cash On Delivery' : 'Over The Counter',
    workerInCharge: wuname,
    type: types[ctr % types.length] + '',
    quantity: ctr % statuses.length,
    img: '/public/order-images/sample.jpg',
    price: 500.0,
    status: statuses[ctr % statuses.length] + '',
    width: 2500,
    height: 2500,
    frameEdges: null,
    frameFinishing: null,
    dateRequested: '07-21-21',
    dateShipped: '07-22-21',
  });
}

// connect to database
db();

// insert data to database collections
User.insertMany(users);
Order.insertMany(orders);
Worker.insertMany(workers, (err) => {
  if (err) throw err;

  // disconnect database afterwards
  mongoose.disconnect();
});
