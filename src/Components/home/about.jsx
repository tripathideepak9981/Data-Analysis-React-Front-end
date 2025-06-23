import image2 from "../../assets/header.png";
import image3 from "../../assets/graphs.png";
import image4 from "../../assets/image2.png";
import { motion } from "framer-motion";

const About = () => {
  const images = [image2, image3, image4];

  return (
    <section
      id="about"
      className="scroll-mt-40 bg-[#f4f7ff] font-sans px-10 py-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {[
          {
            title: "Data Monetization",
            desc: "Turn raw data into valuable insights with advanced AI.",
          },
          {
            title: "Message Analytics",
            desc: "Analyze patterns in communication and extract trends.",
          },
          {
            title: "Business Intelligence",
            desc: "Empower teams with data-driven strategic decisions.",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              type: "spring",
              bounce: 0.3,
              duration: 0.8,
              delay: i * 0.2,
            }}
            whileHover={{
              scale: 1.06,
              rotateX: 6,
              rotateY: -6,
              boxShadow: "0px 20px 30px rgba(79, 87, 241, 0.2)",
            }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center transform transition-all duration-300 hover:cursor-pointer"
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden shadow-lg"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, rotate: 3 }}
              transition={{
                delay: i * 0.2 + 0.2,
                type: "spring",
                stiffness: 100,
              }}
            >
              <img
                src={images[i]}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {card.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{card.desc}</p>

            <button className="text-sm font-semibold text-[#4f57f1] hover:underline transition">
              Learn More →
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
