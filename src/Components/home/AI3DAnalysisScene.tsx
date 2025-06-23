
import { useState, useEffect } from 'react';
import { BarChart3, Brain, Zap, TrendingUp } from 'lucide-react';

const AI3DAnalysisScene = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analysisSteps = [
    { title: "Data Processing", progress: 25, color: "from-blue-500 to-cyan-500" },
    { title: "Pattern Recognition", progress: 50, color: "from-purple-500 to-pink-500" },
    { title: "Insight Generation", progress: 75, color: "from-green-500 to-emerald-500" },
    { title: "Chart Creation", progress: 100, color: "from-orange-500 to-red-500" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnalyzing(true);
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % analysisSteps.length);
        setIsAnalyzing(false);
      }, 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-grid-pattern"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/10 to-transparent"></div>
      </div>

      {/* Floating AI Brain */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Brain container with glow */}
          <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
            <Brain className="w-12 h-12 text-white" />
          </div>
          
          {/* Orbiting data points */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s' }}>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400 rounded-full"></div>
            <div className="absolute top-1/2 -left-4 w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-1/2 -right-4 w-2 h-2 bg-red-400 rounded-full"></div>
          </div>

          {/* Energy waves */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 border-2 border-purple-400/30 rounded-2xl animate-ping"></div>
            <div className="absolute inset-0 border-2 border-blue-400/20 rounded-2xl animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>

      {/* Human silhouette */}
      <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2">
        <div className="w-32 h-40 bg-gradient-to-t from-slate-700 to-slate-600 rounded-t-full relative">
          {/* Head */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-slate-600 rounded-full"></div>
          
          {/* Arms */}
          <div className="absolute top-8 -left-4 w-8 h-20 bg-slate-600 rounded-full transform rotate-12"></div>
          <div className="absolute top-8 -right-4 w-8 h-20 bg-slate-600 rounded-full transform -rotate-12"></div>
          
          {/* Laptop/workstation */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-16 h-10 bg-slate-800 rounded-lg">
            <div className="w-full h-6 bg-blue-400/20 rounded-t-lg"></div>
          </div>
        </div>
      </div>

      {/* Floating charts and data visualizations */}
      <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2">
        <div className="space-y-4">
          {/* Bar chart */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 animate-float">
            <div className="flex items-end space-x-1 h-12">
              <div className="w-3 bg-blue-400 rounded-t" style={{ height: '60%' }}></div>
              <div className="w-3 bg-green-400 rounded-t" style={{ height: '80%' }}></div>
              <div className="w-3 bg-purple-400 rounded-t" style={{ height: '45%' }}></div>
              <div className="w-3 bg-pink-400 rounded-t" style={{ height: '90%' }}></div>
            </div>
            <BarChart3 className="w-4 h-4 text-white/70 mt-2" />
          </div>
          
          {/* Trending indicator */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 animate-float" style={{ animationDelay: '1s' }}>
            <TrendingUp className="w-6 h-6 text-green-400" />
            <div className="text-white text-xs mt-1">+24%</div>
          </div>
        </div>
      </div>

      {/* Data streams */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-20 bg-gradient-to-t from-transparent via-blue-400/50 to-transparent animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `rotate(${i * 30}deg)`
            }}
          ></div>
        ))}
      </div>

      {/* Analysis progress indicator */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3 mb-2">
            <Zap className={`w-5 h-5 ${isAnalyzing ? 'text-yellow-400 animate-pulse' : 'text-white/70'}`} />
            <span className="text-white text-sm font-medium">
              {analysisSteps[currentStep].title}
            </span>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className={`h-2 bg-gradient-to-r ${analysisSteps[currentStep].color} rounded-full transition-all duration-1000`}
              style={{ width: `${analysisSteps[currentStep].progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AI3DAnalysisScene;