import { useState, useEffect, useRef, useCallback } from "react";

import { SLIDER_ITEMS } from "../../../data";

import "./ScreenSlider.css";



export default function ScreenSlider({ items = SLIDER_ITEMS, autoPlayMs = 6000 }) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const total = items.length;
    const timerRef = useRef(null);

    const goTo = useCallback(
        (i) => setIndex(((i % total) + total) % total),
        [total]
    );
    const next = useCallback(() => goTo(index + 1), [goTo, index]);
    const prev = useCallback(() => goTo(index - 1), [goTo, index]);

    // Autoplay
    useEffect(() => {
        if (!autoPlayMs || paused) return;
        timerRef.current = setTimeout(next, autoPlayMs);
        return () => clearTimeout(timerRef.current);
    }, [index, paused, autoPlayMs, next]);

    // Teclado
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [next, prev]);

    const pad = (n) => String(n + 1).padStart(2, "0");

    return (
        <div
            className="fss"
            role="region"
            aria-roledescription="carrusel"
            aria-label="Galería de fotos"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {items.map((item, i) => (
                <figure
                    key={item.image + i}
                    className={`fss__slide ${i === index ? "is-active" : ""}`}
                    aria-hidden={i !== index}
                >
                    <img className="fss__img" src={item.image} alt={item.title || ""} />
                    <div className="fss__scrim" />
                    <figcaption className={`fss__caption fss__caption--${item.position || "bottom-left"}`}>
                        {item.title && <h2 className="fss__title">{item.title}</h2>}
                        {item.info && <p className="fss__info">{item.info}</p>}
                    </figcaption>
                </figure>
            ))}

            <button className="fss__arrow fss__arrow--prev" onClick={prev} aria-label="Foto anterior" />
            <button className="fss__arrow fss__arrow--next" onClick={next} aria-label="Foto siguiente" />

            <div className="fss__ui">
                <div className="fss__dots">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            className={`fss__dot ${i === index ? "is-active" : ""}`}
                            onClick={() => goTo(i)}
                            aria-label={`Ir a la foto ${i + 1}`}
                            aria-current={i === index}
                            style={autoPlayMs ? { "--dash-dur": `${autoPlayMs}ms` } : undefined}
                        >
                            <span className="fss__dotRing" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}