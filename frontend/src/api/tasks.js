import axios from 'axios';

// REACT_APP_BACKEND_URL is the backend base URL WITHOUT a trailing slash and
// WITHOUT "/api/tasks", e.g. https://my-api.onrender.com
const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/tasks`;

export const getTasks = () => axios.get(API_URL);
export const createTask = (taskData) => axios.post(API_URL, taskData);
export const updateTask = (id, taskData) => axios.put(`${API_URL}/${id}`, taskData);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
