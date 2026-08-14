import React from "react";
import "./index.css";
import LadingPage from "./Pages/LandingPage.jsx";
import AboutUsPage from "./Pages/AboutUsPage.jsx";
import ContactUsPage from "./Pages/ContactUsPage.jsx";
import CatfeteriaPage from "./Pages/CatfeteriaPage.jsx";
import SponsorPage from "./Pages/SponsorPage.jsx";

import { HashRouter, Route, Routes } from "react-router-dom";


export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LadingPage />} />
        <Route path="/nosotros" element={<AboutUsPage />} />
        <Route path="/contacto" element={<ContactUsPage />} />
        <Route path="/catfeteria" element={<CatfeteriaPage />} />
        <Route path="/apadrina" element={<SponsorPage />} />
        {/* 
        <Route path="/ayudar" element={<HelpPage/>}/>
        */}
      </Routes>
    </HashRouter>
  );
}
