import React from "react";

export default function CatCard({ cat }) {
  return (
    <article className="cat-card">
      <div className="cat-card__photo-wrap">
        <img src={import.meta.env.BASE_URL + cat.photo} alt={cat.name} className="cat-card__photo" loading="lazy" />
      </div>
      <div className="cat-card__info">
        <h3 className="cat-card__name">{cat.name}</h3>
        <span className="cat-card__age">{cat.age}</span>
      </div>
    </article>
  );
}
