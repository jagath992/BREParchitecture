export const createProject = (
  id,
  projectName,
  mainPhoto,
  description,
  squareFootage,
  category,
  descriptionPhotos = []
) => ({
  id,
  projectName,
  mainPhoto,
  description,
  squareFootage,
  category,
  descriptionPhotos
});




export const createSidePhoto = (id, imageUrl, caption) => ({
  id,
  imageUrl,
  caption
});


export const createAdmin = (id, name, email, phone, password, location, reference) => ({
  id,
  name,
  email,
  phone,
  password,
  location,
  reference
});