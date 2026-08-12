import Navbar from '../components/General/NavBar/Navbar';
import Hero from "../components/Hero";
import RescueSection from "../components/RescueSection";
import CafeSection from "../components/CafeSection";
import HelpSection from "../components/HelpSection";
import Footer from "../components/General/Footer/Footer";

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
