import axios from 'axios';

const API = axios.create({ baseURL: 'https://agc-print.herokuapp.com' });

// for user access token
API.interceptors.request.use((req) => {
  req.withCredentials = true;
  if (localStorage.getItem('user') || localStorage.getItem('worker')) {
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
export const getUserActiveOrderSets = (username) =>
  API.get(`/order/${username}/active`);
export const getAllActiveOrderSets = () => API.get(`/order/orders/actives`);
export const getAllOrderSetsFiltered = (status) =>
  API.get(`/order/orders/filter/${status}`);
export const getOrder = (id) => API.get(`/order/details/${id}`);
export const getOrderSet = (id) => API.get(`/order/details/orderSet/${id}`);
export const getOrdersFromOrderSet = (id) =>
  API.get(`/order/orderSet/orders/${id}`);
export const deleteFromCart = (filename) =>
  API.delete(`/order/cart/delete/${filename}`);
export const addToCart = (orderData) => API.post('/order/cart/add', orderData);
export const addOrderSet = (orders) => API.post('/order/cart/confirm', orders);
export const deleteOrder = (id) => API.delete(`/order/delete/${id}`);
export const deleteOrderSet = (id) =>
  API.delete(`/order/delete/orderSet/${id}`);
export const updateOrderSetStatus = (id, status) =>
  API.patch(`/order/update/orderSet/status/${id}`, status);
export const updateOrderStatus = (id, status) =>
  API.patch(`/order/update/order/status/${id}`, status);
export const updateOrderSetReported = (id, status) =>
  API.patch(`/order/update/orderSet/reported/${id}`, status);
export const updateOrderSetPrice = (id, price) =>
  API.patch(`/order/update/orderSet/price/${id}`, price);
export const updateOrderPrice = (id, price) =>
  API.patch(`/order/update/order/price/${id}`, price);
export const sendEmailOrderPlaced = (id, name, email) =>
  API.post('/order/cart/confirm/sendEmailOrderPlaced', {
    id: id,
    name: name,
    email: email,
  });

// user data api methods
export const getUsers = () => API.get('/users');
export const getUser = (username) => API.get(`/users/${username}`);
export const patchUser = (username, data) =>
  API.patch(`/users/${username}`, data);

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
export const getOrderSetIdPayments = (orderSetId) =>
  API.get(`/payment/${orderSetId}/payments`);
export const getPayment = (id) => API.get(`/report/details/${id}`);
export const addPayment = (payment) => API.post('/payment/add/new', payment);
export const deletePayment = (id) => API.delete(`/report/delete/${id}`);
