import './App.css'
import Navbar from './components/Navbar';
import Body from './components/Body';
import { SwipeCarousel } from './components/SwipeCarousel';
import AboutUs from './components/AboutUs';

export default function App() {
  return (
    <>
      <Navbar />
      <SwipeCarousel />
      <Body />
      <AboutUs />
    </>
  );
}
