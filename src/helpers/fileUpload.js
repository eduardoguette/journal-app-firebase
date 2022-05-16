/**
 * It takes a file, creates a formData object, appends the file to the formData object, and then sends
 * the formData object to the cloudinary API
 * @param file - The file to upload.
 * @returns The url of the image that was uploaded to cloudinary.
 */
export const fileUpload = async (file) => {
  const cloudUrl = `https://api.cloudinary.com/v1_1/dywna5g5o/upload`;

  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData,
    });
    if (resp.ok) {
      const cloudResp = await resp.json();
      return cloudResp.secure_url
    }else {
      throw await resp.json()
    }
  } catch (error) {
    throw error
  }
};
