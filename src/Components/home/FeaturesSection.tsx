
import { Brain, Database, Wand2, Link, BarChart3, Shield } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "Natural Language to SQL",
      description: "Ask questions in plain English and get SQL queries automatically generated"
    },
    {
      icon: Database,
      title: "Connect Any Database",
      description: "Support for MySQL, PostgreSQL, CSV, Excel, and more data sources"
    },
    {
      icon: Wand2,
      title: "Smart Data Cleaning",
      description: "AI automatically cleans and prepares your data for analysis"
    },
    {
      icon: Link,
      title: "Visual Table Joins",
      description: "Combine data from multiple sources with an intuitive interface"
    },
    {
      icon: BarChart3,
      title: "Instant Charts & Summaries",
      description: "Real-time visualizations and summaries generated from your queries"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security with isolated user environments"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to transform raw data into actionable insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
