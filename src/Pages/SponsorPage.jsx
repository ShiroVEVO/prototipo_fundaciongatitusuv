import { Navbar, Footer } from "../components/General";
import SponsorGrid from "../components/SponsorGrid";

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
