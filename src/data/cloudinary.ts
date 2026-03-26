
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
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      { method: 'POST', body: formData }
    );

    const data = await response.json();
    if (!response.ok) {
        console.error('Cloudinary API Error:', data);
        throw data.error || data;
    }
    return data.secure_url;
  } catch (error: any) {
    console.error('Cloudinary Upload Error:', error);
    const msg = error.message || (typeof error === 'string' ? error : 'Check Cloudinary settings');
    alert(`Upload failed! ${msg}`);
    return null;
  }
};
