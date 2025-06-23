
export const DemoPreview = () => {
  return (
    <section id="demo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            See It in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch how natural language queries transform into instant insights
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="text-gray-400 text-sm">DataAI Chat Interface</div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-xs">
                  Show me top customers by revenue this month
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 rounded-2xl rounded-bl-md px-4 py-3 max-w-md">
                  <p className="mb-3">Here's your top customer analysis:</p>
                  <div className="bg-gray-800 rounded-lg p-3 text-sm">
                    <div className="grid grid-cols-2 gap-4 mb-2 font-semibold text-blue-400">
                      <span>Customer</span>
                      <span>Revenue</span>
                    </div>
                    <div className="space-y-1">
                      <div className="grid grid-cols-2 gap-4">
                        <span>Acme Corp</span>
                        <span className="text-green-400">$125,400</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <span>TechFlow Inc</span>
                        <span className="text-green-400">$98,250</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <span>DataSync LLC</span>
                        <span className="text-green-400">$87,100</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-400">
                    SQL: SELECT customer_name, SUM(revenue) FROM sales WHERE month = CURRENT_MONTH GROUP BY customer_name ORDER BY revenue DESC LIMIT 3
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-xs">
                  What about compared to last month?
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 rounded-2xl rounded-bl-md px-4 py-3 max-w-md">
                  <p>Great question! Here's the month-over-month comparison:</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Acme Corp:</span>
                      <span className="text-green-400">+15.2% 📈</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TechFlow Inc:</span>
                      <span className="text-red-400">-5.8% 📉</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DataSync LLC:</span>
                      <span className="text-green-400">+22.1% 📈</span>
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
