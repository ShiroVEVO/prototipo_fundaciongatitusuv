import { useId } from "react";
import "./BlobFrame.css";

/**
 * Envuelve cualquier contenido (iframe, img, video) y lo recorta con la
 * forma de blob de arriba. El centro del blob (0.5, 0.5 en objectBoundingBox)
 * siempre coincide con el centro real del elemento, sin importar su tamaño,
 * porque usamos clipPathUnits="objectBoundingBox" (coordenadas relativas
 * 0–1, no píxeles fijos).
 *
 * Uso:
 * <BlobFrame>
 *   <iframe src="..." title="Ubicación" />
 * </BlobFrame>
 *
 * @param {React.ReactNode} children  El iframe/img/video a recortar
 * @param {string} className         Clases extra para el contenedor externo
 * @param {string} ratio             aspect-ratio del marco, ej. "1 / 1" (default) o "4 / 3"
 */

export default function BlobFrame({ children, className = "", ratio = "1 / 1", blobPath }) {
    // useId genera algo como ":r0:" — quitamos los ":" porque no son válidos
    // dentro de un selector/url() de CSS. Esto también evita que dos
    // instancias de BlobFrame en la misma página choquen por el mismo id.
    const rawId = useId().replace(/:/g, "");
    const clipId = `blob-clip-${rawId}`;

    return (
        <div className={`blob-frame ${className}`} style={{ aspectRatio: ratio }}>
            <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
                <defs>
                    <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                        <path transform="scale(0.005) translate(100 100)" d={blobPath} />
                    </clipPath>
                </defs>
            </svg>

            <div className="blob-frame__content" style={{ clipPath: `url(#${clipId})` }}>
                {children}
            </div>
        </div>
    );
}