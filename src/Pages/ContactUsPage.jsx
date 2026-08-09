import Footer from "../components/Footer/Footer"
import FormToGoogleForm from "../components/FormToGoogleForm"
import Navbar from "../components/NavBar/Navbar"
import BlobFrame from "../components/BlobFrame"

import "./ContactUsPage.css"

const MAP_EMBED_SRC =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2653.9207677082854!2d-74.0580090311468!3d4.702434022823972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b77e456fc37%3A0x6805eeecd164ed77!2sEl%20Gatisario%20Cat-feter%C3%ADa%20by%20Fundaci%C3%B3n%20Gatitus!5e0!3m2!1ses!2sco!4v1785726371665!5m2!1ses!2sco";

const ContactUsPage = () => {
    return (
        <>
            <Navbar />
            <section className="contact-us-page">
                <FormToGoogleForm title="Escríbenos" responseType="Contacto" forceType={true} onSuccess={() => { }} />
                <BlobFrame>
                    <iframe src={MAP_EMBED_SRC} title="Ubicación" />
                </BlobFrame>
            </section>
            <Footer />
        </>
    )
}

export default ContactUsPage
