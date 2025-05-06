import React, { useState } from "react";
import { motion } from "framer-motion";
// import main2 from "../../assets/main2.png";
import { useNavigate } from "react-router-dom";
import main2 from "../../assets/main3.png";

const HeroSection = ({ isLoggedIn }) => {
  const [hoverButton, setHoverButton] = useState(null);
  const navigate = useNavigate();
  const handleSwitchToChat = () => {
    if (isLoggedIn()) {
      navigate("/chatPage");
    } else {
      navigate("/signInPage");
    }
  };
  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden font-sans"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d1b54] via-[#2d1b54] to-[#2d1b54] opacity-100" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 pt-20 pb-14 min-h-screen gap-5">
        {/* Left: Text Content with animation */}
        <motion.div
          className="w-full md:w-1/2 space-y-3 text-center md:text-left"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <p className="text-sm tracking-wider text-white/80 font-semibold flex items-center justify-center md:justify-start">
            <span className="mr-2 text-white bg-purple-600 rounded-md p-1 text-xs shadow-md">
              📂
            </span>
            Next generation platform
          </p>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-2xl">
            <span className="">Make Data Analysis</span>
            <br />
            <span className="text-gray-50 px-1">Easier, Faster</span>
            <span className="italic font-black text-gray-50 drop-shadow-lg">
              & Smarter
            </span>
            <span className="text-white"> with AI</span>
          </h1>

          <p className="text-base text-yellow-100 leading-relaxed max-w-lg mx-auto md:mx-0 border-l-4 border-yellow-400 pl-4 italic shadow-sm">
            The{" "}
            <span className="font-semibold text-white">single platform</span> to{" "}
            <span className="">connect</span>, analyze, visualize, clean,
            transform and enrich your data.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start sm:justify-start justify-center mt-4">
            <button
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-700 hover:to-pink-400 text-white px-6 py-3 rounded-full font-bold transition-all shadow-xl"
              onMouseEnter={() => setHoverButton("trial")}
              onMouseLeave={() => setHoverButton(null)}
              onClick={handleSwitchToChat}
            >
              🚀 Try for free
            </button>
            <button className="border-2 border-purple-300 text-purple-200 px-6 py-3 rounded-full font-bold transition-all hover:bg-purple-200 hover:text-purple-900 shadow-lg">
              📺 See how it works
            </button>
          </div>
        </motion.div>

        {/* Right: Image with animation */}
        <motion.div
          className="w-full md:w-[40vw] flex absolute justify-center right-5 mt-12 md:mt-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        >
          <img
            src={main2}
            alt="AI Visual"
            className="w-[90%] md:w-full max-h-[500px] object-cover"
          />
        </motion.div>
      </div>

      {/* Bottom Wave SVG */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg
          viewBox="0 0 1440 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[120px]"
          preserveAspectRatio="none"
        >
          <path
            fill="#FFFFFF"
            d="M0,100 
              C 180,0 360,200 540,100 
              C 720,0 900,200 1080,100 
              C 1260,0 1440,200 1620,100 
              L1440,200 
              L0,200 
              Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
