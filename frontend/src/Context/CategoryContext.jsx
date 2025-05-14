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
     
      
      // Extract the categories array from the response
      const categoriesData = response.categories || [];
     
      
      setCategories(categoriesData);
      setError(null);
    } catch (err) {
     
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
     

      // Refresh the categories list
      await fetchCategories();
      
      return { success: true, data: response.category || response };
    } catch (err) {
     
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