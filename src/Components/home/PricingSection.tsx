
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Free</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            No credit card required. Start analyzing your data in seconds.
          </p>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl p-12 border border-blue-500/20">
          <div className="mb-8">
            <div className="text-5xl font-bold text-white mb-4">Free Forever</div>
            <p className="text-gray-300 text-lg">Perfect for individuals and small teams</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-green-400 mr-3" />
                Upload unlimited CSV/Excel files
              </div>
              <div className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-green-400 mr-3" />
                Natural language to SQL queries
              </div>
              <div className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-green-400 mr-3" />
                AI-powered data cleaning
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-green-400 mr-3" />
                Real-time charts and summaries
              </div>
              <div className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-green-400 mr-3" />
                Secure personal workspace
              </div>
              <div className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-green-400 mr-3" />
                Enterprise-grade security
              </div>
            </div>
          </div>

          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-xl px-12 py-4 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Now
          </Button>
          
          <p className="text-gray-400 text-sm mt-4">
            No setup required • Enterprise security included
          </p>
        </div>
      </div>
    </section>
  );
};
