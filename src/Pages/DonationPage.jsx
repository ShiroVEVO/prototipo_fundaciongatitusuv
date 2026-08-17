import { Navbar, Footer, CardContainer } from "../components/General"
import VolunteeringCard from "../components/VolunteeringCard"

import { DONATION_TYPES } from "../data"
/**
 * 
 * Props:
 * - image:      URL de la imagen (reemplaza el SVG embebido)
 * - imageAlt:   texto alternativo de la imagen (opcional, cae en `name`)
 * - bandText:   texto que se ve en la franja negra antes del hover
 * - name:       título mostrado en el hover (antes "Ethereum")
 * - category:   subtítulo mostrado en el hover (antes "Cryptocurrency")
 * - price:      precio mostrado en el hover
 */

const DonationPage = () => {
    return (
        <>
            <Navbar />
            <CardContainer>
                {DONATION_TYPES.map((donationType) => (
                    <VolunteeringCard
                        key={donationType.name}
                        volunteeringType={donationType}
                    />
                ))}
            </CardContainer>
            <Footer />
        </>
    )
}

export default DonationPage
