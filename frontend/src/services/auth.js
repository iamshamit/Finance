// src/services/auth.js
import api from './config';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/api/v1/auth/login', credentials);
      console.log('Auth Service Login Response:', response); // Debug log
      return response.data || response;
    } catch (err) {
      console.error('Auth Service Login Error:', err);
      throw err;
    }
  },

  getUser: async () => {
    const response = await api.get('/api/v1/auth/user');
    return response.data || response;
  },

  register: async (userData) => {
    const formData = new FormData();
    Object.keys(userData).forEach(key => {
      if (userData[key]) {
        formData.append(key, userData[key]);
      }
    });
    const response = await api.post('/api/v1/auth/register', formData);
    return response.data || response;
  }
};