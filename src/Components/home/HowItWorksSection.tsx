
import { Upload, Wand2, MessageSquare, BarChart3 } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload or Connect",
      description: "Upload CSV/Excel files or connect your database in seconds",
      number: "01"
    },
    {
      icon: Wand2,
      title: "AI Auto-Cleans",
      description: "Our AI understands and cleans your data automatically",
      number: "02"
    },
    {
      icon: MessageSquare,
      title: "Ask in Plain English",
      description: "Type questions naturally - no SQL knowledge required",
      number: "03"
    },
    {
      icon: BarChart3,
      title: "Get Instant Insights",
      description: "View answers, charts, and summaries instantly",
      number: "04"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From data upload to insights in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              <div className="bg-white rounded-2xl py-6 px-3 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-violet-200 to-transparent z-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
