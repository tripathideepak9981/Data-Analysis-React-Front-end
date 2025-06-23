import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import main2 from "../../assets/frontmain.png";

const HeroSection = ({ isLoggedIn }) => {
  const [hoverButton, setHoverButton] = useState(null);
  const navigate = useNavigate();

  const handleSwitchToChat = () => {
    isLoggedIn() ? navigate("/chatPage") : navigate("/signInPage");
  };

  return (
    <section
      id="home"
      className="w-full min-h-screen bg-[#dbe6fd] text-gray-800 font-sans overflow-hidden"
    >
      {/* Hero Content */}
      <div className="ml-8 max-w-8xl mx-auto px-8 py-24 grid grid-cols-1 lg:grid-cols-2 items-center gap-5">
        {/* Left Side */}
        <motion.div
          className="space-y-6 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="inline-block bg-white px-4 py-1.5 text-xs font-medium rounded-full shadow border border-gray-200 text-gray-600">
            ✨ Empowering AI for Analysts
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#15196b]">
            Make Data Analytics Easier{" "}
            <span className="text-[#15196b]">& Smarter</span> with AI
          </h1>

          <p className="text-md text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Simplify SQL queries, visualize results instantly, and automate your
            workflow using next-gen AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <motion.button
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#5d70ff] to-[#4f57f1] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              onMouseEnter={() => setHoverButton("trial")}
              onMouseLeave={() => setHoverButton(null)}
              onClick={handleSwitchToChat}
              whileTap={{ scale: 0.95 }}
            >
              🚀 Start for Free
            </motion.button>
          </div>
        </motion.div>

        {/* Right Side Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="relative w-full max-w-md">
            <img
              src={main2}
              alt="AI Assistant Illustration"
              className="w-[70vw] h-[70vh] object-contain rounded-xl"
            />
          </div>
        </motion.div>
      </div>
      {/* Decorative Wave Bottom */}
      <div className="w-full -mt-72">
        <svg
          className="w-full h-[350px]"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="#f4f7ff"
            d="M0,224 C360,320 1080,128 1440,224 L1440,320 L0,320 Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
