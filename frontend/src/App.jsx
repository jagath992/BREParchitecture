import './App.css'
import Navbar from './components/Navbar';
import Body from './components/Body';
import { SwipeCarousel } from './components/SwipeCarousel';

export default function App() {
  return (
    <>
      <Navbar />
      <SwipeCarousel />
      <Body />
    </>
  );
}
