import React from "react";
import "./LandingHero.css";

const LandingHero: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1800"
          alt="Modern Architecture"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
      </div>

      <div className="relative h-full flex flex-col justify-center items-center text-white text-center p-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in">
          BREP <span className="font-light">STUDIO</span>
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-80 mb-12 animate-fade-in-delay">
          Redefining spaces with innovative architectural design
        </p>
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-delay-2">
          <a
            href="#residential"
            className="px-8 py-3 border-2 border-white hover:bg-white hover:text-black transition-colors duration-300 text-lg"
          >
            Explore our work
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
