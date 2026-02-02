export async function uploadImage(file) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData
    }
  );

  return await response.json();
}
