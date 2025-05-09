export interface DescriptionPhoto {
  url: string;
  caption: string;
}

export interface Project {
  _id: string;
  projectName: string;
  category: 'home' | 'commercial' | 'hospitality';
  sqft: string;
  mainPhoto: string;
  description: string;
  descriptionPhotos: DescriptionPhoto[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectsData {
  projectDetails: Project[];
  residential: Project[];
  commercial: Project[];
  hospitality: Project[];
}