import './App.css';
import Navbar from './components/Navbar';
import Body from './components/Body';
import { SwipeCarousel } from './components/SwipeCarousel';
import AboutUs from './components/AboutUs';

import ProjectPage from './components/ProjectsPage';
import ProjectDetail from './components/ProjectDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home page renders all main components */}
        <Route path="/" element={
          <>
            <SwipeCarousel />
            <Body />
            <AboutUs />
          </>
        } />

        {/* Projects page route */}
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/ProjectDetail" element={<ProjectDetail/>}/>
      </Routes>
    </Router>
  );
}
