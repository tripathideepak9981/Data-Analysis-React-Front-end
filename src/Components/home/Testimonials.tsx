
export const Testimonials = () => {
  const testimonials = [
    {
      quote: "DataAI transformed how I analyze customer data. What used to take hours now takes minutes. The natural language queries are incredibly intuitive.",
      author: "Sarah Chen",
      role: "Data Analyst",
      company: "TechStart Inc"
    },
    {
      quote: "As a marketer with no SQL background, this tool is a game-changer. I can get campaign insights instantly without bothering our dev team.",
      author: "Mike Rodriguez",
      role: "Marketing Manager",
      company: "GrowthCo"
    },
    {
      quote: "We use DataAI for investor reporting and financial analysis. The AI insights help us spot trends we might have missed manually.",
      author: "Emily Watson",
      role: "Startup Founder",
      company: "InnovateLab"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Data Teams Everywhere
          </h2>
          <p className="text-xl text-gray-600">
            See how professionals are transforming their data workflows
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="mb-6">
                <div className="text-4xl text-blue-500 mb-4">"</div>
                <p className="text-gray-700 leading-relaxed">
                  {testimonial.quote}
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
