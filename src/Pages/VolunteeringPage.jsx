// import { Navbar, Footer, CardContainer, TextHeader } from "../components/General"
//import VolunteeringCard from "../components/Volunteering/VolunteeringCard"

import { Navbar, Footer, CardContainer, TextHeader, VolunteeringCard } from "../components"

import { VOLUNTEERING_TYPES } from "../data"

const VolunteeringPage = () => {
    return (
        <>
            <Navbar />
            <TextHeader isFirstSection={true} eyebrow="Conoce todos los " title="VOLUNTARIADOS" subtitle="y danos una pata para ayudar gatitus" />
            <CardContainer>
                {VOLUNTEERING_TYPES.map((volunteeringType) => (
                    <VolunteeringCard
                        key={volunteeringType.name}
                        volunteeringType={volunteeringType}
                    />
                ))}
            </CardContainer>
            <Footer />
        </>
    )
}

export default VolunteeringPage
