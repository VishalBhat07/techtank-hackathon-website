// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Timeline from "./pages/Timeline";
import SubmitIdea from "./pages/SubmitIdea";
import About from "./pages/About";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
        {" "}
        {/* Add padding-top equal to navbar height */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/submit" element={<SubmitIdea />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
