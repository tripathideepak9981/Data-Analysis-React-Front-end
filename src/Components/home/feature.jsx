import React, { useState } from "react";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import icon1 from "../../assets/icons/bargraph.png";
import icon2 from "../../assets/icons/database.png";
import icon3 from "../../assets/icons/report.png";
import icon4 from "../../assets/icons/data.png";
import icon5 from "../../assets/icons/presentation.png";
import featureDecoration from "../../assets/graphs.png";
import card1 from "../../assets/image2.png";
import card2 from "../../assets/image1.png";
import card3 from "../../assets/Main1.png";
import card4 from "../../assets/header.png";
import card5 from "../../assets/bg.png";

const Feature = () => {
  const features = [
    {
      id: "charts",
      icon: (
        <img src={icon1} alt="Charts" className="w-16 h-16 object-contain" />
      ),
      title: "Charts & Graphs",
      image: card1,
      description: [
        "Effortlessly create and tailor charts.",
        "Turn raw data into clear visuals.",
        "Customize chart type and color.",
        "Supports Bar chart, Line chart, Pie chart, Scatter plot, Heatmap, and more.",
      ],
    },
    {
      id: "manipulation",
      icon: (
        <img
          src={icon2}
          alt="Data Manipulation"
          className="w-16 h-16 object-contain"
        />
      ),
      title: "Data Manipulation",
      image: card2,
      description: [
        "Connect your data in a few clicks.",
        "Generate insights in seconds.",
        "Supports Excel, Google Analytics, Google Search Console, Google Sheets, Google Trends.",
      ],
    },
    {
      id: "insights",
      icon: (
        <img src={icon3} alt="Insights" className="w-16 h-16 object-contain" />
      ),
      title: "Insights",
      image: card3,
      description: [
        "AI-powered conversion and organization.",
        "Save 90% of prep time.",
        "Features: Data blending, cleaning, and transformation.",
      ],
    },
    {
      id: "science",
      icon: (
        <img
          src={icon4}
          alt="Data Science"
          className="w-16 h-16 object-contain"
        />
      ),
      title: "Data Science",
      image: card4,
      description: [
        "Discover actionable insights.",
        "Analyze trends, patterns, and correlations.",
        "Types of analysis: Root cause, Statistical, Gap, Correlation analysis.",
      ],
    },
    {
      id: "reports",
      icon: (
        <img src={icon5} alt="Reports" className="w-16 h-16 object-contain" />
      ),
      title: "Reports",
      image: card5,
      description: [
        "AI-powered data enrichment.",
        "Add sentiment analysis, keyword extraction, and text classification.",
      ],
    },
  ];

  const [selectedFeature, setSelectedFeature] = useState(features[0]);

  return (
    <section id="services" className="py-20 bg-white text-[#2d1b54]">
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left mb-16">
          <div className="md:w-1/4 flex justify-center md:justify-start mb-6 md:mb-0">
            <div className="p-4 bg-[#2d1b54] backdrop-blur-md rounded-full shadow-xl">
              <img
                src={featureDecoration}
                alt="Features illustration"
                className="w-32 h-32 md:w-40 md:h-40 object-contain"
              />
            </div>
          </div>
          <div className="md:w-3/4 md:pl-8">
            <h2 className="text-4xl md:text-5xl font-extrabold font-serif bg-gradient-to-br from-[#2d1b54] via-[#2d1b54] to-[#2d1b54]  text-transparent bg-clip-text mb-3">
              Key Features to Supercharge Your Workflow
            </h2>
            <div className="w-20 h-1 bg-gradient-to-br from-[#2d1b54] via-[#2d1b54] to-[#2d1b54] rounded-full mx-auto md:mx-0 mb-4"></div>
            <p className="text=[#2d1b54] text-lg md:text-xl max-w-2xl">
              From automation to real-time insights — explore what makes our
              platform stand out.
            </p>
          </div>
        </div>

        {/* Feature Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`relative p-6 rounded-xl transition-all duration-300 cursor-pointer group overflow-hidden ${
                selectedFeature.id === feature.id
                  ? "bg-white/10 border-2 border-fuchsia-500 shadow-lg"
                  : "bg-white/5 border border-white/10 hover:bg-white/10 hover:shadow-md"
              }`}
              onClick={() => setSelectedFeature(feature)}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`mb-4 p-3 rounded-full transition ${
                    selectedFeature.id === feature.id
                      ? "bg-fuchsia-700/20"
                      : "bg-indigo-700/20 group-hover:bg-fuchsia-700/20"
                  }`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-center text-[#2d1b54] group-hover:text-indigo-800 transition-colors">
                  {feature.title}
                </h3>
                <div
                  className={`mt-4 h-1 bg-gradient-to-br from-[#2d1b54] via-[#2d1b54] to-[#2d1b54]  rounded-full transition-all duration-300 ${
                    selectedFeature.id === feature.id
                      ? "w-16"
                      : "w-0 group-hover:w-10"
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Feature Section */}
        <div className="flex flex-col lg:flex-row items-center gap-10 bg-gradient-to-br from-[#2d1b54] via-[#2d1b54] to-[#2d1b54] rounded-2xl shadow-2xl p-8 backdrop-blur-md">
          {/* Image part */}
          <div className="w-full lg:w-1/2">
            <img
              src={selectedFeature.image}
              alt={selectedFeature.title}
              className="w-full h-60 object-contain rounded-xl shadow-md"
            />
          </div>

          {/* Content part */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-3xl font-bold mb-6 font-serif bg-gradient-to-r from-indigo-300 to-fuchsia-400 text-transparent bg-clip-text">
              {selectedFeature.title}
            </h3>
            <ul className="text-indigo-100 text-lg space-y-4">
              {selectedFeature.description.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <span className="text-fuchsia-300 bg-white/10 rounded-full p-1 mt-1">
                    <FaCheckCircle className="w-4 h-4" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <button className="px-6 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                Learn more
                <FaArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
