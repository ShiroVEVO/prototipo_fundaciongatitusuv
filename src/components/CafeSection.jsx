import React from "react";

/**
 * Reemplaza MAP_EMBED_SRC por el "Embed a map" que te da Google Maps
 * (Compartir > Insertar un mapa > copiar el src del iframe).
 */
const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2653.9207677082854!2d-74.0580090311468!3d4.702434022823972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b77e456fc37%3A0x6805eeecd164ed77!2sEl%20Gatisario%20Cat-feter%C3%ADa%20by%20Fundaci%C3%B3n%20Gatitus!5e0!3m2!1ses!2sco!4v1785726371665!5m2!1ses!2sco";

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
          src={MAP_EMBED_SRC}
          title="Ubicación de El Gatisario Cat-fetería"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
