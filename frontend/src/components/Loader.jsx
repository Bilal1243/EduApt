import React from "react";
import { motion } from "framer-motion";

function Loader() {
  const text = "edure...";

  const letterAnimation = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.2, // delay per letter
      },
    }),
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="flex space-x-1 text-5xl md:text-7xl font-bold text-blue-600">
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={letterAnimation}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default Loader;
