// src/services/category.js
import api from './config';

export const categoryService = {
  addCategory: async (categoryData) => {
    try {
      const response = await api.post('/api/v1/categories/add-category', categoryData);
      console.log('Add Category Response:', response); // Debug log
      return response;
    } catch (err) {
      console.error('Add Category Error:', err);
      throw err;
    }
  },

  getCategories: async () => {
    try {
      const response = await api.get('/api/v1/categories/get-categories');
      console.log('Get Categories Response:', response); // Debug log
      return response;
    } catch (err) {
      console.error('Get Categories Error:', err);
      throw err;
    }
  },

  deleteCategory: async (id) => {
    try {
      const response = await api.delete(`/api/v1/categories/delete-category/${id}`);
      console.log('Delete Category Response:', response); // Debug log
      return response;
    } catch (err) {
      console.error('Delete Category Error:', err);
      throw err;
    }
  }
};