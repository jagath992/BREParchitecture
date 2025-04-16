import { useLocation } from 'react-router-dom';
import './ProjectDetail.css'; 

export default function ProjectDetail() {
  const location = useLocation();
  const { main, name, description, descriptionPhotos } = location.state || {};

  return (
    <div className="project-detail">
      <h2>{name}</h2>
      <p>{description}</p>

   
      <div className="main-image-container">
        {main && <img src={main} alt={name} className="main-image" />}
      </div>

      <h3>Project Images</h3>
      
   
      <div className="description-gallery">
        {descriptionPhotos && descriptionPhotos.slice(0, 4).map((photo, index) => (
          <div key={index} className="description-image-container">
            <img 
              src={photo.url} 
              alt={photo.caption} 
              className="description-image" 
            />
            <p>{photo.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
