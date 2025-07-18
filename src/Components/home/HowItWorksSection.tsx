import { Upload, Wand2, MessageSquare, AlarmClockCheck, BarChart3 } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload or Connect",
      description: "Upload CSV/Excel files or connect your database in seconds",
      number: "01",
    },
    {
      icon: Wand2,
      title: "AI Auto-Cleans",
      description: "Our AI understands and cleans your data automatically",
      number: "02",
    },
    {
      icon: MessageSquare,
      title: "Ask in Plain English",
      description: "Type questions naturally - no SQL knowledge required",
      number: "03",
    },
    {
      icon: BarChart3,
      title: "Interprets & Analyzes",
      description: "Automatically queries your database and delivers insights",
      number: "04",
    },
    
    {
      icon: AlarmClockCheck,
      title: "See results in seconds",
      description: "Visuals, charts, and actionable summaries",
      number: "05",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            How It{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            From data upload to insights in five simple steps
          </p>
        </div>

        {/* Steps cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-3xl p-6 text-center shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon and step number */}
              <div className="relative mb-6">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-violet-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow">
                  <step.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                  {step.number}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
