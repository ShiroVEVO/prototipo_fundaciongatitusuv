import React from "react";
import CatCard from "./CatCard";
import cats from "../data/cats";

/**
 * Carrusel infinito: duplica la lista de gatos y anima con CSS (translateX)
 * en loop continuo. El track se pausa al hacer hover para poder mirar con calma.
 */
export default function CatCarousel() {
  const track = [...cats, ...cats, ...cats];

  return (
    <div className="carousel" role="region" aria-label="Gatos disponibles para adopción">
      <div className="carousel__track">
        {track.map((cat, i) => (
          <CatCard cat={cat} key={`${cat.id}-${i}`} />
        ))}
      </div>
    </div>
  );
}
