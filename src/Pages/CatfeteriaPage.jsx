import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import ScreenSlider from "../components/ScreenSlider";
import ParallaxSection from "../components/ParallaxSection";

const CatfeteriaPage = () => {
    return (
        <>
            <Navbar />
            <ScreenSlider />
            <ParallaxSection img="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop" text="Bienvenido a la Catfeteria" />
            <Footer />
        </>
    )
}

export default CatfeteriaPage
