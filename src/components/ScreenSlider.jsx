import { useState, useEffect, useRef, useCallback } from "react";

import "./ScreenSlider.css";
/**
 * Slider fullscreen de fotos con info posicionable.
 *
 * Cada item del arreglo/JSON debe tener esta forma:
 * {
 *   "image": "https://...",
 *   "title": "Título de la foto",
 *   "info": "Texto corto descriptivo",
 *   "position": "center" | "bottom-left" | "bottom-right"
 * }
 *
 * Props:
 * - items: array de items (ver forma arriba). Si no se pasa, usa un demo de 4.
 * - autoPlayMs: intervalo de autoplay en ms (default 6000, 0 = desactivado)
 */
export default function ScreenSlider({ items = demoItems, autoPlayMs = 6000 }) {
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

            <div className="fss__ui">
                <span className="fss__count">
                    {pad(index)} <em>/</em> {pad(total - 1)}
                </span>

                <div className="fss__dashes">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            className={`fss__dash ${i === index ? "is-active" : ""}`}
                            onClick={() => goTo(i)}
                            aria-label={`Ir a la foto ${i + 1}`}
                            aria-current={i === index}
                            style={autoPlayMs ? { "--dash-dur": `${autoPlayMs}ms` } : undefined}
                        >
                            <span className="fss__dashFill" />
                        </button>
                    ))}
                </div>

                <div className="fss__arrows">
                    <button className="fss__arrow" onClick={prev} aria-label="Foto anterior">
                        ←
                    </button>
                    <button className="fss__arrow" onClick={next} aria-label="Foto siguiente">
                        →
                    </button>
                </div>
            </div>
        </div>
    );
}

// Demo / forma esperada del JSON de items
const demoItems = [
    {
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop",
        title: "Cordillera",
        info: "Amanecer sobre la cadena montañosa, 3.400 msnm.",
        position: "bottom-left",
    },
    {
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop",
        title: "Bosque nativo",
        info: "Luz filtrada entre los árboles al mediodía.",
        position: "center",
    },
    {
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1600&auto=format&fit=crop",
        title: "Costa",
        info: "Marea baja frente al acantilado sur.",
        position: "bottom-right",
    },
    {
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop",
        title: "Valle",
        info: "Niebla matinal cubriendo el valle bajo.",
        position: "bottom-left",
    },
];