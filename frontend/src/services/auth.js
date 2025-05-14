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
    const response = await api.get('/api/v1/auth/me'); // Make sure this endpoint matches your backend
    return response.data || response;
  },

  register: async (userData) => {
    // Check if userData is already FormData
    const isFormData = userData instanceof FormData;
    
    let dataToSend;
    if (isFormData) {
      dataToSend = userData;
    } else {
      // If it's not FormData, create one
      dataToSend = new FormData();
      Object.keys(userData).forEach(key => {
        if (userData[key]) {
          dataToSend.append(key, userData[key]);
        }
      });
    }
    
    const response = await api.post('/api/v1/auth/register', dataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data || response;
  },
  
  updateProfile: async (userData) => {
    // Check if userData is already FormData
    const isFormData = userData instanceof FormData;
    
    let dataToSend;
    if (isFormData) {
      dataToSend = userData;
    } else {
      // If it's not FormData, create one
      dataToSend = new FormData();
      Object.keys(userData).forEach(key => {
        if (userData[key]) {
          dataToSend.append(key, userData[key]);
        }
      });
    }
    
    const response = await api.put('/api/v1/auth/update-profile', dataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data || response;
  }
};