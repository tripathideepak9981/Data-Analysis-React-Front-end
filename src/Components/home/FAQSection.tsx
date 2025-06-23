
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is my data secure?",
      answer: "Yes, we use enterprise-grade security with encrypted storage and isolated user environments. Your data is never shared or used to train our AI models."
    },
    {
      question: "Do I need SQL knowledge?",
      answer: "Not at all! Our AI translates your natural language questions into SQL automatically. You can also see the generated SQL to learn as you go."
    },
    {
      question: "Can I connect my own database?",
      answer: "Yes, we support connections to MySQL, PostgreSQL, SQLite, and other major databases. You can also upload CSV and Excel files directly."
    },
    {
      question: "What file formats are supported?",
      answer: "We support CSV, Excel (.xlsx, .xls), and direct database connections. More formats are being added regularly based on user feedback."
    },
    {
      question: "How accurate are the AI insights?",
      answer: "Our AI has been trained on millions of data queries and continuously improves. We also show you the SQL queries generated so you can verify the logic."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300 rounded-2xl"
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-violet-500 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              <div className={`transition-all duration-500 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="px-8 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
