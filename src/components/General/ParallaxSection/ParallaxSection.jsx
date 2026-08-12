import { useRef, useEffect } from "react";

import "./ParallaxSection.css";
/**
 * Sección fullwidth con imagen de fondo en parallax + cuadro central de texto.
 *
 * Props:
 * - image: url de la imagen de fondo (requerido)
 * - text: texto informativo corto que va dentro del cuadro central
 * - height: alto de la sección, ej. "80vh" (default "100vh")
 * - speed: intensidad del parallax, 0 = sin movimiento, 1 = movimiento fuerte (default 0.35)
 */
export default function ParallaxSection({
    image,
    text = "",
    height = "100vh",
    speed = 0.35,
}) {
    const sectionRef = useRef(null);
    const imgRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const img = imgRef.current;
        if (!section || !img) return;

        const update = () => {
            const rect = section.getBoundingClientRect();
            const viewportH = window.innerHeight;

            if (rect.bottom >= 0 && rect.top <= viewportH) {
                const progress = (rect.top - viewportH / 2 + rect.height / 2) / viewportH;
                const offset = progress * rect.height * speed * -1;
                img.style.transform = `translate3d(0, ${offset}px, 0) scale(1.25)`;
            }
            rafRef.current = null;
        };

        const onScroll = () => {
            if (rafRef.current == null) {
                rafRef.current = requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
        };
    }, [speed]);

    return (
        <section
            ref={sectionRef}
            className="parallax"
            style={{ height }}
        >
            <div className="parallax__viewport">
                <img className="parallax__img" src={image} alt={image} />
            </div>
            <div className="parallax__scrim" />

            {text && (
                <div className="parallax__box">
                    <p className="parallax__text">{text}</p>
                </div>
            )}

            <style>{`
      `}</style>
        </section>
    );
}