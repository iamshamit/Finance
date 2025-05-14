// src/Pages/Profile/ProfilePage.jsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Upload, 
  Camera, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Edit2,
  X,
  Save,
  AlertTriangle
} from 'lucide-react';
import axios from 'axios';
import { usePreventNavigation } from '../../hooks/usePreventNavigation';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    newPassword: '',
    profilePicture: null
  });

  // Check for unsaved changes
  const hasUnsavedChanges = isEditing && (
    formData.username !== originalData?.username ||
    formData.email !== originalData?.email ||
    formData.password !== '' ||
    formData.newPassword !== '' ||
    formData.profilePicture !== null
  );

  const { showPrompt, handleConfirmNavigation, handleCancelNavigation } = 
    usePreventNavigation(hasUnsavedChanges);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/api/v1/auth/user');
      setUser(response.data);
      const userData = {
        username: response.data.username,
        email: response.data.email,
        password: '',
        newPassword: '',
        profilePicture: null
      };
      setFormData(userData);
      setOriginalData(userData);
      if (response.data.profilePicture) {
        setPreviewUrl(response.data.profilePicture);
      }
    } catch (err) {
      setError('Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setUpdating(true);

    try {
      const formDataToSend = new FormData();
      if (formData.username !== originalData.username) {
        formDataToSend.append('username', formData.username);
      }
      if (formData.email !== originalData.email) {
        formDataToSend.append('email', formData.email);
      }
      if (formData.password && formData.newPassword) {
        formDataToSend.append('currentPassword', formData.password);
        formDataToSend.append('newPassword', formData.newPassword);
      }
      if (formData.profilePicture) {
        formDataToSend.append('profilePicture', formData.profilePicture);
      }

      await axios.put('/api/v1/auth/update-profile', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess('Profile updated successfully');
      await fetchUserProfile();
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  const handleDiscard = () => {
    setFormData(originalData);
    setPreviewUrl(user.profilePicture);
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
            <p className="text-gray-400">Manage your account information</p>
          </div>
          {!isEditing ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </motion.button>
          ) : (
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDiscard}
                className="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Discard
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </motion.button>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#121917] rounded-xl p-6"
        >
          {/* ... (Previous alert messages code remains the same) ... */}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: isEditing ? 1.05 : 1 }}
                whileTap={{ scale: isEditing ? 0.95 : 1 }}
                className={`relative ${isEditing ? 'cursor-pointer' : ''}`}
                onClick={() => isEditing && fileInputRef.current?.click()}
              >
                <div className="w-32 h-32 rounded-full bg-[#1A231F] flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-2"
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </motion.div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                disabled={!isEditing}
              />
            </div>

            {/* Form fields */}
            {Object.entries(formData).map(([key, value]) => {
              if (key === 'profilePicture') return null;
              
              const Icon = {
                username: User,
                email: Mail,
                password: Lock,
                newPassword: Lock
              }[key];

              return (
                <div key={key}>
                  <label className="block text-gray-400 mb-2">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <div className="relative">
                    <Icon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={key.includes('password') ? 'password' : 'text'}
                      value={value}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      className="w-full bg-[#1A231F] rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder={`Enter ${key}`}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              );
            })}
          </form>
        </motion.div>
      </div>

      {/* Navigation Prevention Modal */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#121917] rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-3 text-yellow-500 mb-4">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Unsaved Changes</h3>
              </div>
              <p className="text-gray-400 mb-6">
                You have unsaved changes. Are you sure you want to leave? Your changes will be lost.
              </p>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleCancelNavigation}
                  className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  Stay
                </button>
                <button
                  onClick={handleConfirmNavigation}
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors"
                >
                  Leave
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfilePage;