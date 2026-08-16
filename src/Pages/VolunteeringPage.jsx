import { Navbar, Footer, CardContainer } from "../components/General"
import VolunteeringCard from "../components/VolunteeringCard"

import { VOLUNTEERING_TYPES } from "../data"

const VolunteeringPage = () => {
    return (
        <>
            <Navbar />
            <CardContainer isFirstSection={true}>
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
