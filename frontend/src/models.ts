export interface SidePhoto {
  id: string;
  url: string;
  caption: string;
}

export interface Admin {
  id: string;
  username: string;
  email: string;
  password: string;
}

export const createSidePhoto = (id: string, url: string, caption: string): SidePhoto => ({
  id,
  url,
  caption
});

export const createAdmin = (username: string, email: string, password: string): Admin => ({
  id: `admin-${Date.now()}`,
  username,
  email,
  password
}); 