import "./Hero.css"

/**
 * Banner principal a pantalla completa.
 * Muestra un video en loop (con imagen de respaldo si el navegador no puede reproducirlo
 * o mientras carga).
 */
// const VIDEO_SRC = "video/videoLanding.mp4";
// const POSTER_SRC = "img/backgroundExample.jpg";

export default function Hero({ eyebrow, title, subtitle, VIDEO_SRC, POSTER_SRC, children }) {
  return (
    <header className="hero">
      <video
        className="hero__media"
        autoPlay
        muted
        loop
        playsInline
        poster={import.meta.env.BASE_URL + POSTER_SRC}
      >
        <source src={import.meta.env.BASE_URL + VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__eyebrow">{eyebrow}</p>
        <h1 className="hero__title">
          {title}
        </h1>
        <p className="hero__subtitle">
          {subtitle}
        </p>
        <div className="hero__actions">
          {children}
        </div>
      </div>

      <a className="hero__scroll" aria-label="Bajar a la siguiente sección">
        <span />
      </a>
    </header>
  );
}
