import React from "react";
import "./index.css";
import LadingPage from "./Pages/LandingPage.jsx";
import AboutUsPage from "./Pages/AboutUsPage.jsx";
import ContactUsPage from "./Pages/ContactUsPage.jsx";
import CatfeteriaPage from "./Pages/CatfeteriaPage.jsx";
import SponsorPage from "./Pages/SponsorPage.jsx";
import VolunteeringPage from "./Pages/VolunteeringPage.jsx";
import AdoptionPage from "./Pages/AdoptionPage.jsx";
import DonationPage from "./Pages/DonationPage.jsx"
import { HashRouter, Route, Routes } from "react-router-dom";
import AdoptionFormPage from "./Pages/AdoptionFormPage.jsx";


export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LadingPage />} />
        <Route path="/catfeteria" element={<CatfeteriaPage />} />

        <Route path="/adopta" element={<AdoptionPage />} />

        <Route path="/apadrina" element={<SponsorPage />} />
        <Route path="/dona" element={<DonationPage />} />
        <Route path="/voluntariado" element={<VolunteeringPage />} />
        {/* <Route path="/hogar-de-paso" element={<ShelterPage />} /> */}
        <Route path="/formulario-adopcion" element={<AdoptionFormPage />} />
        <Route path="/nosotros" element={<AboutUsPage />} />
        <Route path="/contacto" element={<ContactUsPage />} />
      </Routes>
    </HashRouter>
  );
}
