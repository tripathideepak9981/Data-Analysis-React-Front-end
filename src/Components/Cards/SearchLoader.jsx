import React from "react";

const SearchLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white overflow-hidden">
      <div className="relative flex items-center w-[300px] h-[80px] bg-[#f0f2f5] rounded-xl p-2 overflow-hidden">
        {/* Chart Icon */}
        <div
          className="w-10 h-10 mr-4 bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage:
              "url('https://www.svgrepo.com/show/135907/bar-chart.svg')",
          }}
        ></div>

        {/* Text Placeholder Lines */}
        <div className="flex-grow">
          <div className="h-2 rounded bg-gray-400 w-[80%] mb-2"></div>
          <div className="h-2 rounded bg-gray-400 w-[60%]"></div>
        </div>

        {/* Magnifying Glass */}
        <div className="magnify-glass absolute"></div>
      </div>

      {/* Custom CSS for animation */}
      <style>
        {`
          .magnify-glass {
            width: 60px;
            height: 60px;
            background-color: rgba(0, 123, 255, 0.2);
            border-radius: 9999px;
            border: 4px solid #007bff;
            animation: searchMove 2s infinite;
          }

          @keyframes searchMove {
            0%, 100% { transform: translate(-30px, 10px); }
            50% { transform: translate(150px, 10px); }
          }
        `}
      </style>
    </div>
  );
};

export default SearchLoader;
