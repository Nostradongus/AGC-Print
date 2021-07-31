import request from 'supertest';
import app from '../app.js';

describe('Test Worker Route', () => {
  it('should respond with 200 status code when requesting all workers', async () => {
    const response = await request(app).get('/workers/');
    expect(response.statusCode).toBe(200);
  });

  it('should respond with 200 status code when specific worker is found', async () => {
    const response = await request(app).get('/workers/GwendolynLynch');
    expect(response.statusCode).toBe(200);
  });

  
  it('should respond with 404 status code when specific worker does not exist', async () => {
    const response = await request(app).get('/workers/idonotexist');
    expect(response.statusCode).toBe(404);
  });

  /* REGISTER WORKER TEST */
  /* 
  it('should respond with 201 status code when worker is successfully uploaded', async () => {
    const response = await request(app).post('/workers/register').send({
        username: 'newworker',
        password: 'newworkerpassword',
        firstname: 'David',
        lastname: 'Lynch',
        email: 'davidlynch@gmail.com',
        contactNo: '09951292234',
        isSystemAdmin: 'false',
    });
    expect(response.statusCode).toBe(201);
  });
  */

  it('should respond with 500 status code when fields are incomplete for worker register', async () => {
    const response = await request(app).post('/workers/register').send({
        username: 'newworker',
        password: 'newworkerpassword',
        firstname: 'David',
        lastname: 'Lynch',
         /* Registering a worker with missing fields (missing email & contact number) */
        // email: 'davidlynch@gmail.com', 
        // contactNo: '09951292234',
        isSystemAdmin: 'false',
    });
    expect(response.statusCode).toBe(500);
  });



});
