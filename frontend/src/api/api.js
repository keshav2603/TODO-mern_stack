import axios from 'axios';

// Set the base URL for the Axios instance
const api = axios.create({
  baseURL: 'https://todo-mern-stack-0dgv.onrender.com',
});

export default api;
