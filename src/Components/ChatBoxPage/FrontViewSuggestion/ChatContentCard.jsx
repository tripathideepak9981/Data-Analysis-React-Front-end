import {
  FaSearch,
  FaChartBar,
  FaCode,
  FaTable,
  FaTerminal,
} from "react-icons/fa";

const ChatContentCard = () => {
  const features = [
    { label: "Analytical Analysis", icon: <FaSearch /> },
    { label: "Query Editor", icon: <FaTerminal /> },
    { label: "Key Metrics", icon: <FaTable /> },
    { label: "Charts", icon: <FaChartBar /> },
    { label: "KPI's", icon: <FaCode /> },
  ];

  return (
    <div className="h-[80vh] flex items-center justify-center bg-[#f0f1f9] px-4">
      <div className="h-[25vh] w-[36vw]">
        <div className="text-center w-full max-w-2xl">
          <h2 className="text-3xl font-serif text-indigo-900  mb-6">
            How can we help you today?
          </h2>
          {/* 
          <div className="space-y-3">
            <div className="flex justify-center gap-3">
              <FeatureCard {...features[0]} />
              <FeatureCard {...features[1]} />
            </div>

            <div className="flex justify-center gap-3">
              <FeatureCard {...features[2]} />
              <FeatureCard {...features[3]} />
            </div>

            <div className="flex justify-center">
              <FeatureCard {...features[4]} />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ label, icon }) => (
  <div
    className="w-40 h-[40px] flex flex-row gap-2 items-center justify-center p-2 
  bg-gray-200  backdrop-blur-sm border border-gray-200 
  rounded-xl shadow-inner shadow-2xl hover:shadow-xl transition-all duration-300
  hover:scale-105 cursor-pointer group"
  >
    <div className="text-indigo-600 text-sm group-hover:text-indigo-800 transition-colors duration-300">
      {icon}
    </div>
    <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-800 transition-colors duration-300">
      {label}
    </span>
  </div>
);

export default ChatContentCard;
