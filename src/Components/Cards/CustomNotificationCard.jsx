import React from "react";
import card from "../../assets/Animation/card1.gif";

const CustomNotificationCard = ({ title, text, onClose }) => {
  return (
    <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2">
      <div className="relative flex flex-col items-center justify-between p-2 w-[32vw] h-[45vh] rounded-[2rem] shadow-2xl bg-white/10 backdrop-blur-2xl border border-white/20 transition-all duration-500">
        {/* Glow Border Layer */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-indigo-400/20 via-transparent to-purple-500/20 pointer-events-none z-[-1] blur-sm" />

        {/* Animated Image Container */}
        <div className="">
          <img
            src={card}
            alt="Notification animation"
            className="object-cover w-28 h-28"
          />
        </div>

        {/* Text Content */}
        <div className="text-center px-4 mt-2">
          <h2 className="text-gray-800 text-2xl font-bold tracking-wider drop-shadow-sm">
            {title}
          </h2>
          <p className="text-gray-800 text-sm mt-2 leading-relaxed font-medium">
            {text}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="my-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-10 rounded-full shadow-md hover:shadow-xl hover:scale-105 hover:brightness-110 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomNotificationCard;
