
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Analyze Data Instantly
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                with AI
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Upload your files or connect your database. Get insights with natural language.
              No SQL knowledge required - just ask questions and get instant answers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Free
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-3 border-2 hover:bg-blue-50 transition-all duration-300"
              >
                See Demo
              </Button>
            </div>
          </div>
          
          <div className="mt-16 animate-fade-in">
            <div className="relative mx-auto max-w-4xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-blue-100 rounded-lg p-3 text-left">
                      <p className="text-blue-800 font-medium">Show me the top 5 customers by revenue this quarter</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-left shadow-sm">
                      <p className="text-gray-800 mb-2">Here are your top 5 customers by revenue:</p>
                      <div className="space-y-2">
                        <div className="flex justify-between border-b pb-1">
                          <span className="font-medium">Acme Corp</span>
                          <span className="text-green-600">$125,400</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="font-medium">TechFlow Inc</span>
                          <span className="text-green-600">$98,250</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="font-medium">DataSync LLC</span>
                          <span className="text-green-600">$87,100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
