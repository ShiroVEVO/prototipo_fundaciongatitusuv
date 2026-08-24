import { HelpCard } from "../../../components"

import "./HelpSection.css"

const WAYS_TO_HELP = [
  {
    title: "Apadrinar",
    href: "/apadrina",
    image: `img/Sponsorship.jpg`,
    titlePosition: "bottom",
  },
  {
    title: "Donaciones",
    href: "/dona",
    image: `img/Donation.jpg`,
    titlePosition: "top",
  },
  {
    title: "Voluntariado",
    href: "/voluntariado",
    image: `img/Volunteering.jpg`,
    titlePosition: "bottom",
  },
  {
    title: "Hogar de paso",
    href: "/hogar-de-paso",
    image: `img/TransitionalShelter.jpg`,
    titlePosition: "top",
  }
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
