import { useState, useEffect } from "react";
import {
  ArrowRight,
  Play,
  TrendingUp,
  BarChart3,
  PieChart,
  Database,
} from "lucide-react";
import DemoModal from "./DemoModal";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ isLoggedIn }) => {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSwitchToChat = () => {
    isLoggedIn() ? navigate("/chatPage") : navigate("/signInPage");
  };

  const insights = [
    { text: "Top regions by revenue", icon: BarChart3, value: "$2.4M" },
    { text: "Sales trend analysis", icon: TrendingUp, value: "+23%" },
    { text: "Customer segments", icon: PieChart, value: "5 groups" },
    { text: "Data quality score", icon: Database, value: "98%" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentInsight((prev) => (prev + 1) % insights.length);
        setIsTyping(false);
      }, 800);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-violet-50/40 to-blue-50/40 pt-16">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 left-12 w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
          <div
            className="absolute top-40 right-24 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-36 left-16 w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          <div className="absolute top-1/4 left-1/4 w-20 h-20 border border-violet-300 rounded-xl animate-float opacity-30"></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-16 h-16 border border-blue-300 rounded-full animate-float opacity-20"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-6">
                <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
                  <span className="block">It’s Not ChatGPT.</span>
                  <span className="block bg-gradient-to-r from-violet-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                    It’s Your AI,
                  </span>
                  <span className="block">On Your Data, Inside Your Network.</span>
                </h1>

                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Your Data. AI-Powered. Connect via VPN. Generate & Run SQL
                  Instantly. No Analysts. No Waiting. Just Answers. Ask,
                  Analyze, Act — Your Way.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleSwitchToChat}
                  className="group bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-violet-400/30 transition-transform transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Try it Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Setup in 30 seconds</span>
                </div>
              </div>
            </div>

            {/* Right Side UI */}
            <div className="relative">
              <div className="relative mx-auto max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-3xl blur-3xl scale-105"></div>
                <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-6 transform hover:rotate-0 transition duration-500">
                  {/* Chat Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">AI</span>
                      </div>
                      <span className="font-semibold text-gray-800">
                        Data Whisperer
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Chat bubbles */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 py-2 rounded-2xl rounded-br-md max-w-xs shadow">
                        <p className="text-sm">Show me revenue by region</p>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md max-w-xs shadow">
                        <p className="text-sm text-gray-700 mb-2">
                          Here’s your revenue analysis:
                        </p>
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <div className="flex justify-between items-end space-x-1 h-16">
                            <div
                              className="bg-violet-400 rounded-t"
                              style={{ height: "80%", width: "20px" }}
                            ></div>
                            <div
                              className="bg-blue-400 rounded-t"
                              style={{ height: "60%", width: "20px" }}
                            ></div>
                            <div
                              className="bg-teal-400 rounded-t"
                              style={{ height: "100%", width: "20px" }}
                            ></div>
                            <div
                              className="bg-violet-300 rounded-t"
                              style={{ height: "45%", width: "20px" }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>NA</span>
                            <span>EU</span>
                            <span>APAC</span>
                            <span>SA</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Typing */}
                  <div className="flex items-center space-x-2 text-gray-500">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>

                {/* Floating Insight Cards */}
                {insights.map((insight, index) => {
                  const CurrentIcon = insight.icon;
                  return (
                    <div
                      key={index}
                      className={`absolute bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white/30 p-3 transition-all duration-500 ${
                        currentInsight === index
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-40 scale-90"
                      }`}
                      style={{
                        top:
                          index === 0
                            ? "-20px"
                            : index === 1
                            ? "30%"
                            : index === 2
                            ? "60%"
                            : "90%",
                        left:
                          index % 2 === 0 ? "-80px" : "calc(100% + 40px)",
                        transform: `translateY(${index * 10}px)`,
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <CurrentIcon className="w-4 h-4 text-violet-600" />
                        <div>
                          <p className="text-xs font-medium text-gray-800">
                            {insight.text}
                          </p>
                          <p className="text-sm font-bold text-violet-600">
                            {insight.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </>
  );
};

export default HeroSection;
