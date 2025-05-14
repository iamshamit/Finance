// src/Pages/Auth/RegisterPage.jsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Upload, Wallet, ArrowRight, ChevronRight, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profilePicture: null
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setFormData({ ...formData, profilePicture: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

    const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await register(formData);
    
    if (result.success) {
      setIsLoading('success');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } else {
      setError(result.error || 'Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  // Floating elements animation
  const floatingElements = Array(5).fill(null);

  return (
    <div className="min-h-screen bg-[#0A0F0D] text-white flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated background elements */}
      {floatingElements.map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-[500px] h-[500px] bg-emerald-500/5 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <div className="max-w-md w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Wallet className="w-8 h-8 text-emerald-500" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent"
            >
              SpendWise
            </motion.span>
          </Link>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold mt-6"
          >
            Create Account
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 mt-2"
          >
            Join us and take control of your finances
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#121917]/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl"
        >
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div
                className="relative cursor-pointer"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={dragActive ? { scale: 1.05 } : { scale: 1 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-32 h-32 rounded-full bg-[#1A231F] flex items-center justify-center overflow-hidden group"
                >
                  {previewUrl ? (
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={previewUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <motion.div
                      animate={{ rotate: dragActive ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors"
                  />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-2"
                >
                  <Upload className="w-4 h-4 text-white" />
                </motion.div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </motion.div>

            {/* Username Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-gray-400 mb-2">Username</label>
              <div className="relative group">
                <User className={`w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                  focusedField === 'username' ? 'text-emerald-500' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-[#1A231F] rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                  placeholder="Choose a username"
                  required
                />
                <motion.div
                  initial={false}
                  animate={{
                    height: focusedField === 'username' ? 2 : 0,
                  }}
                  className="absolute bottom-0 left-0 w-full bg-emerald-500 rounded-full"
                />
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-gray-400 mb-2">Email</label>
              <div className="relative group">
                <Mail className={`w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                  focusedField === 'email' ? 'text-emerald-500' : 'text-gray-400'
                }`} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-[#1A231F] rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
                <motion.div
                  initial={false}
                  animate={{
                    height: focusedField === 'email' ? 2 : 0,
                  }}
                  className="absolute bottom-0 left-0 w-full bg-emerald-500 rounded-full"
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-gray-400 mb-2">Password</label>
              <div className="relative group">
                <Lock className={`w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                  focusedField === 'password' ? 'text-emerald-500' : 'text-gray-400'
                }`} />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-[#1A231F] rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                  placeholder="Create a password"
                  required
                />
                <motion.div
                  initial={false}
                  animate={{
                    height: focusedField === 'password' ? 2 : 0,
                  }}
                  className="absolute bottom-0 left-0 w-full bg-emerald-500 rounded-full"
                />
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
            >
              <AnimatePresence mode="wait">
                {isLoading === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute inset-0 bg-emerald-500 flex items-center justify-center"
                  >
                    Success!
                  </motion.div>
                ) : isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={{ opacity: 1, rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <motion.div
                    key="create-account"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                    Create Account
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center text-gray-400 mt-6 flex items-center justify-center gap-1"
          >
            <span>Already have an account?</span>
            <Link 
              to="/login" 
              className="text-emerald-500 hover:text-emerald-400 inline-flex items-center gap-1"
            >
              <span>Sign in</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
          
          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center"
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <motion.div
                animate={{ x: [0, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowLeft className="w-4 h-4" />
              </motion.div>
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;