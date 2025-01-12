import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      
      <div className="max-w-7xl mx-auto flex justify-center space-x-6">
        <Link to="/about" className="hover:text-yellow-500 transition">
          About
        </Link>
        <Link to="/contact" className="hover:text-yellow-500 transition">
          Contact
        </Link>
        <Link to="/faq" className="hover:text-yellow-500 transition">
          FAQ
        </Link>
      </div>
      <p>© 2025 Travel Planner. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
