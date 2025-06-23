
import { useState, useEffect } from "react";

export const LiveDemoSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const demoSteps = [
    { type: 'user', text: 'Show me revenue by region', delay: 0 },
    { type: 'ai', text: 'Here\'s your revenue breakdown by region:', delay: 1500 },
    { type: 'chart', delay: 2500 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < demoSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Reset the demo
        setTimeout(() => setCurrentStep(0), 2000);
      }
    }, demoSteps[currentStep]?.delay || 1500);

    return () => clearTimeout(timer);
  }, [currentStep, demoSteps]);

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-gray-50 to-violet-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See It In <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">Action</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch how natural language transforms into instant insights
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-6 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="text-gray-500 text-sm font-medium">AI Data Chat</div>
            </div>
            
            <div className="p-8 space-y-6 min-h-[400px] bg-gradient-to-br from-gray-700 to-gray-800">
              {demoSteps.slice(0, currentStep + 1).map((step, index) => (
                <div key={index} className={`flex ${step.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                  {step.type === 'chart' ? (
                    <div className="max-w-md bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Revenue by Region</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">North America</span>
                            <span className="font-semibold text-violet-600">$2.4M</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Europe</span>
                            <span className="font-semibold text-blue-600">$1.8M</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Asia Pacific</span>
                            <span className="font-semibold text-teal-600">$1.2M</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                        SQL: SELECT region, SUM(revenue) FROM sales GROUP BY region
                      </div>
                    </div>
                  ) : (
                    <div className={`max-w-md px-6 py-4 rounded-2xl ${
                      step.type === 'user' 
                        ? 'bg-violet-600 text-white rounded-br-md' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                    }`}>
                      {step.text}
                    </div>
                  )}
                </div>
              ))}
              
              {currentStep < demoSteps.length - 1 && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-1 px-4 py-2 bg-gray-100 rounded-full">
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
