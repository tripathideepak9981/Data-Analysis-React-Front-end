import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import FaqImage from "../../assets/FaqSection.png";

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "It Has Survived Not Only Five Centuries?",
      answer:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
    },
    {
      question: "Where Does It Come From?",
      answer:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in classical Latin literature from 45 BC.",
    },
    {
      question: "Why Do We Use It?",
      answer:
        "It is a long established fact that Lorem Ipsum helps designers plan where content will appear without being distracted by readable copy.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="bg-[#f3f4fb] py-20 px-4 md:px-20 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Left: FAQ Content */}
        <div className="w-full lg:w-1/2">
          <p className="text-sm uppercase tracking-widest text-[#2d1b54] mb-1 font-medium">
            Our FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#2d1b54] leading-tight mb-1">
            Frequently <span className="text-[#403a60] font-normal">Asked</span>
          </h2>
          <h3 className="text-3xl font-light text-[#403a60] mb-5">Questions</h3>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border rounded-xl px-6 py-4 shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <p className="text-md font-semibold text-[#1e1e2f]">
                    {faq.question}
                  </p>
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="text-white bg-[#2d1b54] hover:bg-[#403a60] p-2 rounded-md transition"
                  >
                    {activeIndex === index ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {/* Answer section */}
                {activeIndex === index && (
                  <div className="mt-4 text-sm text-[#5f5f7e]">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <div className="w-full h-[80vh] rounded-xl shadow-blue-950 bg-[#2d1b54] lg:w-1/2 flex justify-center items-center">
          <img
            src={FaqImage}
            alt="FAQ Illustration"
            className="w-[90%] max-w-md object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
