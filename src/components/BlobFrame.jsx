import React, { useId } from "react";
import "./BlobFrame.css";

/**
 * Trayectoria del blob (viewBox 200x200, centrado en 100,100).
 * Para usar otra forma, solo cambia este "d".
 */
const BLOB_PATH_D =
    "M43.1,-53.6C56.1,-40.5,67.1,-27.1,73.4,-10.2C79.8,6.8,81.4,27.4,73.2,42.7C64.9,58.1,46.7,68.2,27.6,74.4C8.6,80.7,-11.3,83.2,-25.5,75.6C-39.6,68,-48,50.3,-57.3,33.4C-66.6,16.6,-76.8,0.6,-76.5,-15.7C-76.2,-31.9,-65.4,-48.5,-50.9,-61.4C-36.4,-74.2,-18.2,-83.3,-1.6,-81.4C15.1,-79.5,30.1,-66.7,43.1,-53.6Z";

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
export default function BlobFrame({ children, className = "", ratio = "1 / 1" }) {
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
                        <path transform="scale(0.005) translate(100 100)" d={BLOB_PATH_D} />
                    </clipPath>
                </defs>
            </svg>

            <div className="blob-frame__content" style={{ clipPath: `url(#${clipId})` }}>
                {children}
            </div>
        </div>
    );
}