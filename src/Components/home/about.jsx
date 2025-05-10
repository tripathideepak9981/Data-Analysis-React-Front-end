import React from "react";

import image2 from "../../assets/header.png";
import image4 from "../../assets/image2.png";

const About = () => {
  return (
    <section id="about" className="bg-white py-0 text-white">
      <div className="max-w-6xl mx-auto px-4 py-2 font-sans">
        {/* Intro Header */}
        <div className="mb-2 flex flex-col md:flex-row items-center justify-center">
          <div className="text-center md:text-center md:w-2/3">
            <h1 className="text-5xl font-extrabold mb-2 font-serif bg-[#2d1b54] text-transparent bg-clip-text">
              Excel, Python and ChatGPT
            </h1>
            <h2 className="text-2xl font-bold font-mono bg-[#2d1b54] text-transparent bg-clip-text">
              Unified for a Seamless Data Experience
            </h2>
          </div>
          <div className="md:w-1/4 flex justify-center md:justify-start mt-6 md:mt-0">
            <img
              src={image4}
              alt="Data integration illustration"
              className="w-48 h-48 object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Decision-Making Agility Section */}
        <div className="w-full flex items-center justify-center">
          <div
            className="rounded-xl md:w-5xl p-8 mb-10 border border-indigo-900 shadow-xl hover:shadow-2xl transition-all duration-300 bg-cover bg-center bg-no-repeat relative overflow-hidden"
            style={{ backgroundImage: `url(${image2})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#2d1b54]/80 backdrop-blur-md rounded-xl z-0" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center">
              {/* Left Content */}
              <div className="lg:w-1/2 lg:pr-6 mb-6 lg:mb-0">
                <h2 className="text-2xl font-bold mb-4 font-serif tracking-tight bg-gradient-to-r from-yellow-100 via-orange-100 to-purple-200 text-transparent bg-clip-text">
                  Decision-Making Agility
                </h2>
                <p className="text-sm text-white mb-4">
                  Make faster, smarter decisions by turning raw data into
                  actionable insights. Our tool gives you the edge to explore
                  patterns, build forecasts, and collaborate in real-time with
                  stakeholders.
                </p>
                <ul className="text-sm text-gray-100 space-y-2">
                  {[
                    "AI copilots assisted analytics",
                    "Natural language querying",
                    "AI-driven insights",
                    "Interactive visualizations",
                    "Reduced IT reliance",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-fuchsia-400 mr-2">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Image */}
              <div className="lg:w-1/2 w-full flex justify-center items-center">
                <img
                  src={image2}
                  alt="AI data visualization"
                  className="w-full h-auto max-h-64 lg:max-h-80 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
