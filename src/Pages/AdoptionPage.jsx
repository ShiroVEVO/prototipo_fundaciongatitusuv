import { Navbar, Footer, CardContainer } from "../components/General"
import AdoptionCard from "../components/AdoptionCard"
import Hero from "../components/Hero"

import { INFO_CATS } from "../data"

const AdoptionPage = () => {
    return (
        <>
            <Navbar />
            <Hero />
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
