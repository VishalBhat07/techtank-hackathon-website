import React, { useEffect, useRef, useState } from "react";

const Timeline = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const timelineEvents = [
    {
      title: "Pre-Hack Workshop",
      date: "April 7, 2025 (9:00 AM - 2 PM)",
      description: () => (
        <>
          Learn how to 'Build Scalable Tech Products/Services for B2B & B2C' in
          our workshop led by industry experts from EDock.
          <br />
          Venue: IEM Auditorium, RVCE.
        </>
      ),
      highlight: true,
    },
    {
      title: "Online Ideation Round 1 Submission",
      date: "April 7 (5 PM) - April 9 (5 PM), 2025",
      description: () => (
        <>
          Submit your Tech Tank idea online in 6 slides on the website:{" "}
          <a href="https://www.techtankrvce.com">techtankrvce.com</a>
        </>
      ),
    },
    {
      title: "Round 1 Results Announcement",
      date: "April 11, 2025 (5 PM)",
      description: "Shortlisted teams will move to Round 2 (Hackathon)",
    },
    {
      title: "12-Hour Hackathon (Round 2)",
      date: "April 11 (8 PM) - April 12 (8 AM), 2025",
      description: () => (
        <>
          Tech Tankers build their projects overnight.
          <br />
          Venue: Design Thinking Huddle (DTH), RVCE.
        </>
      ),
    },
    {
      title: "Final Pitch to Investors & Judges",
      date: "April 12, 2025 (10 AM - 2 PM)",
      description:
        "Present your project to investors and mentors from industry.",
    },
    {
      title: "Final Results Announcement",
      date: "April 12, 2025 (2 PM)",
      description: "Winners will be declared!",
    },
  ];

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className={`py-20 px-4 bg-black ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } transition-all duration-1000 ease-out`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-[#E4CD15] inline-block relative">
          Event Timeline
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
        </h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 w-1 h-full bg-[#38AAC9]"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className="relative pl-16"
                style={{
                  animation: `fade-in-up 0.8s ${0.2 + index * 0.2}s both`,
                  opacity: 0,
                }}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-4 top-0 w-8 h-8 ${
                    event.highlight ? "bg-[#E4CD15]" : "bg-[#38AAC9]"
                  } rounded-full transform -translate-x-1/2 z-10`}
                ></div>

                {/* Timeline Content */}
                <div
                  className={`p-6 ${
                    event.highlight
                      ? "bg-[#E4CD15]/10 border-[#E4CD15]"
                      : "bg-[#38AAC9]/10 border-[#38AAC9]"
                  } rounded-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg ${
                    event.highlight
                      ? "hover:shadow-[#E4CD15]/30"
                      : "hover:shadow-[#38AAC9]/30"
                  } border-l-4`}
                >
                  <div
                    className={`${
                      event.highlight ? "text-[#38AAC9]" : "text-[#E4CD15]"
                    } font-bold mb-2`}
                  >
                    {event.date}
                  </div>
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      event.highlight ? "text-[#E4CD15]" : "text-[#38AAC9]"
                    }`}
                  >
                    {event.title}
                  </h3>
                  <p className="text-white">
                    {typeof event.description === "function"
                      ? event.description()
                      : event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
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
    </section>
  );
};

export default Timeline;
