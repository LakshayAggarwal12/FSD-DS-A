import React from "react";
import { NavLink } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Courses from "../pages/Courses";
import Contact from "../pages/Contact";

const Navbar = () => {
  const navLinkStyle = ({ isActive }) =>
    `relative px-4 py-2 text-sm font-medium transition-all duration-300
     ${
       isActive
         ? "text-white after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-6 after:-translate-x-1/2 after:bg-white"
         : "text-gray-300 hover:text-white"
     }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/95 text-white shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        
        {/* Logo / College Name */}
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-gray-900">
            ABES
          </div>

          <div className="hidden sm:block">
            <h1 className="font-serif text-xl font-bold tracking-wide">
              ABES
            </h1>
            <p className="text-xs text-gray-400">
              Engineering College
            </p>
          </div>
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/about" className={navLinkStyle}>
            About
          </NavLink>

          <NavLink to="/courses" className={navLinkStyle}>
            Courses
          </NavLink>

          <NavLink to="/contact" className={navLinkStyle}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;