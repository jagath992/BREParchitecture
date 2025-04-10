import React from "react";
import { motion } from "framer-motion";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-us-image">
        <img src="/Images/About-Us.png" alt="About Us" />
      </div>
      <motion.div
        className="about-us-text"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <h3>About Us</h3>
        <p>
          An interdisciplinary practice established in the year 2020. B-rep Architecture
          & Design Studio focuses on design research and addressing the theme of
          computational design and research in the fields of Architecture design,
          Interiors, and Product design, also specializing in Computational design or
          similar technology-related domains.
        </p>
      </motion.div>
    </div>
  );
}

export default AboutUs;