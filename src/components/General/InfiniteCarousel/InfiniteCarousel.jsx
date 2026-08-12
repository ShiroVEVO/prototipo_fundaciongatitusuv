import { useCallback, useEffect, useMemo, useRef } from "react";

import "./InfiniteCarousel.css";

/**
 * Carrusel infinito genérico, con soporte de arrastre.
 *
 * Props:
 * - items: array de datos a mostrar (requerido)
 * - renderItem: (item, index) => ReactNode. Cómo renderizar cada card
 * - getKey: (item, index) => string|number. Para generar keys únicas (opcional)
 * - speed: segundos que tarda un ciclo completo de la animación (default 30)
 * - gap: separación entre cards en px (default 16)
 * - ariaLabel: label de accesibilidad para la región (opcional)
 *
 * Interacción:
 * - El carrusel avanza solo (autoplay), igual que antes.
 * - Se puede hacer click y arrastrar con mouse o dedo:
 *     arrastrar a la izquierda -> adelanta el carrusel
 *     arrastrar a la derecha   -> lo devuelve
 * - Al soltar, el autoplay continúa desde donde quedó (sin saltos).
 * - Pasar el cursor por encima sigue pausando el autoplay.
 */
export default function InfiniteCarousel({
    items,
    renderItem,
    getKey,
    speed = 30,
    gap = 16,
    ariaLabel = "Carrusel",
}) {
    const track = useMemo(() => [...items, ...items, ...items], [items]);

    const keyFor = (item, i) =>
        getKey ? `${getKey(item, i)}-${i}` : `item-${i}`;

    const containerRef = useRef(null);
    const trackRef = useRef(null);

    // Estado "vivo" que no necesita re-render de React: se lee/escribe
    // directamente en cada frame o en cada evento de puntero.
    const positionRef = useRef(0); // translateX actual, en px (siempre <= 0)
    const oneThirdRef = useRef(0); // ancho en px de UNA copia del arreglo (track tiene 3 copias)
    const pausedRef = useRef(false); // pausado por hover
    const draggingRef = useRef(false); // pausado por drag activo
    const dragStartXRef = useRef(0);
    const dragStartPosRef = useRef(0);
    const draggedRef = useRef(false); // si hubo movimiento real durante el drag (para no disparar click)
    const rafRef = useRef(null);
    const lastTimeRef = useRef(null);
    const reducedMotionRef = useRef(false);

    const applyTransform = useCallback(() => {
        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
        }
    }, []);

    const wrapPosition = useCallback(() => {
        const oneThird = oneThirdRef.current;
        if (!oneThird) return;
        // Mantiene position dentro de (-oneThird, 0], reciclando el track
        // triplicado para que el loop sea imperceptible en cualquier dirección.
        while (positionRef.current <= -oneThird) positionRef.current += oneThird;
        while (positionRef.current > 0) positionRef.current -= oneThird;
    }, []);

    // Mide el ancho de una copia del arreglo (track / 3) y lo mantiene
    // actualizado si cambia el contenido (ej. imágenes que cargan async).
    useEffect(() => {
        const node = trackRef.current;
        if (!node) return;

        const measure = () => {
            oneThirdRef.current = node.scrollWidth / 3;
        };
        measure();

        const observer = new ResizeObserver(measure);
        observer.observe(node);
        return () => observer.disconnect();
    }, [track]);

    useEffect(() => {
        const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
        reducedMotionRef.current = mql.matches;
        const onChange = (e) => {
            reducedMotionRef.current = e.matches;
        };
        mql.addEventListener?.("change", onChange);
        return () => mql.removeEventListener?.("change", onChange);
    }, []);

    // Loop de animación: controla tanto el autoplay como el reflejo visual
    // del arrastre (la posición se actualiza acá siempre, se mueva por
    // autoplay o porque el usuario la cambió en un pointermove).
    useEffect(() => {
        const speedPxPerSecond = () =>
            oneThirdRef.current > 0 ? oneThirdRef.current / speed : 0;

        const tick = (timestamp) => {
            if (lastTimeRef.current == null) lastTimeRef.current = timestamp;
            const dt = (timestamp - lastTimeRef.current) / 1000;
            lastTimeRef.current = timestamp;

            const shouldAutoplay =
                !pausedRef.current && !draggingRef.current && !reducedMotionRef.current;

            if (shouldAutoplay) {
                positionRef.current -= speedPxPerSecond() * dt;
            }

            wrapPosition();
            applyTransform();

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            lastTimeRef.current = null;
        };
    }, [speed, applyTransform, wrapPosition]);

    const handlePointerDown = (e) => {
        // Solo botón principal para mouse; touch/pen siempre disparan botón 0.
        if (e.button !== undefined && e.button !== 0) return;

        draggingRef.current = true;
        draggedRef.current = false;
        dragStartXRef.current = e.clientX;
        dragStartPosRef.current = positionRef.current;
        e.currentTarget.setPointerCapture?.(e.pointerId);
    };

    const handlePointerMove = (e) => {
        if (!draggingRef.current) return;
        const dx = e.clientX - dragStartXRef.current;
        if (Math.abs(dx) > 3) draggedRef.current = true;
        // Arrastrar a la izquierda (dx negativo) adelanta el carrusel;
        // arrastrar a la derecha (dx positivo) lo devuelve.
        positionRef.current = dragStartPosRef.current + dx;
    };

    const endDrag = (e) => {
        if (!draggingRef.current) return;
        draggingRef.current = false;
        e.currentTarget.releasePointerCapture?.(e.pointerId);
    };

    // Evita que un click "fantasma" (ej. sobre un botón dentro de la card)
    // se dispare justo al soltar después de haber arrastrado.
    const handleClickCapture = (e) => {
        if (draggedRef.current) {
            e.preventDefault();
            e.stopPropagation();
            draggedRef.current = false;
        }
    };

    return (
        <div
            ref={containerRef}
            className="carousel"
            role="region"
            aria-label={ariaLabel}
            style={{ "--carousel-speed": `${speed}s`, "--carousel-gap": `${gap}px` }}
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
            onClickCapture={handleClickCapture}
            onDragStart={(e) => e.preventDefault()}
        >
            <div className="carousel__track" ref={trackRef}>
                {track.map((item, i) => (
                    <div className="carousel__item" key={keyFor(item, i)}>
                        {renderItem(item, i)}
                    </div>
                ))}
            </div>
        </div>
    );
}