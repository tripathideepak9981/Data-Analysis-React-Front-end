
import { TrendingUp, Users, Lightbulb, Search } from "lucide-react";

export const UseCasesSection = () => {
  const useCases = [
    {
      icon: TrendingUp,
      title: "Marketing Analyst",
      description: "Analyze campaign performance, customer segments, and ROI without waiting for the data team",
      avatar: "MA",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Startup Founder",
      description: "Get instant insights on user behavior, revenue trends, and growth metrics to make data-driven decisions",
      avatar: "SF",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Lightbulb,
      title: "Data Beginner",
      description: "Explore your data and learn SQL without technical background - AI guides you through every step",
      avatar: "DB",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Search,
      title: "Researcher",
      description: "Quickly analyze research data, find patterns, and generate reports for academic or business research",
      avatar: "RE",
      color: "from-pink-500 to-purple-500"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted By <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Professionals</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how different professionals use AI Data Analyst to unlock insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => (
            <div 
              key={index}
              className="group bg-slate-800/40 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 transform hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${useCase.color} rounded-full flex items-center justify-center text-white font-bold mr-4`}>
                  {useCase.avatar}
                </div>
                <div className={`w-10 h-10 bg-gradient-to-r ${useCase.color} rounded-lg flex items-center justify-center`}>
                  <useCase.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4">
                {useCase.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
