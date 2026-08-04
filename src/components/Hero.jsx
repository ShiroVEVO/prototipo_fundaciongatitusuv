import React from "react";

/**
 * Banner principal a pantalla completa.
 * Muestra un video en loop (con imagen de respaldo si el navegador no puede reproducirlo
 * o mientras carga).
 */
const VIDEO_SRC = "././public/video/videoplayback.mp4";
const POSTER_SRC = "././public/img/backgroundExample.jpg";

export default function Hero() {
  return (
    <header className="hero">
      <video
        className="hero__media"
        autoPlay
        muted
        loop
        playsInline
        poster={POSTER_SRC}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__eyebrow">Catfeteria · Refugio · Adopción</p>
        <h1 className="hero__title">
          Donde cada maullido encuentra esperanza
          <br />
          y cada rescate tiene un nuevo comienzo
        </h1>
        <p className="hero__subtitle">
          Un hogar de paso, una taza de café y un gatito esperando encontrarte.
        </p>
        <div className="hero__actions">
          <a href="#rescate" className="btn btn--primary">
            Quiero adoptar
          </a>
          <a href="#cafeteria" className="btn btn--ghost">
            Conoce el café
          </a>
        </div>
      </div>

      <a href="#rescate" className="hero__scroll" aria-label="Bajar a la siguiente sección">
        <span />
      </a>
    </header>
  );
}
