export const getCloudinaryImageUrl = (url) => {
  if (!url) return "";

  // If it's already a Cloudinary URL, return it with the necessary parameters
  if (url.includes("cloudinary.com")) {
    const baseUrl = url.split("/upload/")[0] + "/upload/";
    const imagePath = url.split("/upload/")[1];
    return `${baseUrl}f_auto,q_auto/${imagePath}`;
  }

  return url;
};
