import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchProjects from '../utils/fetchProjects';
import './ProjectsPage.css'; 

export default function ProjectPage() {
  const [residential, setResidential] = useState([]);
  const [commercial, setCommercial] = useState([]);
  const [hospitality, setHospitality] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('residential');
  const navigate = useNavigate();

  useEffect(() => {
    const loadProjects = async () => {
      const { residential, commercial, hospitality } = await fetchProjects();
      setResidential(residential);
      setCommercial(commercial);
      setHospitality(hospitality);
    };

    loadProjects();
  }, []);

  const handleProjectClick = (project) => {
    navigate('/ProjectDetail/' + project._id);
  };

  const filterProjects = () => {
    switch (selectedCategory) {
      case 'residential':
        return residential;
      case 'commercial':
        return commercial;
      case 'hospitality':
        return hospitality;
    }
  };

  return (
    <div className="project-page-container">
      <div className="category-navbar">
        <button onClick={() => setSelectedCategory('residential')}>Residential</button>
        <button onClick={() => setSelectedCategory('commercial')}>Commercial</button>
        <button onClick={() => setSelectedCategory('hospitality')}>Hospitality</button>
      </div>

      <div className="project-list">
        {filterProjects().map((project) => (
          <div
            className="project-card"
            key={project._id}
            onClick={() => handleProjectClick(project)}
          >
            <img src={project.mainPhoto} alt={project.projectName} />
            <p>{project.projectName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
