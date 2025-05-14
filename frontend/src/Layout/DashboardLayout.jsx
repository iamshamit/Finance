// src/Layout/DashboardLayout.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardPage from '../Pages/Dashboard/DashboardPage';
import IncomePage from '../Pages/Income/IncomePage';
import ExpensePage from '../Pages/Expense/ExpensePage';
import CategoriesPage from '../Pages/Categories/CategoriesPage';
import ProfilePage from '../Pages/Profile/ProfilePage';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        const saved = localStorage.getItem('sidebarOpen');
        setIsSidebarOpen(saved !== null ? JSON.parse(saved) : true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
    }
  }, [isSidebarOpen, isMobile]);

  return (
    <div className="min-h-screen bg-[#0A0F0D] text-white">
      <div className="flex">
        {/* Backdrop overlay for mobile */}
        <AnimatePresence>
          {isMobile && isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {(isSidebarOpen || !isMobile) && (
            <Sidebar 
              isOpen={isSidebarOpen} 
              setIsOpen={setIsSidebarOpen}
              isMobile={isMobile}
            />
          )}
        </AnimatePresence>
        
        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          <Header 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
            isSidebarOpen={isSidebarOpen}
            isMobile={isMobile}
          />
          <main 
            className={`p-4 md:p-6 lg:p-8 transition-all duration-300 ${
              !isMobile && isSidebarOpen ? 'ml-[240px]' : (!isMobile ? 'ml-[80px]' : 'ml-0')
            }`}
          >
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="income" element={<IncomePage />} />
              <Route path="expenses" element={<ExpensePage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;