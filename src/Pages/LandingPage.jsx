import { Link } from 'react-router-dom';

import { Footer, Navbar, Hero, RescueSection, CafeSection, HelpSection } from '../components';

const LadingPage = () => {
    return (
        <>
            <Navbar />
            <Hero eyebrow="Catfeteria · Refugio · Adopción"
                title="Donde cada maullido encuentra esperanza y cada rescate tiene un nuevo comienzo"
                subtitle="Un hogar de paso, una taza de café y un gatito esperando encontrarte."
                VIDEO_SRC="video/videoLanding.mp4" POSTER_SRC="img/backgroundExample.jpg">
                <Link to="/adopta" className="btn btn--primary">
                    Quiero adoptar
                </Link>
                <Link to="/catfeteria" className="btn btn--ghost">
                    Conoce el café
                </Link>
            </Hero >
            <RescueSection />
            <CafeSection />
            <HelpSection />
            <Footer />
        </>
    )
}

export default LadingPage
