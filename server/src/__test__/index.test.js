import request from 'supertest';
import app from '../app.js';

describe('Test Index Route', () => {
  it('should respond with 200 status code', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('/GET home should respond with 200 status code', async () => {
    const response = await request(app).get('/home');
    expect(response.statusCode).toBe(200);
  });

  //it('/GET logout should respond with 200 status code', async () => {
  //  const response = await request(app).get('/logout').send({
  //    cart: 'undefined',
  //  });
  //  expect(response.statusCode).toBe(204);
  //});

  it('/GET register should respond with 200 status code', async () => {
    const response = await request(app).get('/register');
    expect(response.statusCode).toBe(200);
  });

  //it('should respond with 201 status code when registering a new user', async () => {
  //  const response = await request(app).post('/register').send({
  //    username: 'userA',
  //    pw: 'userA',
  //    repeatPw: 'userA',
  //    firstname: 'user',
  //    lastname: 'A',
  //    contactNo: '123456789',
  //    email: 'userA@sample.com',
  // });
  //  expect(response.statusCode).toBe(201);
    //expect(response.body).toEqual({"username": "userA"});
  //});

  it('should respond with 422 status code if username exist', async () => {
    const response = await request(app).post('/register').send({
      username: 'Sonson_Great',
      pw: 'Hakdoq1234',
      repeatPw: 'Hakdoq1234',
      firstname: 'Sonson',
      lastname: 'Great',
      contactNo: '123456789',
      email: 'sonson_great@sample.com',
    });
    expect(response.statusCode).toBe(422);
    expect(response.body).toEqual({"error": "Username already exists"});
  });

  it('should respond with 422 status code if email exist', async () => {
    const response = await request(app).post('/register').send({
      username: 'Sonson_Great2',
      pw: 'Hakdoq12345',
      repeatPw: 'Hakdoq12345',
      firstname: 'Sonson',
      lastname: 'Great2',
      contactNo: '012345678',
      email: 'sonson_great@sample.com',
    });
    expect(response.statusCode).toBe(422);
    expect(response.body).toEqual({"error": "E-mail already exists"});
  });
  
  it('should respond with 422 status code if an information is missing', async () => {
    const response = await request(app).post('/register').send({
      //username: 'Sonson_Great2',
      pw: 'Hakdoq12345',
      repeatPw: 'Hakdoq12345',
      firstname: 'Sonson',
      lastname: 'Great2',
      contactNo: '012345678',
      email: 'sonson_great@sample.com', //error on email
    });
    expect(response.statusCode).toBe(422);
    //expect(response.body).toEqual({"error": "E-mail already exists"});
  });

  it('should respond with 422 status code if a repeat password is not the same as password', async () => {
    const response = await request(app).post('/register').send({
      username: 'Sonson_Great2',
      pw: 'Hakdoq12345',
      repeatPw: 'Hakdoq1234',
      firstname: 'Sonson',
      lastname: 'Great2',
      contactNo: '012345678',
      email: 'sonson_great@sample.com', 
    });
    expect(response.statusCode).toBe(422);
    //expect(response.body).toEqual({"error": "E-mail already exists"});
  });

  it('should respond with 200 status code when logging in', async () => {
    const response = await request(app).post('/login').send({
      username: 'RobinHomenick',
      password: 'lakivejayu',
    });
    expect(response.statusCode).toBe(200);
    //expect(response.body).toContain({"username": "DeweyBrown"});
  });
  
  it('should respond with 200 status when username is wrong', async () => {
    const response = await request(app).post('/login').send({
      username: 'RobinHomenickk',
      password: 'lakivejayu',
    });
    expect(response.statusCode).toBe(422);
    expect(response.body).toEqual({"error": "Incorrect username or password"});
  });

  it('should respond with 200 status when password is wrong', async () => {
    const response = await request(app).post('/login').send({
      username: 'RobinHomenick',
      password: 'lakivejayuu',
    });
    expect(response.statusCode).toBe(422);
    expect(response.body).toEqual({"error": "Incorrect username or password"});
  });

  it('should respond with 200 status when username is missing', async () => {
    const response = await request(app).post('/login').send({
      //username: 'RobinHomenick',
      password: 'lakivejayu',
    });
    expect(response.statusCode).toBe(422);
    expect(response.body).toEqual({"error": "Incorrect username or password"});
  });

  it('should respond with 200 status when password is missing', async () => {
    const response = await request(app).post('/login').send({
      username: 'RobinHomenick',
      //password: 'lakivejayu',
    });
    expect(response.statusCode).toBe(422);
    expect(response.body).toEqual({"error": "Incorrect username or password"});
  });

  it('should respond with 200 status when information is missing', async () => {
    const response = await request(app).post('/login').send({
      //username: 'RobinHomenick',
      //password: 'lakivejayu',
    });
    expect(response.statusCode).toBe(422);
    expect(response.body).toEqual({"error": "Incorrect username or password"});
  });

});
