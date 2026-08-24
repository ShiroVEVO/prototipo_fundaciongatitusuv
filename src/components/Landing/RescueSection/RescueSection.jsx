import { Link } from "react-router-dom";

import { InfiniteCarousel, StatsCounter, CatCard } from "../../../components"

import { CATS } from "../../../data";

import "./RescueSection.css"

export default function RescueSection() {
  return (
    <section className="section rescue" id="rescate">
      <section id="rescute_content">
        <div className="section__header">
          <p className="eyebrow">Nuestra Labor</p>
          <h2 className="section__title">Números que se sienten en cada cola feliz</h2>
        </div>

        <div className="stats">
          <StatsCounter value={10} label="gatitos esperando hogar" />
          <StatsCounter value={50} label="gatitos en su nuevo hogar" suffix="+" />
          <StatsCounter value={9} label="Años salvando vidas" />
        </div>

        <div className="rescue__carousel-header">
          <h3>Buscan un hogar</h3>
          <Link to="/adopta" className="link-arrow">
            Ver todos los adoptables →
          </Link>
        </div>

        <InfiniteCarousel
          items={CATS}
          getKey={(cat) => cat.id}
          ariaLabel="Gatos disponibles para adopción"
          speed={25}
          renderItem={(cat) => <CatCard cat={cat} />}
        />
      </section>

    </section>
  );
}
