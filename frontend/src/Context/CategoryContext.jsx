// src/Context/CategoryContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { categoryService } from '../services/category';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getCategories();
      console.log('Fetch Categories Response:', response);
      setCategories(Array.isArray(response) ? response : []);
      setError(null);
    } catch (err) {
      console.error('Fetch Categories Error:', err);
      setError(err.response?.data?.message || 'Failed to fetch categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (name) => {
    try {
      setLoading(true);
      const response = await categoryService.addCategory({ name });
      console.log('Add Category Response in Context:', response);

      // Handle different possible response structures
      const newCategory = response.category || response;
      
      setCategories(prev => [...prev, newCategory]);
      await fetchCategories(); // Refresh the categories list
      return { success: true, data: newCategory };
    } catch (err) {
      console.error('Add Category Error in Context:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to add category' 
      };
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      setLoading(true);
      await categoryService.deleteCategory(id);
      setCategories(prev => prev.filter(cat => cat._id !== id));
      await fetchCategories(); // Refresh the categories list
      return { success: true };
    } catch (err) {
      console.error('Delete Category Error:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to delete category' 
      };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{
      categories,
      loading,
      error,
      addCategory,
      deleteCategory,
      fetchCategories
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);