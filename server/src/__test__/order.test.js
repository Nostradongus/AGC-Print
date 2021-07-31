import request from 'supertest';
import app from '../app.js';
import OrderModel from '../model/Order.js';

describe('Test Order Route', () => {

    it('should respond with 200 status code for getting all orders', async () => {
        const response = await request(app).get('/order/');
        expect(response.statusCode).toBe(200);
    });

    it('should respond with 200 status code for getting all orders of specific user', async () => {
        const response = await request(app).get('/order/DeweyBrown');
        //const response = await request(app).get('/order/:username'); - same result
        expect(response.statusCode).toBe(200);
    });

    it('should respond with 200 status code for getting a specific user', async () => {
        const response = await request(app).get('/order/details/20tllf6aakkrqjzdmh');
        //const response = await request(app).get('/order/:username'); - same result
        expect(response.statusCode).toBe(200);
    });

    it('should respond with 404 status code for getting a specific user with no id given', async () => {
        const response = await request(app).get('/order/details/:id');
        //const response = await request(app).get('/order/:username'); - same result
        expect(response.statusCode).toBe(404);
    });

    it('should respond with 200 status code for checking out', async () => {
        const response = await request(app).get('/order/checkout');
        expect(response.statusCode).toBe(200);
    });


    
    it('should respond with 202 status code for deleting an order from cart', async () => {
        const response = await request(app).get('/order/delete-from-cart/20tllf6aakkrqjzdmh');
        expect(response.statusCode).toBe(200);
    });

    it('should respond with 200 status code for adding orders into the database', async () => {
        const response = await request(app).post('/order/add-orders').send({
            cart: {
                newOrder: {
                    id: "20tllf6aakkrqjzrew",
                    name: "ValerieSauer",
                    email: "Israel.Collier@gmail.com",
                    address: "967 Yessenia Hollow",
                    contactNo: "1-494-478-3466 x4234",
                    payMethod: "Over The Counter",
                    workerInCharge: "IrmaJacobs",
                    type: "wallpaper",
                    quantity: "2",
                    img: "/public/order-images/sample.jpg",
                    price: 500,
                    status: "Complete",
                    width: "2500",
                    height: "2500",
                    frameEdges: null,
                    frameFinishing: null,
                    dateRequested: "07-21-21",
                    dateShipped: "07-22-21",
                }
            }
        });
        expect(response.statusCode).toBe(200);
    });

});