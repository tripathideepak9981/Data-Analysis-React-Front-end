import { Database, FileSpreadsheet, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const CardOption = ({ setCardSelected }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] py-10 space-y-12">
      {/* Header Section */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Data Analysis
          </h1>
        </motion.div>
        <p className="text-lg text-gray-600 font-light max-w-3xl">
          Connect your data sources and start intelligent conversations with
          your data
        </p>
      </motion.div>

      {/* Cards Section */}
      <div className="flex flex-col lg:flex-row gap-32 items-center justify-center">
        {/* Upload Excel File Card */}
        <motion.div
          onClick={() => setCardSelected("File")}
          className="group relative bg-white w-80 h-48 rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{
            y: -8,
            scale: 1.02,
          }}
        >
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Floating animation background */}
          <motion.div
            className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full opacity-20"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          <motion.div className="relative z-10 flex flex-col items-center space-y-4">
            <motion.div
              className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg"
              whileHover={{
                scale: 1.1,
                rotate: [0, -5, 5, 0],
                boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <FileSpreadsheet className="h-8 w-8 text-white" />
            </motion.div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                Upload Excel File
              </h3>
              <p className="text-sm text-gray-500 mt-2 group-hover:text-green-600 transition-colors">
                Quick data analysis from your files
              </p>
            </div>
          </motion.div>

          {/* Hover glow effect */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-green-400/10 to-emerald-400/10" />
        </motion.div>

        {/* Connect Database Card */}
        <motion.div
          onClick={() => setCardSelected("Database")}
          className="group relative bg-white w-80 h-48 rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{
            y: -8,
            scale: 1.02,
          }}
        >
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Floating animation background */}
          <motion.div
            className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-300 rounded-full opacity-20"
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          <motion.div className="relative z-10 flex flex-col items-center space-y-4">
            <motion.div
              className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg"
              whileHover={{
                scale: 1.1,
                rotate: [0, 5, -5, 0],
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <Database className="h-8 w-8 text-white" />
            </motion.div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                Connect Database
              </h3>
              <p className="text-sm text-gray-500 mt-2 group-hover:text-blue-600 transition-colors">
                Live data insights and real-time analysis
              </p>
            </div>
          </motion.div>

          {/* Hover glow effect */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-400/10 to-purple-400/10" />
        </motion.div>
      </div>
    </div>
  );
};

export default CardOption;
