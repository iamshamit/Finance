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
      
      // Extract the categories array from the response
      const categoriesData = response.categories || [];
      console.log('Categories Data:', categoriesData);
      
      setCategories(categoriesData);
      setError(null);
    } catch (err) {
      console.error('Fetch Categories Error:', err);
      setError(err.response?.data?.message || 'Failed to fetch categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (name, type = 'expense') => {
    try {
      setLoading(true);
      const response = await categoryService.addCategory({ name, type });
      console.log('Add Category Response in Context:', response);

      // Refresh the categories list
      await fetchCategories();
      
      return { success: true, data: response.category || response };
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
      
      // Refresh the categories list
      await fetchCategories();
      
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