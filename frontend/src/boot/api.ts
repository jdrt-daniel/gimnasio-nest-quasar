import axios from 'axios';

const token = localStorage.getItem('token');
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

const api = axios;
export default api;
