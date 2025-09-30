import React from "react";
import { motion } from "framer-motion";

function Loader() {
  const text = "EDURE...";

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="flex space-x-1 text-5xl md:text-7xl font-bold text-blue-600">
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              repeatDelay: 0,
              delay: index * 0.2,
              duration: 0.6,
              type: "spring",
              stiffness: 300,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default Loader;
