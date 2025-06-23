
import { useState, useEffect } from "react";

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      quote: "I analyzed my data in seconds. No SQL, no hassle. This tool completely transformed how I work with data.",
      author: "Sarah Chen",
      role: "Marketing Director",
      company: "TechCorp"
    },
    {
      quote: "The AI actually understood my messy data. It cleaned everything and gave me insights I never would have found.",
      author: "Mike Rodriguez", 
      role: "Data Analyst",
      company: "StartupXYZ"
    },
    {
      quote: "It's like having a data scientist in your pocket. I can ask any question and get instant, accurate answers.",
      author: "Emily Watson",
      role: "Research Lead", 
      company: "InnovateLab"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-violet-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Users <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">Say</span>
          </h2>
        </div>

        <div className="relative">
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-200 text-center">
            <div className="mb-8">
              <div className="text-6xl text-violet-500 mb-6">"</div>
              <p className="text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                {testimonials[currentIndex].quote}
              </p>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">
                {testimonials[currentIndex].author.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-left">
                <div className="text-xl font-semibold text-gray-900">
                  {testimonials[currentIndex].author}
                </div>
                <div className="text-gray-600">
                  {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-violet-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
