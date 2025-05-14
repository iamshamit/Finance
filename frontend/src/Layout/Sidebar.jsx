// src/components/Layout/Sidebar.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Wallet,
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  Tags,
  UserCircle,
  ChevronLeft,
  LogOut
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, isMobile }) => {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: TrendingUp, label: 'Income', path: '/dashboard/income' },
    { icon: TrendingDown, label: 'Expenses', path: '/dashboard/expenses' },
    { icon: Tags, label: 'Categories', path: '/dashboard/categories' },
    { icon: UserCircle, label: 'Profile', path: '/dashboard/profile' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <motion.div
      initial={{ width: isOpen ? 240 : 80, x: isMobile ? -240 : 0 }}
      animate={{ width: isOpen ? 240 : 80, x: 0 }}
      exit={{ x: isMobile ? -240 : 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="bg-[#121917]/80 backdrop-blur-md h-screen fixed top-0 left-0 z-40 border-r border-emerald-950/50"
    >
      {/* Logo */}
      <motion.div 
        className="p-6 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Wallet className={`transition-all ${
            !isOpen && !isMobile ? 'w-9 h-9' : 'w-8 h-8'
          } text-emerald-500`} />
        </motion.div>
        <AnimatePresence>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent"
            >
              SpendWise
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Navigation Items */}
      <nav className="mt-6 px-4">
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={item.path}
              onClick={() => isMobile && setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all relative group ${
                location.pathname === item.path
                  ? 'bg-emerald-500/20 text-emerald-500'
                  : 'hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-500'
              }`}
            >
              <item.icon className={`transition-all ${
                !isOpen && !isMobile ? 'w-6 h-6' : 'w-5 h-5'
              }`} />
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {!isOpen && !isMobile && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute left-full ml-2 px-2 py-1 bg-[#1A231F] rounded-md invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all whitespace-nowrap"
                >
                  {item.label}
                </motion.div>
              )}
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Toggle Button - Only show on desktop */}
      {!isMobile && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-1/2 -right-3 bg-emerald-500 rounded-full p-1 text-white hover:bg-emerald-600 transition-all shadow-lg"
        >
          <motion.div
            animate={{ rotate: isOpen ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.div>
        </motion.button>
      )}

      {/* Logout Button */}
      <motion.div 
        className="absolute bottom-4 px-2 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-3 rounded-xl w-full hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-all"
        >
          <LogOut className={`transition-all ${
            !isOpen && !isMobile ? 'w-6 h-6' : 'w-5 h-5'
          }`} />
          {isOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Logout
            </motion.span>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;