
import { Button } from "@/components/ui/button";

export const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Your Data Journey with AI Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who are already transforming their data analysis workflow. 
            No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-gray-50 text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
            >
              Sign Up Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-700 text-lg px-8 py-3 transition-all duration-300 font-semibold"
            >
              Upload Your First File
            </Button>
          </div>
          <p className="text-blue-200 text-sm mt-4">
            Free forever plan • No setup required • Enterprise security
          </p>
        </div>
      </div>
    </section>
  );
};
