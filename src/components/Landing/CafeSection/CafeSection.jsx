import { GOOGLE_MAPS_UBICATION } from "../../../data";

import "./CafeSection.css"

export default function CafeSection() {
  return (
    <section className="section cafe" id="cafeteria">
      <div className="cafe__col cafe__col--quote">
        <p className="eyebrow">El gatisario Cat-fetería</p>
        <p className="cafe__quote">
          Mucho más que un café de gatos:<br />
          experiencias, eventos y momentos que también cambian vidas.<br /><br />

          Descúbrelo aquí.
        </p>
        <a href="/cafeteria" className="btn btn--primary">
          Reserva tu mesa
        </a>
      </div>
      <div className="cafe__col cafe__col--map">
        <iframe
          className="cafe__map"
          src={GOOGLE_MAPS_UBICATION}
          title="Ubicación de El Gatisario Cat-fetería"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
