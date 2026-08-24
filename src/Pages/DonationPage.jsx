import { Navbar, Footer, CardContainer, PaymentCard, TextHeader, VolunteeringCard } from "../components"

import { DONATION_TYPES, PAYMENT_METHODS } from "../data"
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
            <TextHeader eyebrow="ayudanos con tu" title="DONACIÓN EN ESPECIE" subtitle="por medio de:" isFirstSection={true} />
            <CardContainer>
                {DONATION_TYPES.map((donationType) => (
                    <VolunteeringCard
                        key={donationType.name}
                        volunteeringType={donationType}
                    />
                ))}
            </CardContainer>
            <TextHeader eyebrow="Tambien recibimos" title="DONACIÓNES MONETARIAS" />
            <CardContainer>
                {PAYMENT_METHODS.map((paymentMethod) => (
                    <PaymentCard
                        key={paymentMethod.id}
                        paymentMethod={paymentMethod}
                    />
                ))}
            </CardContainer>
            <Footer />
        </>
    )
}

export default DonationPage
