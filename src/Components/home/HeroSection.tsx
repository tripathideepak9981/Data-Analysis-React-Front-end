
import { useState, useEffect } from "react";
import { ArrowRight, Play, TrendingUp, BarChart3, PieChart, Database } from "lucide-react";
import DemoModal from "./DemoModal";
import AI3DAnalysisScene from "./AI3DAnalysisScene";
import { useNavigate } from "react-router-dom";


const HeroSection = ({isLoggedIn}) => {
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
    { text: "Data quality score", icon: Database, value: "98%" }
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-violet-50/30 to-blue-50/30 pt-16">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-20 h-20 border border-violet-200 rounded-lg rotate-12 animate-float opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/4 w-16 h-16 border border-blue-200 rounded-full animate-float opacity-20" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-6 ">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-gray-900"> Make Data Aanalysis</span>
                  <span className="block bg-gradient-to-r from-violet-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                    Easier and Faster
                  </span>
                  <span className="block text-gray-900">Powered by AI.</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                  Simplify SQL queries, visualize results instantly, and automate your
            workflow using next-gen AI.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={handleSwitchToChat}  className="group bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-violet-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Try it Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
{/*                 
                <button 
                  onClick={() => setIsDemoModalOpen(true)}
                  className="group border-2 border-gray-300 hover:border-violet-400 text-gray-700 hover:text-violet-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-violet-50 flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch the Demo</span>
                </button> */}
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

            {/* Right - 3D AI Analysis Scene */}
            <div className="relative">
              <div className="relative mx-auto max-w-lg">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-3xl blur-3xl scale-110"></div>
                
                {/* 3D AI Analysis Scene */}
                <div className="relative transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <AI3DAnalysisScene />
                </div>

                {/* Floating insight cards */}
                {insights.map((insight, index) => {
                  const CurrentIcon = insight.icon;
                  return (
                    <div
                      key={index}
                      className={`absolute bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 p-3 transition-all duration-500 ${
                        currentInsight === index 
                          ? 'opacity-100 scale-100 translate-y-0' 
                          : 'opacity-40 scale-90'
                      }`}
                      style={{
                        top: index === 0 ? '-20px' : index === 1 ? '30%' : index === 2 ? '60%' : '90%',
                        left: index % 2 === 0 ? '-80px' : 'calc(100% + 40px)',
                        transform: `translateY(${index * 10}px)`,
                        animationDelay: `${index * 0.5}s`
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <CurrentIcon className="w-4 h-4 text-violet-600" />
                        <div>
                          <p className="text-xs font-medium text-gray-800">{insight.text}</p>
                          <p className="text-sm font-bold text-violet-600">{insight.value}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Connecting lines */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full opacity-20">
                    <defs>
                      <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M50,50 Q150,100 250,150" 
                      stroke="url(#line-gradient)" 
                      strokeWidth="2" 
                      fill="none"
                      className="animate-pulse"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-6 border-2 border-violet-400 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-violet-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </>
  );
};

export default HeroSection;