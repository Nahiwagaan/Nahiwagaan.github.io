
export const uploadToCloudinary = async (file: File) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const folder = import.meta.env.VITE_CLOUDINARY_FOLDER || 'My Portfolio';

  if (!cloudName || !uploadPreset) {
    alert('Cloudinary not configured! Please add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env');
    return null;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, // 'auto' handles PDF, images, etc.
      { method: 'POST', body: formData }
    );

    const data = await response.json();
    if (data.error) throw data.error;
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    alert('Upload failed! Check your Cloudinary configuration.');
    return null;
  }
};
