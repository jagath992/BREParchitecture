import React from 'react';
import { motion } from 'framer-motion';
import './Body.css';

const lines = [
  "We BREP",
  "care about creating",
  "beautiful architecture, developing projects",
  "that are individual, inspiring, and enhancing",
  "the lifestyle of users.",
];

const Body = () => {
  return (
    <div className="slogan-part">
      {lines.map((line, index) => (
        <motion.div
          key={index}
          className="typing-line"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.3,
            delay: index * 0.3,
          }}
        >
          <span style={{ animationDelay: `${index * 0.3}s` }} className="typing-text">
            {line}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default Body;
