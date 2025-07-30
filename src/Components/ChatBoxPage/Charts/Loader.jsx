import { BarChart3, PieChart, LineChart, AreaChart, Radar } from "lucide-react";

const Loader = () => {
  const icons = [
    <BarChart3 className="h-8 w-8 text-blue-500" />,
    <PieChart className="h-8 w-8 text-green-500" />,
    <LineChart className="h-8 w-8 text-orange-500" />,
    <AreaChart className="h-8 w-8 text-blue-600" />,
    <Radar className="h-8 w-8 text-green-600" />,
  ];

  return (
    <div className="relative w-full h-[250px] mb-4 border border-gray-300 p-4 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-2xl shadow-md flex items-center justify-center">
      {/* Shimmer background */}
      <div className="absolute inset-0 animate-gradientMove bg-[linear-gradient(110deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_40%,rgba(255,255,255,0.6)_50%,rgba(255,255,255,0)_60%,rgba(255,255,255,0)_100%)]" />

      {/* Chart icons bouncing in sequence */}
      <div className="relative flex items-center justify-center gap-6 mt-4 animate-fade-in">
        {icons.map((icon, index) => (
          <div
            key={index}
            className={`animate-chartIconDelay${index} bg-white p-3 rounded-full shadow-lg`}
          >
            {icon}
          </div>
        ))}
      </div>

      {/* Text below icons */}
      {/* <div className="text-center mt-6">
        <p className="text-gray-700 font-semibold">
          Analyzing Chart Selections...
        </p>
        <p className="text-sm text-gray-500">This may take a moment</p>
      </div> */}

      {/* Tailwind Custom Animations */}
      <style jsx>{`
        @keyframes chartBounce {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        .animate-chartIconDelay0 {
          animation: chartBounce 1.5s ease-in-out infinite;
          animation-delay: 0s;
        }
        .animate-chartIconDelay1 {
          animation: chartBounce 1.5s ease-in-out infinite;
          animation-delay: 0.2s;
        }
        .animate-chartIconDelay2 {
          animation: chartBounce 1.5s ease-in-out infinite;
          animation-delay: 0.4s;
        }
        .animate-chartIconDelay3 {
          animation: chartBounce 1.5s ease-in-out infinite;
          animation-delay: 0.6s;
        }
        .animate-chartIconDelay4 {
          animation: chartBounce 1.5s ease-in-out infinite;
          animation-delay: 0.8s;
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradientMove {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .animate-gradientMove {
          background-size: 200% 100%;
          animation: gradientMove 1.2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;
