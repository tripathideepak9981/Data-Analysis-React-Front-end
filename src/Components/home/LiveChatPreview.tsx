
import { useState, useEffect } from "react";

export const LiveChatPreview = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  
  const messages = [
    { type: 'user', text: 'Show me top 10 products by revenue', delay: 0 },
    { type: 'ai', text: 'Here are your top 10 products by revenue:', delay: 1000 },
    { type: 'ai', text: 'SQL: SELECT product_name, SUM(revenue) FROM sales GROUP BY product_name ORDER BY revenue DESC LIMIT 10', delay: 2000 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (messageIndex < messages.length - 1) {
        setMessageIndex(messageIndex + 1);
      }
    }, messages[messageIndex]?.delay || 1000);

    return () => clearTimeout(timer);
  }, [messageIndex, messages]);

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            See It In <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Action</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch how natural language transforms into instant insights
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-500/20 overflow-hidden">
            <div className="flex items-center justify-between p-6 bg-slate-900/50 border-b border-blue-500/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="text-gray-400 text-sm">AI Data Chat</div>
            </div>
            
            <div className="p-8 space-y-6 min-h-[400px]">
              {messages.slice(0, messageIndex + 1).map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                  <div className={`max-w-md px-6 py-4 rounded-2xl ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md' 
                      : 'bg-slate-700/50 text-gray-100 rounded-bl-md border border-blue-500/20'
                  }`}>
                    {message.text}
                    {message.type === 'ai' && index === 2 && (
                      <div className="mt-4 p-4 bg-slate-800/80 rounded-lg border border-blue-500/30">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-blue-400 font-semibold">Product</div>
                          <div className="text-blue-400 font-semibold">Revenue</div>
                          <div>iPhone 15</div>
                          <div className="text-green-400">$2.5M</div>
                          <div>MacBook Pro</div>
                          <div className="text-green-400">$1.8M</div>
                          <div>iPad Air</div>
                          <div className="text-green-400">$1.2M</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {messageIndex < messages.length - 1 && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-1 px-4 py-2 bg-slate-700/30 rounded-full">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
