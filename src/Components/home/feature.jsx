import card1 from "../../assets/image2.png";
import image2 from "../../assets/image1.png";
import image4 from "../../assets/Main1.png";
import card4 from "../../assets/header.png";
import card5 from "../../assets/bg.png";

const About = () => {
  return (
    <section
      id="services"
      className="bg-[#f4f7ff] scroll-mt-10  py-10 text-white"
    >
      <div className="max-w-6xl mx-auto px-4 font-sans">
        {/* Intro Header */}
        <div className="mb-2 flex flex-col px-5  md:flex-row items-center justify-center">
          <div className="text-center md:text-center md:w-2/3">
            <h1 className="text-3xl font-extrabold font-serif bg-[#2d1b54] text-transparent bg-clip-text">
              Your Data, Your Questions, Instant Answers
            </h1>
            <h2 className="text-xl font-bold font-mono bg-[#2d1b54] text-transparent bg-clip-text">
              (Even if you don’t know SQL.)
            </h2>
          </div>
          <div className="md:w-1/4 flex justify-center md:justify-start mt-6 md:mt-0">
            <img
              src={image4}
              alt="Data integration illustration"
              className="w-48 h-48 object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Decision-Making Agility Section */}
        <div className="w-full flex items-center justify-center px-5">
          <div
            className="rounded-xl md:w-5xl p-8 mb-10 border border-[#b5ccff] shadow-xl hover:shadow-2xl transition-all duration-300 bg-cover bg-center bg-no-repeat relative overflow-hidden"
            style={{ backgroundImage: `url(${card4})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#dbe6fd]/30 backdrop-blur-sm rounded-xl z-0" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center">
              {/* Left Content */}
              <div className="lg:w-1/2 lg:pr-6 mb-6 lg:mb-0 px-5 ">
                <h2 className="text-2xl font-bold mb-4 font-serif tracking-tight text-gray-800">
                  Decision-Making Ability
                </h2>
                <p className="text-base text-gray-700 mb-4">
                  Make faster, smarter decisions by turning raw data into
                  actionable insights. Our tool gives you the edge to explore
                  patterns, build forecasts, and collaborate in real-time with
                  stakeholders.
                </p>
                <ul className="text-lg text-gray-800 space-y-2">
                  {[
                    "AI copilots assisted analytics",
                    "Natural language querying",
                    "AI-driven insights",
                    "Interactive visualizations",
                    "Reduced IT reliance",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-fuchsia-400 mr-2">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Image */}
              <div className="lg:w-1/2 w-full flex justify-center items-center">
                <img
                  src={image2}
                  alt="AI data visualization"
                  className="w-full h-auto max-h-72 lg:max-h-80 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
