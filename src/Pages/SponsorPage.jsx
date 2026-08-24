import { Navbar, Footer, SponsorGrid } from "../components";

import { GENERAL_BENEFITS, DEFAULT_TIERS } from "../data";

const SponsorPage = () => {
    return (
        <>
            <Navbar />
            <SponsorGrid tiers={DEFAULT_TIERS} GENERAL_BENEFITS={GENERAL_BENEFITS} />
            <Footer />
        </>
    )
}

export default SponsorPage
