import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

//login and register
export const signIn = (data) => API.post('/login', data);
export const signUp = (data) => API.post('/register', data);
