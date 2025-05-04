import './App.css';
import Navbar from './components/User/Navbar';
import Body from './components/User/Body';
import { SwipeCarousel } from './components/User/SwipeCarousel';
import AboutUs from './components/User/AboutUs';
import ProjectPage from './components/User/ProjectsPage';
import ProjectDetail from './components/User/ProjectDetail';
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
        
        {/* Project detail with dynamic ID */}
        <Route path="/ProjectDetail/:id" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
}
