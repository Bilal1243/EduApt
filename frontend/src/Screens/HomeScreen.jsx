import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function HomeScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-6">
      <section className="text-center w-full max-w-3xl">
        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-blue-600">edure</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-600 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          LEARN WHAT EARNS
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} className="mt-5">
            <Link
              to="https://edure.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-all"
            >
              Learn More
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="mt-5">
            <Link
              to="/add-details"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition-all"
            >
              Start Aptitude
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default HomeScreen;
