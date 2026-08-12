import { useState } from "react";

import { CATEGORY_STYLES } from "../data";

import "./ProductCard.css";



function ProductCard({ service, category, onReserve }) {
    const [flipped, setFlipped] = useState(false);
    const style = CATEGORY_STYLES[category.id];

    const toggleFlip = () => setFlipped((f) => !f);

    const handleReserveClick = (e) => {
        e.stopPropagation();
        onReserve(service);
    };

    return (
        <div
            className="gatitu-flip-card"
            onClick={toggleFlip}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleFlip();
                }
            }}
            aria-pressed={flipped}
            aria-label={`${service.title}. Click para ver qué incluye.`}
        >
            <div className={`gatitu-flip-inner ${flipped ? "is-flipped" : ""}`}>
                {/* ---------- FRENTE ---------- */}
                <div className="gatitu-flip-face gatitu-flip-front">
                    <div className="gatitu-card-image-wrap">
                        <img src={service.image} alt={service.title} className="gatitu-card-image" />
                        <span
                            className="gatitu-stamp"
                            style={{ background: style.accent, color: style.dark }}
                        >
                            {style.icon} {service.subtitle}
                        </span>
                    </div>

                    <div className="gatitu-perforation" aria-hidden="true">
                        {Array.from({ length: 16 }).map((_, i) => (
                            <span key={i} className="gatitu-perforation-dot" />
                        ))}
                    </div>

                    <div className="gatitu-card-body">
                        <p className="gatitu-card-kicker" style={{ color: style.accent }}>
                            {category.label}
                        </p>
                        <h3 className="gatitu-card-title">{service.title}</h3>
                        <p className="gatitu-card-price">{service.price}</p>

                        <button
                            type="button"
                            className="gatitu-reserve-btn"
                            style={{ background: style.accent, color: style.dark }}
                            onClick={handleReserveClick}
                        >
                            Reservar
                        </button>

                        <p className="gatitu-card-hint">Toca la tarjeta para ver qué incluye</p>
                    </div>
                </div>

                {/* ---------- REVERSO ---------- */}
                <div
                    className="gatitu-flip-face gatitu-flip-back"
                    style={{ background: style.dark }}
                >
                    <p className="gatitu-back-kicker" style={{ color: style.accent }}>
                        Incluye
                    </p>
                    <h3 className="gatitu-back-title">{service.title}</h3>
                    <ul className="gatitu-back-list">
                        {service.includes.map((item, i) => (
                            <li key={i}>
                                <span
                                    className="gatitu-back-dot"
                                    style={{ background: style.accent }}
                                    aria-hidden="true"
                                />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <button
                        type="button"
                        className="gatitu-reserve-btn gatitu-reserve-btn--back"
                        style={{ borderColor: style.accent, color: style.accent }}
                        onClick={handleReserveClick}
                    >
                        Reservar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard
