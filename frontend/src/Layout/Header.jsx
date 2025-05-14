// src/components/Layout/Header.jsx
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ toggleSidebar, isSidebarOpen, isMobile }) => {
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
          className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center cursor-pointer hover:bg-emerald-500/30 transition-all"
        >
          <span className="text-emerald-500 font-medium text-sm md:text-base">JD</span>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;