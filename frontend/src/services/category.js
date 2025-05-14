// src/services/category.js
import api from './config';

export const categoryService = {
  addCategory: async (categoryData) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await api.post('/api/v1/categories', categoryData);
      // Debug log
      return response;
    } catch (err) {
     
      throw err;
    }
  },

  getCategories: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await api.get('/api/v1/categories');
      // Debug log
      return response;
    } catch (err) {
     
      throw err;
    }
  },

  deleteCategory: async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await api.delete(`/api/v1/categories/${id}`);
      // Debug log
      return response;
    } catch (err) {
     
      throw err;
    }
  }
};