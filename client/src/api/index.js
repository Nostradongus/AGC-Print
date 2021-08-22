import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// for user access token
API.interceptors.request.use((req) => {
  req.withCredentials = true;
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// user authentication api methods
export const signIn = (userData) => API.post('/login', userData);
export const signOut = () => API.get('/logout');
export const signUp = (userData) => API.post('/register', userData);

// order data api methods
export const getAllOrderSets = () => API.get('/order');
export const getUserOrderSets = (username) => API.get(`/order/${username}`);
export const getUserOrderSetsFiltered = (username, status) =>
  API.get(`/order/${username}/filter/${status}`);
export const getUserCurrentOrderSets = (username) => API.get(`/order/${username}/current`);
export const getAllActiveOrderSets = () => API.get(`/order/orders/active`);
export const getAllOrderSetsFiltered = (status) => API.get(`/order/orders/filter/${status}`);
export const getOrder = (id) => API.get(`/order/details/${id}`);
export const getOrderSet = (id) => API.get(`/order/details/orderSet/${id}`);
export const deleteFromCart = (imgPath) =>
  API.delete('/order/cart/delete', { imgPath });
export const addToCart = (orderData) => API.post('/order/cart/add', orderData);
export const addOrderSet = (orders) => API.post('/order/cart/confirm', orders);
export const deleteOrder = (id) => API.delete(`/order/delete/${id}`);
export const deleteOrderSet = (id) =>
  API.delete(`/order/delete/orderSet/${id}`);
export const updateOrderSetStatus = (id, status) =>
  API.patch(`/order/update/orderSet/${id}`, status);

// user data api methods
export const getUsers = () => API.get('/users');
export const getUser = (username) => API.get(`/users/${username}`);

// report data api methods
export const getAllReports = () => API.get('/report');
export const getUserReports = (username) => API.get(`/report/${username}`);
export const getReport = (id) => API.get(`/report/details/${id}`);
export const addReport = (report) => API.post('/report/add/new', report);
export const deleteReport = (id) => API.delete(`/report/delete/${id}`);
export const updateReportStatus = (id) => API.patch(`/report/update/${id}`);

// payment receipt data api methods
export const getAllPayments = () => API.get('/payment');
export const getUserPayments = (username) => API.get(`/payment/${username}`);
export const getPayment = (id) => API.get(`/report/details/${id}`);
export const addPayment = (payment) => API.post('/payment/add/new', payment);
export const deletePayment = (id) => API.delete(`/report/delete/${id}`);
