import React from 'react';
import Navbar from '../components/NavBar/Navbar';
import Hero from "../components/Hero";
import RescueSection from "../components/RescueSection";
import CafeSection from "../components/CafeSection";
import HelpSection from "../components/HelpSection";
import Footer from "../components/Footer/Footer";

const LadingPage = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <RescueSection />
            <CafeSection />
            <HelpSection />
            <Footer />
        </>
    )
}

export default LadingPage
