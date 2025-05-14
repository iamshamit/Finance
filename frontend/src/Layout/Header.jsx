// src/components/Layout/Header.jsx
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../Context/AuthContext';

const Header = ({ toggleSidebar, isSidebarOpen, isMobile }) => {
  const { user } = useAuth();
  const [imageError, setImageError] = useState(false);
  
  // Debug log
  useEffect(() => {
   
    if (user && user.profilePicture) {
     
    }
  }, [user]);
  
  // Reset image error when user changes
  useEffect(() => {
    setImageError(false);
  }, [user]);
  
  // Get user initials safely
  const getUserInitials = () => {
    if (!user) return 'U';
    if (!user.username) return 'U';
    return user.username.substring(0, 2).toUpperCase();
  };
  
  // Check if we should show the profile picture
  const shouldShowProfilePicture = () => {
    return (
      !imageError && 
      user && 
      user.profilePicture && 
      typeof user.profilePicture === 'string' &&
      user.profilePicture.trim() !== '' && 
      user.profilePicture !== 'undefined' &&
      user.profilePicture !== 'null'
    );
  };
  
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`bg-[#121917]/80 backdrop-blur-md border-b border-emerald-950/50 sticky top-0 z-30 transition-all duration-300 ${
        !isMobile && isSidebarOpen ? 'ml-[240px]' : (!isMobile ? 'ml-[80px]' : 'ml-0')
      }`}
    >
      <div className="px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleSidebar}
          className={`text-gray-400 hover:text-emerald-500 transition-all p-2 rounded-lg hover:bg-emerald-500/10 ${
            !isSidebarOpen && !isMobile ? '-ml-2' : ''
          }`}
        >
          <AnimatePresence mode="wait">
            {isMobile && isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </AnimatePresence>
        </motion.button>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center cursor-pointer hover:bg-emerald-500/30 transition-all overflow-hidden"
        >
          {shouldShowProfilePicture() ? (
            <img 
              src={user.profilePicture}
              alt={user.username || 'User'} 
              className="w-full h-full object-cover"
              onError={(e) => {
               
                setImageError(true);
              }}
            />
          ) : (
            <span className="text-emerald-500 font-medium text-sm md:text-base">
              {getUserInitials()}
            </span>
          )}
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;