"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [mobMenuOpen, setMobMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleNavClick = () => {
    setMobMenuOpen(false);
  };

  const navbarVariants = {
    visible: {
      backgroundColor: "rgba(17, 17, 17, 0.9)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 2px 20px rgba(0, 0, 0, 0.2)",
    },
    hidden: {
      backgroundColor: "rgba(17, 17, 17, 0)",
      backdropFilter: "blur(0px)",
      boxShadow: "none",
    },
  };

  const Navitems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-amber-400/20 transition-all duration-300"
      variants={navbarVariants}
      animate={scrollY > 50 ? "visible" : "hidden"}
      initial="hidden"
    >
      <div className="container text-white mx-auto flex justify-between items-center h-16 md:h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.div
          className="font-bold text-lg sm:text-xl lg:text-2xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-amber-400">Khalil</span> Ahmad
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {Navitems.map((item, index) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative cursor-pointer hover:text-amber-400 transition-colors duration-300"
              onMouseEnter={() => setHovered(index + 1)}
              onMouseLeave={() => setHovered(0)}
            >
              {item.name}
              <motion.div
                className="absolute -bottom-1 left-1/2 h-[2px] bg-amber-400 rounded-full"
                style={{ translateX: "-50%" }}
                initial={{ width: 0 }}
                animate={{
                  width: hovered === index + 1 ? "100%" : "0%",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.a>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center">
          <a href="/Khalil%20Ahmad.pdf" download>
            <motion.button
              className="bg-amber-400 hover:bg-amber-500 px-4 py-2 rounded-lg text-black font-medium 
                       transition-all duration-300 cursor-pointer flex items-center gap-2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="h-4 w-4" />
              Download CV
            </motion.button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Mobile CTA Button */}
          <motion.button
            className="bg-amber-400 hover:bg-amber-500 px-3 py-2 rounded-lg text-black font-medium 
                     transition-all duration-300 cursor-pointer text-sm"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="h-4 w-4" />
          </motion.button>

          {/* Hamburger Menu */}
          <motion.button
            className="text-white hover:text-amber-400 transition-colors duration-300 p-2"
            onClick={() => setMobMenuOpen(!mobMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {mobMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/95 backdrop-blur-md border-t border-amber-400/20"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {Navitems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={handleNavClick}
                  >
                    {item.name}
                  </motion.a>
                ))}
                
                {/* Mobile Full CTA Button */}
                <a href="/Khalil%20Ahmad.pdf" download>
                  <motion.button
                    className="bg-amber-400 hover:bg-amber-500 px-4 py-3 rounded-lg text-black font-medium 
                             transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="h-4 w-4" />
                    Download CV
                  </motion.button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
