import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// for user access token
API.interceptors.request.use((req) => {
  req.withCredentials = true;
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      localStorage.getItem("token")
    }`;
  }
  console.log(req);
  return req;
});

// user authentication api methods
export const signIn = (userData) => API.post('/login', userData);
export const signOut = () => API.get('/logout');
export const signUp = (userData) => API.post('/register', userData);

// order data api methods
export const getAllOrders = () => API.get('/order');
export const getUserOrders = (username) => API.get(`/order/${username}`);
export const getOrder = (id) => API.get(`/order/details/${id}`);
export const getUserPastOrders = (username) => API.get(`/order/${username}/pastOrders`);
export const getUserCurrentOrders = (username) => API.get(`/order/${username}/currentOrders`);
export const deleteFromCart = (imgPath) => API.delete('order/cart/delete', { imgPath });
export const addToCart = (orderData) => API.post('/order/cart/add', orderData);
export const addOrders = () => API.post('/order/cart/confirm');

// user data api methods
export const getUsers = () => API.get('/users');
export const getUser = (username) => API.get(`/users/${username}`);
