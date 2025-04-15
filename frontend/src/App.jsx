import './App.css';
import Navbar from './components/Navbar';
import Body from './components/Body';
import { SwipeCarousel } from './components/SwipeCarousel';
import AboutUs from './components/AboutUs';
import Example from './components/HorizontalCaurosel';
import ProjectPage from './components/ProjectsPage';
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
            <Example />
          </>
        } />

        {/* Projects page route */}
        <Route path="/projects" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
}
