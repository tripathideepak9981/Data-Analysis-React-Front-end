
import { User, Upload, Search, CheckCircle, Link, FileText } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: User,
      title: "Secure User Login",
      description: "Personal workspace with enterprise-grade security for all your data projects."
    },
    {
      icon: Upload,
      title: "Upload or Connect",
      description: "Support for CSV, Excel files, and direct database connections to major platforms."
    },
    {
      icon: Search,
      title: "Natural Language to SQL",
      description: "Ask questions in plain English and get instant SQL queries and results."
    },
    {
      icon: CheckCircle,
      title: "AI-Powered Insights",
      description: "Automatic data cleaning, pattern detection, and intelligent recommendations."
    },
    {
      icon: Link,
      title: "Visual Table Joins",
      description: "Intuitive interface for combining data from multiple sources without coding."
    },
    {
      icon: FileText,
      title: "Context-Aware Queries",
      description: "Follow-up questions that remember your previous analysis context."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Data Analysis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to transform raw data into actionable insights, without technical complexity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group hover:border-blue-200"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
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
