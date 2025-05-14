// utils/imageUpload.js
const axios = require('axios');
const FormData = require('form-data');

const uploadImage = async (imageBuffer) => {
  try {
    const formData = new FormData();
    formData.append('image', imageBuffer.toString('base64'));
    
    const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
      params: {
        key: process.env.IMGBB_API_KEY, // You'll need to get this from ImgBB
      },
      headers: formData.getHeaders()
    });

    return {
      success: true,
      imageUrl: response.data.data.url,
      deleteUrl: response.data.data.delete_url,
      thumbnailUrl: response.data.data.thumb.url
    };
  } catch (error) {
    console.error('Image upload error:', error);
    return {
      success: false,
      error: 'Failed to upload image'
    };
  }
};

module.exports = { uploadImage };