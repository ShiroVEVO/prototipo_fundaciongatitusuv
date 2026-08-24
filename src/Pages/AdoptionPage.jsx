import { Link } from "react-router-dom"

import { Navbar, Footer, CardContainer, TextHeader, Hero, AdoptionCard } from "../components"

import { INFO_CATS } from "../data"

const AdoptionPage = () => {
    return (
        <>
            <Navbar />
            <Hero eyebrow="XXX" title="title" subtitle="subtitle" VIDEO_SRC="video/videoLanding.mp4" POSTER_SRC="img/backgroundExample.jpg">
                <Link to="/match" className="btn btn--primary">
                    Encuentra tu gatitu
                </Link>
                <Link to="https://wa.link/xh7dax" className="btn btn--primary">
                    Adopta ahora
                </Link>
            </Hero>
            <TextHeader eyebrow="conoce a todos" title="NUESTROS GATITUS" subtitle="disponibles para adopción inmediata" />
            <CardContainer isFirstSection={false}>
                {INFO_CATS.map((cat) => (
                    <AdoptionCard cat={cat} />
                ))}
            </CardContainer>
            <Footer />
        </>
    )
}

export default AdoptionPage
