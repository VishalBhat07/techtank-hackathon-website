import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});
  const registrationRef = useRef(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const scrollToRegistration = () => {
    registrationRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const variants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 50,
        duration: 0.8,
      },
    },
    hiddenLeft: { opacity: 0, x: -100 },
    hiddenRight: { opacity: 0, x: 100 },
  };

  const gridStyles = `
    .title-container {
      position: relative;
      z-index: 10;
    }
    .grid-behind-title {
      position: absolute;
      width: 180%;
      height: 450%;
      top: -170%;
      left: -38%;
      background-size: 40px 40px;
      background-image:
        linear-gradient(to right, rgba(171, 180, 185, 0.4) 2px, transparent 2px),
        linear-gradient(to bottom, rgba(160, 180, 180, 0.4) 2px, transparent 2px);
      transform: perspective(500px) rotateX(60deg);
      z-index: 1;
    }
    .registration-button {
      transition: all 0.3s ease;
    }
    .registration-button:hover {
      transform: translateY(-3px);
    }
    .premium-button {
      background: linear-gradient(135deg, #00b4db, #0083b0);
      border: none;
      position: relative;
      overflow: hidden;
    }
    .premium-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: all 0.5s ease;
    }
    .premium-button:hover::before {
      left: 100%;
    }
  `;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addSectionRef = (id) => (el) => {
    if (el) sectionRefs.current[id] = el;
  };

  const downloadBrochure = () => {
    const pdfUrl = "/TechTankRVCE_Brochure.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "TechTankRVCE_Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const judges = [
    {
      name: "Siddhant Goswami",
      title: "100xEngineers+",
      image: "/7.png",
    },
    {
      name: "Arshdeep Singh",
      title: "EDock",
      image: "/8.png",
    },
    {
      name: "Shivaram K R",
      title: "Hue Learn",
      image: "/9.png",
    },
    {
      name: "Sriharsha Donthi",
      title: "Oracle",
      image: "/10.png",
    },
    {
      name: "Raghu Sarangajan",
      title: "Cubyts",
      image: "/11.png",
    },
    {
      name: "Kartik Sirigeri",
      title: "OpenText",
      image: "/12.png",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <style dangerouslySetInnerHTML={{ __html: gridStyles }} />

      {/* Hero Section */}
      <div
        className="flex flex-col items-center justify-center bg-black text-white text-center px-4 relative"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        {/* LOGOS */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-14">
          <img
            src="/rvce.png"
            alt="RVCE"
            className="h-16 w-auto sm:h-20 md:h-28 lg:h-32 object-contain"
          />
          <img
            src="/acm.png"
            alt="ACM RVCE"
            className="h-16 w-auto sm:h-20 md:h-28 lg:h-32 object-contain"
          />
          <img
            src="/gdg.png"
            alt="Google Developer Group"
            className="h-16 w-auto sm:h-20 md:h-28 lg:h-32 object-contain"
          />
        </div>

        {/* Title Section */}
        <div className="title-container relative">
          <div className="grid-behind-title"></div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-wide drop-shadow-lg relative z-10">
            <span className="text-cyan-400">tech</span>
            <span className="text-yellow-400 relative">
              TAN
              <span className="bite-effect">K</span>
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="mt-3 text-base sm:text-lg md:text-xl text-gray-300 italic">
          A Shark Tank Inspired
        </p>
        <p className="text-lg sm:text-xl md:text-2xl font-semibold mt-1 mb-8">
          12-Hour Hackathon
        </p>

        {/* Download Brochure Button with Flowing Gradient */}
        <motion.button
          onClick={downloadBrochure}
          className="relative overflow-hidden px-6 py-3 rounded-full font-bold text-lg mb-8 group"
          style={{
            boxShadow: "0 4px 15px rgba(56, 170, 201, 0.4)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated Gradient Background */}
          <span className="absolute inset-0 bg-gradient-to-r from-[#38AAC9] via-[#E4CD15] to-[#38AAC9] bg-[length:200%_100%] animate-gradient-flow"></span>

          {/* Content */}
          <span className="relative z-10 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Download Brochure
          </span>

          {/* Add this to your global CSS or CSS module */}
          <style jsx>{`
            @keyframes gradientFlow {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
            .animate-gradient-flow {
              animation: gradientFlow 3s ease infinite;
            }
          `}</style>
        </motion.button>

        {/* Scroll Down Arrow */}
        <motion.div
          className="absolute bottom-12 flex flex-col items-center cursor-pointer"
          onClick={scrollToRegistration}
        >
          {/* Animated Color Bars */}
          <div className="flex items-center justify-center gap-4 w-full mb-2">
            <motion.div
              className="h-1 w-16 rounded-full"
              style={{ backgroundColor: "#38AAC9" }}
              initial={{ scaleX: 0.5, originX: 1 }}
              animate={{
                scaleX: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="h-1 w-16 rounded-full"
              style={{ backgroundColor: "#E4CD15" }}
              initial={{ scaleX: 0.5, originX: 0 }}
              animate={{
                scaleX: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </div>

          {/* Simple White Arrow */}
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Who Can Participate Section */}
      <section
        id="who-can-participate"
        ref={addSectionRef("who-can-participate")}
        className={`py-10 px-4 ${
          isVisible["who-can-participate"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        } transition-all duration-1000 ease-out`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-[#E4CD15] inline-block relative">
            About
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
          </h2>

          <div className="grid grid-cols-1  gap-8">
            <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
              <p>
                TechTank is a Shark Tank-inspired 12-hour hackathon hosted by
                the RVCE ACM Student Chapter and Google Developer Groups (GDG)
                RVCE. Designed to bridge the gap between technical expertise and
                business acumen, TechTank empowers students to build solutions
                that are not only technically sound but also market-ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Judges Section */}
      <section
        id="judges"
        ref={addSectionRef("judges")}
        className={`py-10 px-4 ${
          isVisible["judges"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        } transition-all duration-1000 ease-out`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-[#E4CD15] inline-block relative">
            Meet Your Judges
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Siddhant Goswami",
                title: "Co-Founder & CTO",
                company: "100xEngineers+",
                image: "/7.png",
                linkedin: "siddhant-goswami-6444b0146/",
              },
              {
                name: "Arshdeep Singh",
                title: "Founder & CEO",
                company: "EDock",
                image: "/8.png",
                linkedin: "065rsh",
              },
              {
                name: "Shivaram K R",
                title: "Co-Founder & CEO",
                company: "Hue Learn",
                image: "/9.png",
                linkedin: "shivaramkrs",
              },
              {
                name: "Sriharsha Donthi",
                title: "Cloud Engineering Director",
                company: "Oracle",
                image: "/10.png",
                linkedin: "sriharshadonthi",
              },
              {
                name: "Raghu Sarangarajan",
                title: "Co-Founder & CTPO",
                company: "Cubyts",
                image: "/11.png",
                linkedin: "raghusarangarajan",
              },
              {
                name: "Kartik Sirigeri",
                title: "Expert",
                company: "OpenText",
                image: "/12.png",
                linkedin: "kartik-sirigeri-5b433816/",
              },
            ].map((judge, index) => (
              <motion.div
                key={judge.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible["judges"] ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="bg-[#1a1a1a] p-6 rounded-lg border border-[#38AAC9]/30 hover:border-[#E4CD15] transition-all duration-300 flex flex-col items-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#38AAC9] relative group">
                  <img
                    src={judge.image}
                    alt={judge.name}
                    className="w-full h-full object-cover"
                  />
                  <a
                    href={`https://www.linkedin.com/in/${judge.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <svg
                      className="w-8 h-8 text-[#38AAC9]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
                <h3 className="text-xl font-bold text-center text-[#E4CD15]">
                  {judge.name}
                </h3>
                <p className="text-center text-[#38AAC9] mb-2">{judge.title}</p>
                <p className="text-center text-white">{judge.company}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Section */}
      <section
        id="workshop"
        ref={addSectionRef("workshop")}
        className={`py-10 px-4 ${
          isVisible["workshop"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        } transition-all duration-1000 ease-out`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Title with Underline */}
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-[#E4CD15] inline-block relative">
            Pre-Hackathon Workshop
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
          </h2>

          {/* Workshop Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible["workshop"] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-r from-[#38AAC9]/10 to-[#E4CD15]/10 p-8 rounded-xl border-l-4 border-[#38AAC9] shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Speaker Profile */}
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <div className="relative group mb-4">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#38AAC9] relative group">
                    <img
                      src="/21.jpg"
                      alt="Utsav Singhal"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23E4CD15' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'%3E%3C/path%3E%3C/svg%3E";
                      }}
                    />
                    <a
                      href="https://www.linkedin.com/in/utsav-singhal-986812179/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <svg
                        className="w-8 h-8 text-[#38AAC9]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#E4CD15]">
                    Utsav Singhal
                  </h3>
                  <p className="text-[#38AAC9]">
                    Co-Founder, Stealth AI Startup
                  </p>
                  <p className="text-white">IIT Delhi Alumnus</p>
                </div>
              </div>

              {/* Workshop Content */}
              <div className="w-full md:w-2/3">
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    "Building Scalable Tech Products & Services for B2B & B2C"
                  </h2>
                  <p className="text-lg text-gray-300">
                    Join our exclusive workshop with{" "}
                    <span className="font-semibold text-[#E4CD15]">
                      Utsav Singhal
                    </span>{" "}
                    to gain practical insights from real-world startup
                    experiences and learn how to build robust, high-impact
                    technology solutions that scale.
                  </p>
                </div>

                {/* Practical Info */}
                <div className="bg-[#1a1a1a]/80 p-4 rounded-lg border border-[#38AAC9]/30">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-semibold text-[#E4CD15]">
                        Date & Time
                      </h4>
                      <p className="text-white">April 7, 2025</p>
                      <p className="text-gray-300">9:00 AM - 2:00 PM</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-[#E4CD15]">
                        Venue
                      </h4>
                      <p className="text-white">IEM Auditorium</p>
                      <p className="text-gray-300">RVCE Campus</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Join Section */}
      <section
        id="why-join"
        ref={addSectionRef("why-join")}
        className={`py-20 px-4 ${
          isVisible["why-join"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        } transition-all duration-1000 ease-out`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[#E4CD15] inline-block relative">
            Why Participate?
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
              <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                Cash Prizes
              </h3>
              <p>Win exciting cash prizes for top teams</p>
            </div>

            <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
              <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                Certificates
              </h3>
              <p>Earn participation certificates with ACM and GDG logos</p>
            </div>

            <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
              <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                Activity Points
              </h3>
              <p>Eligible for 8 activity points (RVCE students)</p>
            </div>

            <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
              <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                Networking
              </h3>
              <p>Connect with industry experts and like-minded peers</p>
            </div>

            <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
              <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                Skill Development
              </h3>
              <p>Enhance technical, business, and presentation skills</p>
            </div>

            <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
              <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                Startup Potential
              </h3>
              <p>Get funded to turn your idea into a real business</p>
            </div>
          </div>
        </div>{" "}
      </section>

      {/* Registration Section */}
      <section
        id="register"
        ref={(el) => {
          addSectionRef("register")(el);
          registrationRef.current = el;
        }}
        className={`py-20 px-4 relative flex items-center ${
          isVisible["register"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        } transition-all duration-1000 ease-out`}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          className="max-w-6xl mx-auto w-full"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-16 text-[#E4CD15] inline-block relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.2 },
            }}
          >
            REGISTER NOW
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Enhanced Hackathon Card */}
            <motion.div
              className="bg-[#38AAC9]/10 p-8 rounded-lg text-center transform transition-all duration-300 hover:scale-105 border-2 border-[#38AAC9] shadow-lg shadow-[#38AAC9]/20 relative"
              initial="hiddenLeft"
              animate="visible"
              variants={variants}
              transition={{ delay: 0.3 }}
            >
              <div className="absolute -top-3 -right-3 bg-[#E4CD15] text-black px-3 py-1 rounded-full text-sm font-bold transform rotate-6">
                EARLY BIRD OFFER
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-[#38AAC9]">
                Overnight Hackathon
              </h3>
              <p className="mb-4 text-lg">Team of 2-4 members</p>
              <div className="text-4xl font-bold mb-6 text-[#E4CD15]">₹399</div>
              <p className="mb-6 text-lg">
                Includes free workshop for all team members
              </p>
              <button
                onClick={() => navigate("/hackathon")}
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#38AAC9] to-[#2e8db0] hover:from-[#E4CD15] hover:to-[#d4be14] hover:text-black font-bold rounded-full transition-all duration-300 text-lg"
              >
                Register Team
              </button>
            </motion.div>

            {/* Workshop Card */}
            <motion.div
              className="bg-[#38AAC9]/10 p-6 rounded-lg text-center transform transition-all duration-300 hover:scale-103 border border-[#38AAC9]/30"
              initial="hiddenRight"
              animate="visible"
              variants={variants}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-2 text-[#38AAC9]">
                Workshop
              </h3>
              <p className="mb-4">Individual participation</p>
              <div className="text-3xl font-bold mb-6 text-[#E4CD15]">₹99</div>
              <p className="mb-6">Single Entry for the workshop</p>
              <button
                onClick={() => navigate("/workshop")}
                className="inline-block px-6 py-3 bg-[#38AAC9] hover:bg-[#E4CD15] hover:text-black font-bold rounded-full transition-all duration-300"
              >
                Register for Workshop
              </button>
            </motion.div>
          </div>

          <div className="mt-12 p-6 bg-[#E4CD15]/10 border-l-4 border-[#E4CD15] rounded-r-lg">
            <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
              Important Notes:
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-[#38AAC9] text-xl mr-2">•</span>
                <p>Open to all UG & PG students across all courses in India.</p>
              </li>
              <li className="flex items-start">
                <span className="text-[#38AAC9] text-xl mr-2">•</span>
                <p>
                  The team leaders will recieve a confirmation mail with a link
                  to a whatsapp group. Only Team Leaders must join that group.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-[#38AAC9] text-xl mr-2">•</span>
                <p>
                  The 6 slide template for Round 1 will be shared in that group.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-[#38AAC9] text-xl mr-2">•</span>
                <p>Registrations will close on 8th April, 11:59 PM.</p>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6 text-[#E4CD15] inline-block relative">
              CONTACT US
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#38AAC9] -mb-1"></span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-[#38AAC9]/10 p-6 rounded-lg border border-[#38AAC9]/30 flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="w-8 h-8 mr-3"
                  />
                  <div>
                    <h4 className="font-bold text-lg text-[#38AAC9]">
                      Priyansh Rajiv Dhotar
                    </h4>
                    <a
                      href="https://wa.me/917676433089"
                      className="text-white hover:text-[#E4CD15] transition-colors"
                    >
                      +91 76764 33089
                    </a>
                  </div>
                </div>
                <a
                  href="mailto:priyanshrajivd.cs22@rvce.edu.in"
                  className="text-sm text-white hover:text-[#E4CD15] transition-colors hidden md:block"
                >
                  priyanshrajivd.cs22@rvce.edu.in
                </a>
              </div>

              <div className="bg-[#38AAC9]/10 p-6 rounded-lg border border-[#38AAC9]/30 flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="w-8 h-8 mr-3"
                  />
                  <div>
                    <h4 className="font-bold text-lg text-[#38AAC9]">
                      Aryan Rai
                    </h4>
                    <a
                      href="https://wa.me/918217040275"
                      className="text-white hover:text-[#E4CD15] transition-colors"
                    >
                      +91 82170 40275
                    </a>
                  </div>
                </div>
                <a
                  href="mailto:aryanrai.cs23@rvce.edu.in"
                  className="text-sm text-white hover:text-[#E4CD15] transition-colors hidden md:block"
                >
                  aryanrai.cs23@rvce.edu.in
                </a>
              </div>
            </div>

            {/* Mobile email links (shown only on small screens) */}
            <div className="grid grid-cols-1 gap-4 mt-4 md:hidden">
              <a
                href="mailto:priyanshrajivd.cs22@rvce.edu.in"
                className="text-sm text-white hover:text-[#E4CD15] transition-colors text-center"
              >
                priyanshrajivd.cs22@rvce.edu.in
              </a>
              <a
                href="mailto:aryanrai.cs23@rvce.edu.in"
                className="text-sm text-white hover:text-[#E4CD15] transition-colors text-center"
              >
                aryanrai.cs23@rvce.edu.in
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="py-8 border-t border-[#38AAC9]/30 text-center mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <p>© 2025 Tech Tank | RVCE ACM Student Chapter & GDG RVCE</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default About;
