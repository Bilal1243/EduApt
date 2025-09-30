import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function HomeScreen() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-12 py-20">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left max-w-lg"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
            <span className="text-blue-600">edure</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Our focus is on delivering the highest quality education and skills
            at the best software training institute in Trivandrum & Kochi,
            empowering individuals in their professional journeys.
          </p>
       
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/features"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/learn-more"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mt-12 md:mt-0"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
            alt="illustration"
            className="w-80 md:w-[420px]"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800"
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10 mt-12">
            {[
              {
                title: "Modern UI",
                desc: "Built with Tailwind for responsive and elegant layouts.",
              },
              {
                title: "Smooth Animations",
                desc: "Powered by Framer Motion for delightful interactions.",
              },
              {
                title: "Professional Design",
                desc: "Perfect for presentations, projects, and client demos.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-6 bg-blue-50 rounded-2xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} MyBrand. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#facebook" className="hover:text-gray-200">
              Facebook
            </a>
            <a href="#twitter" className="hover:text-gray-200">
              Twitter
            </a>
            <a href="#linkedin" className="hover:text-gray-200">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomeScreen;
