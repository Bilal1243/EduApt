import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">edure</div>

          {/* Desktop Menu (Right Aligned) */}
          <div className="hidden md:flex space-x-8 ml-auto">
            <a
              href="#home"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              About
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Services
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Transition */}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          <a
            href="#home"
            className="block text-gray-700 hover:text-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            href="#about"
            className="block text-gray-700 hover:text-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <a
            href="#services"
            className="block text-gray-700 hover:text-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Services
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
