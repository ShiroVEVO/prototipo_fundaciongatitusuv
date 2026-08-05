import React from "react";

/**
 * `titlePosition` alterna entre "top" y "bottom" para crear el efecto
 * intercalado que pidió el brief entre las 4 tarjetas de la sección.
 */
export default function HelpCard({ image, title, href, titlePosition }) {
  return (
    <a href={href} className={`help-card help-card--title-${titlePosition}`}>
      {titlePosition === "top" && <span className="help-card__title">{title}</span>}

      <div className="help-card__image-wrap">
        <img src={import.meta.env.BASE_URL + image} alt="" className="help-card__image" loading="lazy" />
      </div>

      {titlePosition === "bottom" && <span className="help-card__title">{title}</span>}
    </a>
  );
}
