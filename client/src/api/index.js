import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

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
export const getAllOrderSetsScheduled = () =>
  API.get('/order/orders/deliveries');
export const getUserOrderSets = (username) => API.get(`/order/${username}`);
export const getUserOrderSetsFiltered = (username, status) =>
  API.get(`/order/${username}/filter/${status}`);
export const getUserActiveOrderSets = (username) =>
  API.get(`/order/${username}/user-active`);
export const getAllActiveOrderSets = () =>
  API.get(`/order/orders/users-active`);
export const getAllPastOrderSets = () => API.get(`/order/orders/users-past`);
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
export const updateOrderSet = (id, data) =>
  API.patch(`/order/update/orderSet/${id}`, data);
export const setDelivery = (id, data) =>
  API.patch(`/order/update/orderSet/delivery/${id}`, data);
export const updateOrder = (id, data) =>
  API.patch(`/order/update/order/${id}`, data);
export const updateOrderSetReported = (id, status) =>
  API.patch(`/order/update/orderSet/reported/${id}`, status);

// user data api methods
export const getUsers = () => API.get('/users');
export const getUser = (username) => API.get(`/users/${username}`);
export const patchUser = (username, data) =>
  API.patch(`/users/${username}`, data);

// report data api methods
export const getAllReports = () => API.get('/report');
export const getFilteredReports = (status) =>
  API.get(`/report/filter/${status}`);
export const getUserReports = (username) => API.get(`/report/${username}`);
export const getReport = (id) => API.get(`/report/details/${id}`);
export const getOrderSetReport = (id) =>
  API.get(`/report/details/orderSet/${id}`);
export const addReport = (report) => API.post('/report/add/new', report);
export const addNote = (id, data) => API.patch(`/report/note/${id}`, data);
export const removeNote = (id, data) =>
  API.patch(`/report/note/remove/${id}`, data);
export const deleteReport = (id) => API.delete(`/report/delete/${id}`);
export const updateReportStatus = (id, data) =>
  API.patch(`/report/update/${id}`, data);

// payment receipt data api methods
export const getAllPayments = () => API.get('/payment');
export const getFilteredPayments = (status) =>
  API.get(`/payment/filter/${status}`);
export const getUserPayments = (username) => API.get(`/payment/${username}`);
export const getOrderSetIdPayments = (orderSetId) =>
  API.get(`/payment/${orderSetId}/payments`);
export const getPayment = (id) => API.get(`/payment/details/${id}`);
export const addPayment = (payment) => API.post('/payment/add/new', payment);
export const verifyPayment = (id, data) =>
  API.patch(`/payment/update/${id}`, data);
export const deletePayment = (id) => API.delete(`/payment/delete/${id}`);

// worker data api methods
export const getWorker = (username) => API.get(`/workers/${username}`);
export const getWorkers = () => API.get('/workers');

// admin data api methods
export const registerWorker = (staffData) =>
  API.post('/admin/registerWorker', staffData);
export const deleteWorker = (username) =>
  API.delete(`admin/deleteWorker/${username}`);
export const updateWorker = (username, staffData) =>
  API.patch(`admin/updateWorker/${username}`, staffData);

// send email to client api methods
export const sendEmailOrderPlaced = (emailData) =>
  API.post('/email/client/sendEmailOrderPlaced', emailData);
export const sendEmailReport = (user) =>
  API.post('/email/client/sendEmailReport', user);
export const sendEmailProjectCost = (emailData) =>
  API.post(`/email/client/sendEmailProjectCost`, emailData);
export const sendEmailProcessingOrder = (emailData) =>
  API.post(`/email/client/sendEmailProcessingOrder`, emailData);
export const sendEmailOrderComplete = (emailData) =>
  API.post(`/email/client/sendEmailOrderComplete`, emailData);

// send email to staff api methods
export const sendEmailNewOrder = (emailData) =>
  API.post('/email/staff/sendEmailNewOrder', emailData);
export const sendEmailNewPayment = (id) =>
  API.post(`/email/staff/sendEmailNewPayment`, id);
export const sendEmailNewDelivery = (emailData) =>
  API.post(`/email/staff/sendEmailNewDelivery`, emailData);
export const sendEmailNewReport = (id) =>
  API.post(`/email/staff/sendEmailNewReport`, id);
