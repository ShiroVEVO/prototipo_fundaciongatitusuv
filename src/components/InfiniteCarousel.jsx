import { useMemo } from "react";
import "./InfiniteCarousel.css";
/**
 * Carrusel infinito genérico.
 *
 * Props:
 * - items: array de datos a mostrar (requerido)
 * - renderItem: (item, index) => ReactNode. Cómo renderizar cada card
 * - getKey: (item, index) => string|number. Para generar keys únicas (opcional)
 * - speed: segundos que tarda un ciclo completo de la animación (default 30)
 * - gap: separación entre cards en px (default 16)
 * - ariaLabel: label de accesibilidad para la región (opcional)
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

    return (
        <div
            className="carousel"
            role="region"
            aria-label={ariaLabel}
            style={{ "--carousel-speed": `${speed}s`, "--carousel-gap": `${gap}px` }}
        >
            <div className="carousel__track">
                {track.map((item, i) => (
                    <div className="carousel__item" key={keyFor(item, i)}>
                        {renderItem(item, i)}
                    </div>
                ))}
            </div>
        </div>
    );
}