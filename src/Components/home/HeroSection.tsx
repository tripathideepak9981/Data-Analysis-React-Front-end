import { useState, useEffect } from "react";
import {
  ArrowRight,
  Check,
  Zap,
  Lock,
} from "lucide-react";
import DemoModal from "./DemoModal";
import AdvancedAnalyticsDashboard from "./AdvancedAnalyticsDashboard";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ isLoggedIn }) => {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSwitchToChat = () => {
    isLoggedIn() ? navigate("/chatPage") : navigate("/signInPage");
  };

  const insights = [
    "Show me revenue by region",
    "Which customers are at risk?",
    "What's our best performing product?",
    "Analyze last quarter's growth",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main className="flex flex-col lg:flex-row items-center min-h-[100vh] px-6 py-6 max-w-8xl gap-32 ml-14 mx-auto">
        {/* Left Hero Content */}
        <section className="flex-1 max-w-full mb-20">
          <h1 className="text-5xl md:text-6xl lg:text-[55px] font-extrabold leading-tight mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Beyond Generic AI.
            <br />
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Your Personal AI
            </span>
            <br />
            For Your Private Data.
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">
            Connect securely to your databases, analyze your business data
            instantly, and get AI-powered insights without compromising privacy.
            No data leaves your network.
          </p>
          <button
            onClick={handleSwitchToChat}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg font-semibold shadow-md hover:-translate-y-1 hover:shadow-xl transition"
          >
            Try It Free
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="flex flex-wrap gap-4 text-slate-500 text-sm mt-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-emerald-500 text-white rounded-full flex justify-center items-center">
                <Check className="w-3 h-3" />
              </div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-yellow-400 text-white rounded-full flex justify-center items-center">
                <Zap className="w-3 h-3" />
              </div>
              <span>Setup in 30 seconds</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex justify-center items-center">
                <Lock className="w-3 h-3" />
              </div>
              <span>100% Private & Secure</span>
            </div>
          </div>
        </section>

        {/* Right Advanced Analytics Dashboard */}
        <section className="flex justify-center items-center mr-10">
          <AdvancedAnalyticsDashboard />
        </section>
      </main>

      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </>
  );
};

export default HeroSection;
