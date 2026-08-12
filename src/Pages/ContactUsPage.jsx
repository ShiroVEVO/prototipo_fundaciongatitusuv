import { BlobFrame, Footer, FormToMail, Navbar } from "../components/General"

import { BLOB_PATH_A, GOOGLE_MAPS_UBICATION } from "../data"

import "./ContactUsPage.css"

const ContactUsPage = () => {
    return (
        <>
            <Navbar />
            <section className="contact-us-page">
                <FormToMail title="Escríbenos" responseType="Contacto" forceType={true} onSuccess={() => { }} />
                <BlobFrame blobPath={BLOB_PATH_A}>
                    <iframe src={GOOGLE_MAPS_UBICATION} title="Ubicación" />
                </BlobFrame>
            </section>
            <Footer />
        </>
    )
}

export default ContactUsPage
