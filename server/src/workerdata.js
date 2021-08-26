/* eslint-disable require-jsdoc */
// import database module for database connection
import connectDB from './config/connectDB.js';

// import bcrypt module for password hashing
import bcrypt from 'bcrypt';
const saltRounds = 10;

// import faker module for dummy data
import faker from 'faker';

import Worker from './model/Worker.js';

// import mongoose for database disconnection
import mongoose from 'mongoose';

const workers = [];

async function generateData() {
  // hashed password for all dummy users
  const hashedPassword = await bcrypt.hash('password', saltRounds);

  const wfname = faker.name.firstName(1);
  const wlname = faker.name.lastName(1);
  const wuname = wfname + wlname;
  workers.push({
    username: wuname.toLowerCase(),
    password: hashedPassword,
    firstname: wfname,
    lastname: wlname,
    email: faker.internet.email(),
    contactNo: faker.phone.phoneNumber(),
    isSystemAdmin: 0 === 0 ? true : false,
  });

  connectDB();

  // insert data to database collections
  Worker.insertMany(workers, (err) => {
    if (err) throw err;

    // disconnect database afterwards
    mongoose.disconnect();
  });
}

// start dummy data generation
generateData();
