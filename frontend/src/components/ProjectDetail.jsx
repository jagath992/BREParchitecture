import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { id } = useParams(); 
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/projects/${id}`); 
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetail();
  }, [id]); // Re-fetch when the ID changes

  if (!project) return <div>Loading...</div>;

  return (
    <div className="project-detail">
      <h2>{project.projectName}</h2>
      <p>{project.description}</p>

      <div className="main-image-container">
        <img src={project.mainPhoto} alt={project.projectName} className="main-image" />
      </div>

      <h3>Project Images</h3>
      <div className="description-gallery">
        {project.descriptionPhotos && project.descriptionPhotos.map((photo, index) => (
          <div key={index} className="description-image-container">
            <img src={photo.url} alt={photo.caption} className="description-image" />
            <p>{photo.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
