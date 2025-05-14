// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await authService.getUser();
        // Debug log
        
        // Make sure we're setting the user correctly
        if (userData && userData.user) {
          setUser(userData.user);
        } else if (userData) {
          setUser(userData);
        }
      }
    } catch (err) {
     
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      // Debug log
      
      // Check if the response contains a token
      if (response.token) {
        localStorage.setItem('token', response.token);
        await checkAuth(); // Fetch user data after successful login
        return { success: true };
      } else {
        throw new Error('No token received');
      }
    } catch (err) {
     
      return { 
        success: false, 
        error: err.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  };

  const register = async (userData) => {
    try {
      // Create a FormData object to properly handle file uploads
      const formData = new FormData();
      formData.append('username', userData.username);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      
      // Only append the file if it exists
      if (userData.profilePicture) {
        formData.append('profilePicture', userData.profilePicture);
      }
      
      const data = await authService.register(formData);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  const updateProfile = async (userData) => {
    try {
      // Create a FormData object to properly handle file uploads
      const formData = new FormData();
      formData.append('username', userData.username);
      formData.append('email', userData.email);
      
      // Only append the file if it exists
      if (userData.profilePicture) {
        formData.append('profilePicture', userData.profilePicture);
      }
      
      const updatedUser = await authService.updateProfile(formData);
      
      // Make sure we're setting the user correctly
      if (updatedUser && updatedUser.user) {
        setUser(updatedUser.user);
      } else if (updatedUser) {
        setUser(updatedUser);
      }
      
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Debug log whenever user changes
  useEffect(() => {
   
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      register,
      logout,
      checkAuth,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);