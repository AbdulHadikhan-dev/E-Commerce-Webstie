import React from "react";
import { FaHome } from "react-icons/fa";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-extrabold text-white mb-2">404</h1>
          <h2 className="text-3xl font-bold text-gray-300 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="/"
            className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors duration-200"
          >
            <FaHome className="mr-2" />
            Back to Homepage
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;