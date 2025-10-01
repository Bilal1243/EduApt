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
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="flex items-center justify-between max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
            Welcome to <span className="text-blue-600">EDURE</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Prepare for aptitude tests, submit your details, and grow your
            career.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} className="mt-5">
              <Link
                to="https://edure.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
              >
                Learn More
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="mt-5">
              <Link
                to="/add-details"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Start Aptitude
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeScreen;
