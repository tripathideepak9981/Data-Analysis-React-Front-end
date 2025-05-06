import React from "react";

const Card = () => {
  return (
    <div className="relative flex flex-col gap-4 p-4 w-80 rounded-2xl shadow-inner bg-[radial-gradient(at_88%_40%,#181323_0%,transparent_85%),radial-gradient(at_49%_30%,#181323_0%,transparent_85%),radial-gradient(at_14%_26%,#181323_0%,transparent_85%),radial-gradient(at_0%_64%,#057D9F_0%,transparent_85%),radial-gradient(at_41%_94%,#06A5C7_0%,transparent_85%),radial-gradient(at_100%_99%,#063E4D_0%,transparent_85%)]">
      {/* Border Layer */}
      <div className="absolute inset-0 -z-10 rounded-2xl pointer-events-none border-[1px] border-white opacity-20"></div>

      {/* Title Section */}
      <div>
        <span className="text-white text-base font-medium">
          Keys to Success
        </span>
        <p className=" text-gray-300 mt-1 w-2/3 text-xs">
          Best way to be success in your life.
        </p>
      </div>

      <hr className="w-full border-t border-gray-700" />

      {/* List Items */}
      <ul className="flex flex-col gap-2">
        {[
          "Set Clear Goals",
          "Stay Organized",
          "Continuous Learning",
          "Time Management",
          "Maintain a Positive Attitude",
        ].map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="flex justify-center items-center w-4 h-4 bg-cyan-400 rounded-full">
              <svg
                className="w-3 h-3 text-[#181323]"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                />
              </svg>
            </span>
            <span className="text-white text-sm">{item}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <button className="cursor-pointer py-2 w-full text-white text-sm rounded-full bg-gradient-to-t from-cyan-500 to-cyan-800 shadow-[inset_0_-2px_25px_-4px_white]">
        Get Your Success
      </button>
    </div>
  );
};

export default Card;
