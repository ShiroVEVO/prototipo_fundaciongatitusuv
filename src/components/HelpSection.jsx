import React from "react";
import HelpCard from "./HelpCard";

const WAYS_TO_HELP = [
  {
    title: "Hogar de paso",
    href: "/hogar-de-paso",
    image: `${import.meta.env.BASE_URL}img/TransitionalShelter.jpg`,
    titlePosition: "top",
  },
  {
    title: "Voluntariado",
    href: "/voluntariado",
    image: `${import.meta.env.BASE_URL}img/Volunteering.jpg`,
    titlePosition: "bottom",
  },
  {
    title: "Donaciones",
    href: "/donar",
    image: `${import.meta.env.BASE_URL}img/Donation.jpg`,
    titlePosition: "top",
  },
  {
    title: "Apadrinar",
    href: "/apadrinar",
    image: `${import.meta.env.BASE_URL}img/Sponsorship.jpg`,
    titlePosition: "bottom",
  },
];

export default function HelpSection() {
  return (
    <section className="section help" id="ayudar">
      <div className="section__header">
        <p className="eyebrow">Sin adoptar, también se ayuda</p>
        <h2 className="section__title">Otras formas de cambiar una vida</h2>
      </div>

      <div className="help__grid">
        {WAYS_TO_HELP.map((way) => (
          <HelpCard key={way.title} {...way} />
        ))}
      </div>
    </section>
  );
}
