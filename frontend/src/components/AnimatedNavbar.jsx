import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const colors = {
  primary: "#37abc8", // cyan 400
  secondary: "#37abc8", // same
  tertiary: "#37abc8", // same
  accent: "#37abc8", // cyan 400
  accentAlt: "#ffc600", // Golden yellow
  textLight: "#ffffff", // White text
  dark: "#0a0a0a", // Almost black
};

// Icons - you can replace these with your own SVG icons
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const TimelineIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const IdeaIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

const AnimatedNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if current page is home
  const isHomePage = location.pathname === "/register";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".navbar-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Define navigation items
  const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon /> },
    { name: "Timeline", path: "/timeline", icon: <TimelineIcon /> },
    { name: "Submit Idea", path: "/idea", icon: <IdeaIcon /> },
  ];

  const handleRegisterClick = () => {
    // Close mobile menu if open
    setIsOpen(false);

    // Check if we're already on the home page
    if (window.location.pathname !== "/") {
      // Navigate to home page first
      navigate("/");

      // Add an event listener to scroll after the page loads
      const scrollToRegister = () => {
        const registerSection = document.getElementById("register");
        if (registerSection) {
          registerSection.scrollIntoView({ behavior: "smooth" });
          // Remove the event listener after we've used it
          window.removeEventListener("load", scrollToRegister);
        }
      };

      window.addEventListener("load", scrollToRegister);
    } else {
      // If already on home page, just scroll to section
      const registerSection = document.getElementById("register");
      if (registerSection) {
        registerSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="navbar-container">
      {/* Top bar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "py-2 bg-[#000000]/90 shadow-lg shadow-[#000000]/20"
            : "py-2 bg-[#000000]/30 backdrop-blur-md shadow-lg"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-white flex items-center"
          >
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <span>
                <img
                  src="/tech_TANK.jpeg"
                  alt="Logo"
                  className="w-36 h-8 sm:h-8 md:h-8 object-cover object-center"
                />
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`px-3 py-2 flex items-center space-x-2 rounded-lg transition-all duration-300 ${
                    location.pathname === item.path
                      ? "bg-[#37abc8] text-[#072ac8] font-medium shadow-md shadow-[#37abc8]/20"
                      : "text-white hover:bg-[#1e96fc]/20"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            ))}

            {/* Only show Register Now button when not on home page */}
            {!isHomePage && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <button
                  onClick={handleRegisterClick}
                  className="px-6 py-2 bg-gradient-to-r from-[#fcf300] to-[#ffc600] text-[#072ac8] font-bold rounded-lg hover:shadow-lg hover:shadow-[#fcf300]/30 transition-all duration-300 transform hover:translate-y-[-2px]"
                >
                  Register Now
                </button>
              </motion.div>
            )}
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white focus:outline-none relative z-50"
            aria-label="Menu"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <motion.div
                animate={isOpen ? "open" : "closed"}
                className="w-6 h-5 flex flex-col justify-between"
              >
                <motion.span
                  className="w-6 h-0.5 bg-white block rounded-full"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 9 },
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-white block rounded-full"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-white block rounded-full"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -9 },
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="fixed top-0 right-0 w-4/5 max-w-xs h-full bg-gray-750/70 backdrop-blur-md z-50 lg:hidden shadow-xl"
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col space-y-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`p-3 flex items-center space-x-4 rounded-xl transition-all duration-300 ${
                          location.pathname === item.path
                            ? "bg-[#37abc8] text-[#072ac8] font-medium"
                            : "text-white hover:bg-[#1e96fc]/20"
                        }`}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-lg">{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Only show Register Now button in mobile menu when not on home page */}
                {!isHomePage && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-auto"
                  >
                    <button
                      onClick={handleRegisterClick}
                      className="block w-full py-3 bg-[#fcf300] text-[#072ac8] font-bold rounded-xl text-center hover:bg-[#ffc600] hover:shadow-lg hover:shadow-[#fcf300]/30 transition-all duration-300"
                    >
                      Register Now
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default AnimatedNavbar;
