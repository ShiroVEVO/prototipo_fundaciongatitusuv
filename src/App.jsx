import React from "react";
import Hero from "./components/Hero";
import RescueSection from "./components/RescueSection";
import CafeSection from "./components/CafeSection";
import HelpSection from "./components/HelpSection";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./index.css";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <RescueSection />
      <CafeSection />
      <HelpSection />
      <Footer />
    </div>
  );
}
