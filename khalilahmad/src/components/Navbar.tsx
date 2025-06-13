"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const Navitems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const [mobMenuOpen, setMobMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(0);


  const navbarVariants = {
    visible: {
      backgroundColor: "rgba(var(--background), 0.8)",
      backdropFilter: "blur(8px)",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    hidden: { backgroundColor: "rgba(var(--background), 0)", backdropFilter: "blur(0px)", boxShadow: "none" },
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-amber-400 transition-all duration-300"
      variants={navbarVariants}
      animate={scrollY > 50 ? "visible" : "hidden"}
      initial="hidden"
    >
      <div className="container text-white mx-auto flex justify-between items-center h-20 px-8">
        <motion.div
          className="font-bold text-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          Khalil Ahmad
        </motion.div>

        <div className="hidden md:flex items-center space-x-6">
          {Navitems.map((item, index) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative cursor-pointer mx-4"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(0)}
            >
              {item.name}
              <motion.div
              className="absolute bottom-0 left-1/2 h-[2px] bg-amber-400 rounded-full"
              style={{ translateX: "-50%" }}
              initial={{ width: 0 }}
              animate={{
                width: hovered === index ? "100%" : "0%",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            </motion.a>

          ))}
        </div>


        <div className="flex items-center gap-4">
          <motion.button
            className="bg-amber-400 px-4 py-2 rounded-md text-white text-sm md:text-base cursor-pointer"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => setMobMenuOpen(!mobMenuOpen)}
          >
            Hire Me
          </motion.button>
        </div>

        {mobMenuOpen && (
          <div>
            {Navitems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className="mx-4"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </motion.nav>
  );
}
