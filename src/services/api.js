import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config});

// Auth endpoints
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);

// User endpoints
export const getUser = (username) => api.get(`/users/${username}`);

// Message endpoints
export const getConversation = (otherUser) => api.get(`/conversations/${otherUser}`);
export const sendMessage = (otherUser, text) => api.post(`/conversations/${otherUser}`, { text });
