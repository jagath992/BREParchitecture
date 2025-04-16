import { useState } from 'react';
import './ProjectsPage.css';
import { useNavigate } from "react-router-dom"; 

const projectData = [

  {
    url: 'https://res.cloudinary.com/detd3dzls/image/upload/v1744818194/Screenshot_2025-04-16_211144_modext.png',
    caption: 'Mr. Ramesh Residence',
    category: 'residence',
    description: "Mr. Ramesh Residence\nVeppampalayam, Erode.\n6000 Sq.ft buildup\nWest and east facing\n3BHK RESIDENCE",
    descriptionPhotos: [
      { url: "https://res.cloudinary.com/dwafpyiuy/image/upload/v1744674496/lkxz0mhsoem1xolhqcjn.png", caption: "Master Bedroom", _id: "67fd9ec43a3d82c7147129be" },
      { url: "https://res.cloudinary.com/dwafpyiuy/image/upload/v1744674497/thb7iaaawudsbmelfdah.png", caption: "Main Entrance", _id: "67fd9ec43a3d82c7147129bf" },
      { url: "https://res.cloudinary.com/dwafpyiuy/image/upload/v1744674498/idcixzxjtwfcpaqr5vm6.png", caption: "Foyer", _id: "67fd9ec43a3d82c7147129c0" },
      { url: "https://res.cloudinary.com/dwafpyiuy/image/upload/v1744674499/jelzkcuqxhso3emm9ysv.png", caption: "Car Porch with LandScape", _id: "67fd9ec43a3d82c7147129c1" }
    ]
  },
  // Add other projects here...
];

export default function ProjectsPage() {
  const [active, setActive] = useState(null);
  const headings = ['Commercial', 'Residence', 'Hospitality'];
  const navigate = useNavigate();

  const currentCategory = active !== null ? headings[active].toLowerCase() : null;

  const filteredImages = currentCategory
    ? projectData.filter(item => item.category === currentCategory)
    : [];

  return (
    <>
      <div className="projects-head">
        {headings.map((item, index) => (
          <h3
            key={index}
            onClick={() => setActive(index)}
            className={active === index ? 'active-heading' : ''}>
            {item}
          </h3>
        ))}
      </div>

      <div className="image-gallery">
        {filteredImages.map((img, index) => (
          <div key={index} className="image-container">
            <img
              className="project-image"
              src={img.url}
              alt={img.caption}
              onClick={() => {
                navigate('/ProjectDetail', { 
                  state: { 
                    main: img.url,
                    name: img.caption,
                    description: img.description,
                    descriptionPhotos: img.descriptionPhotos
                  }
                });
              }}
            />
            <p className="caption">{img.caption}</p>
          </div>
        ))}
      </div>
    </>
  );
}
