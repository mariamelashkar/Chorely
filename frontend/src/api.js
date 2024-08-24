import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Create an instance of axios
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Include credentials in requests
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Define API calls
export const fetchTasks = () => api.get('/user/tasks').then((res) => res.data);

export const login = (credentials) => api.post('/login', credentials).then((res) => res.data);

export const fetchUsers = () => api.get('/admin/users').then((res) => res.data);

export const createUser = (user) => api.post('/admin/users', user).then((res) => res.data);

export const updateUser = (userId, user) => api.put(`/admin/users/${userId}`, user).then((res) => res.data);

export const deleteUser = (userId) => api.delete(`/admin/users/${userId}`).then((res) => res.data);

export const fetchUserTasks = () => api.get('/user/tasks').then((res) => res.data);

export const fetchAllTasks = () => api.get('/admin/tasks').then((res) => res.data);

export const createTask = (task) => api.post('/admin/tasks', task).then((res) => res.data);

export const updateTask = (taskId, task) => api.put(`/admin/tasks/${taskId}`, task).then((res) => res.data);

export const deleteTask = (taskId) => api.delete(`/admin/tasks/${taskId}`).then((res) => res.data);
