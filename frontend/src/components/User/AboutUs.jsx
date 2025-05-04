import React,{useState,useEffect} from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import "./AboutUs.css";

function AboutUs() {
  const fullText =
  "An interdisciplinary practice established in the year 2020. B-rep Architecture & Design Studio focuses on design research and addressing the theme of computational design and research in the fields of Architecture design, Interiors, and Product design, also specializing in Computational design or similar technology-related domains.";

  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView && index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText.charAt(index));
        setIndex(index + 1);
      }, 10); 
      return () => clearTimeout(timeout);
    }
  }, [index, inView]);

  return (
    <div id="about" className="about-us-container">
      <div className="about-us-image">
        <img src="/Images/About-Us.png" alt="About Us" />
      </div>
        <motion.div
        className="about-us-text"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        >
        <h3>About Us</h3>
        <div ref={ref} className="typewriter-container">
        <p className="typewriter-text">{typedText}</p>
      </div> 
      </motion.div>
    </div>
  );
}

export default AboutUs;