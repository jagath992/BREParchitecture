import * as React from "react";
import { animated, useSpring } from "@react-spring/web"; 
import { useScroll } from "react-use-gesture";
import "./HorizontalCaurosel.css";

const clamp = (value, clampAt = 30) => {
  if (value > 0) {
    return value > clampAt ? clampAt : value;
  } else {
    return value < -clampAt ? -clampAt : value;
  }
};
const movies = [
  "./horizontal/icon1.png",
  "./horizontal/icon2.png",
  "./horizontal/icon3.png",
  "./horizontal/icon4.png",
  "./horizontal/icon5.png",
  "./horizontal/icon6.png",
  "./horizontal/icon7.png",
  "./horizontal/icon8.png",
  "./horizontal/icon9.png",
];

export default function Example() {
  const [style, set] = useSpring(() => ({
    transform: "perspective(500px) rotateY(0deg)"
  }));

  const bind = useScroll(event => {
    set({
      transform: `perspective(500px) rotateY(${
        event.scrolling ? clamp(event.delta[0]) : 0
      }deg)`
    });
  });

  return (
    <>
  <div className="projects-heading">
    <h2>Worked on 15+ Projects</h2>
  </div>
  <div className="carousel-wrapper">
    <div className="container" {...bind()}>
      {movies.map((src, index) => (
        <animated.div
          key={index}
          className="card"
          style={{
            ...style,
            backgroundImage: `url(${src})`
          }}
        />
      ))}
    </div>
  </div>
</>

  );
}
