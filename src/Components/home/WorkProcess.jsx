import React from "react";
import { FileText, ShoppingBag, ShoppingCart } from "lucide-react";

const WorkProcess = () => {
  const steps = [
    {
      id: 1,
      title: "Process Of Collecting",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis consectetur adipiscing",
      icon: <FileText className="w-10 h-10 stroke-[1.5] text-indigo-600" />,
    },
    {
      id: 2,
      title: "Transforming & Cleaning",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis consectetur adipiscing",
      icon: <ShoppingBag className="w-10 h-10 stroke-[1.5] text-indigo-600" />,
    },
    {
      id: 3,
      title: "Discovering The Goal",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis consectetur adipiscing",
      icon: <ShoppingCart className="w-10 h-10 stroke-[1.5] text-indigo-600" />,
    },
  ];

  return (
    <section className="bg-[#f3f4fb] py-10 px-4 md:px-30 font-sans">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-2">
          Our Process{" "}
          <span className="inline-block w-6 h-[2px] bg-[#2d1b54] ml-2 align-middle" />
        </p>
        <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-16">
          How We <span className="font-semibold text-[#2d1b54]">Works</span>
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center relative"
            >
              {/* Icon */}
              <div className="mb-2">{step.icon}</div>

              {/* Step Number */}
              <p className="text-sm text-[#6b7280] mb-4">{`0${step.id}`}</p>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 max-w-xs">
                {step.description}
              </p>

              {/* Dotted line (only for the first two steps) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-[40px] right-[-55%] w-[100%] h-px border-t border-dotted border-indigo-600 z-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
