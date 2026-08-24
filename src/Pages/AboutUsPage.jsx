import { Navbar, Footer, Infographic } from "../components"

import { ABOUT_US_DATA } from "../data"

const AboutUsPage = () => {
    return (
        <>
            <Navbar />
            <Infographic ITEMS={ABOUT_US_DATA} />
            <Footer />
        </>
    )
}

export default AboutUsPage
