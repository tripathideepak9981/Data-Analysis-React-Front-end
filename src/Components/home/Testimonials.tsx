
const Testimonials = () => {
  const testimonials = [
    {
      quote: "This tool transformed how we analyze customer data. What used to take hours now takes minutes. The natural language queries are incredibly intuitive.",
      author: "Sarah Chen",
      role: "Data Analyst",
      company: "TechFlow Inc."
    },
    {
      quote: "As a marketer, I'm not technical, but this platform makes me feel like a data scientist. I can get campaign insights instantly without bothering our dev team.",
      author: "Marcus Rodriguez",
      role: "Marketing Director",
      company: "GrowthLabs"
    },
    {
      quote: "Game-changer for our startup. We make data-driven decisions faster than ever. The AI recommendations have helped us optimize our entire sales funnel.",
      author: "Emily Foster",
      role: "Startup Founder",
      company: "InnovateNow"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Data-Driven Teams
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how professionals across industries use our platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6">
                <svg className="w-8 h-8 text-blue-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-gray-700 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="border-t pt-6">
                <p className="font-bold text-gray-900">{testimonial.author}</p>
                <p className="text-blue-600 font-medium">{testimonial.role}</p>
                <p className="text-gray-500 text-sm">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;