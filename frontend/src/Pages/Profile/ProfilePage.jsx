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
import { useAuth } from '../../Context/AuthContext';
import { usePreventNavigation } from '../../hooks/usePreventNavigation';

const ProfilePage = () => {
  const { user, loading: authLoading, updateProfile } = useAuth();
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

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      console.log('Setting up form with user data:', user);
      const userData = {
        username: user.username || '',
        email: user.email || '',
        password: '',
        newPassword: '',
        profilePicture: null
      };
      setFormData(userData);
      setOriginalData(userData);
      
      if (user.profilePicture) {
        setPreviewUrl(user.profilePicture);
      }
    }
  }, [user]);

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
      // Prepare update data
      const updateData = {
        username: formData.username,
        email: formData.email,
        profilePicture: formData.profilePicture
      };
      
      // Add password fields if provided
      if (formData.password && formData.newPassword) {
        updateData.currentPassword = formData.password;
        updateData.newPassword = formData.newPassword;
      }

      // Use the updateProfile function from AuthContext
      const result = await updateProfile(updateData);
      
      if (result.success) {
        setSuccess('Profile updated successfully');
        setIsEditing(false);
        
        // Reset password fields
        setFormData(prev => ({
          ...prev,
          password: '',
          newPassword: '',
          profilePicture: null
        }));
      } else {
        throw new Error(result.error || 'Failed to update profile');
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  const handleDiscard = () => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        password: '',
        newPassword: '',
        profilePicture: null
      });
      setPreviewUrl(user.profilePicture);
    }
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  if (authLoading) {
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
                disabled={updating}
                className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
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
          {/* Success Message */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-emerald-500/10 border border-emerald-500 text-emerald-500 px-4 py-2 rounded-lg mb-6 flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6 flex items-center gap-2"
              >
                <AlertCircle className="w-5 h-5" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

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
                    {key === 'newPassword' ? 'New Password' : key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <div className="relative">
                    <Icon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={key.includes('password') ? 'password' : 'text'}
                      value={value}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      className="w-full bg-[#1A231F] rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder={`Enter ${key === 'newPassword' ? 'new password' : key}`}
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