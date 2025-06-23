
import { Brain, Database, Wand2, Link, BarChart3, Shield } from "lucide-react";

export const KeyFeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Natural Language to SQL",
      description: "Ask questions in plain English and get SQL queries automatically generated",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Database,
      title: "Upload Excel/CSV or Connect Databases",
      description: "Support for all major databases and file formats with instant connectivity",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Wand2,
      title: "Smart Data Cleaning + Previews",
      description: "AI automatically cleans and prepares your data for analysis",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Link,
      title: "Join & Modify Tables Visually",
      description: "Combine data from multiple sources with an intuitive visual interface",
      color: "from-pink-500 to-purple-500"
    },
    {
      icon: BarChart3,
      title: "Real-time Charts, Tables & Summaries",
      description: "Instant visualizations and summaries generated from your queries",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Shield,
      title: "Secure Personal Databases per User",
      description: "Enterprise-grade security with isolated user environments",
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to transform raw data into actionable insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-slate-800/30 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative">
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
