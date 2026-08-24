import "./AdoptionCard.css";

import { INFO_CATS } from "../../data";
/**
 * Ficha de adopción felina.
 *
 * Forma esperada del objeto `cat`:
 * {
 *   id: string | number,
 *   name: string,                 // ej. "Mishka"
 *   age: string,                  // ej. "2 años" | "8 meses"
 *   photo: string,                // URL de la foto (cubre toda la card)
 *   status: "disponible" | "proceso" | "adoptado",
 *   traits: {
 *     temperament: 1-5,           // calmado (1) → inquieto (5)
 *     affection: 1-5,
 *     energy: 1-5,
 *     physicalContact: 1-5,       // qué tanto disfruta que lo carguen/acaricien
 *     sociability: 1-5,           // con otros animales/personas
 *   }
 * }
 */

// ---------- ícono de huellita usado en la calificación ----------
function PawIcon({ filled }) {
    return (
        <svg
            className={`gato-card__paw${filled ? " is-filled" : ""}`}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M12 13.2c-2.9 0-5.4 2.2-5.8 5-.2 1.5 1 2.7 2.4 2.5 1-.1 2-.7 3.4-.7s2.4.6 3.4.7c1.4.2 2.6-1 2.4-2.5-.4-2.8-2.9-5-5.8-5z" />
            <circle cx="5.6" cy="8.6" r="2.1" />
            <circle cx="18.4" cy="8.6" r="2.1" />
            <circle cx="9" cy="4.4" r="2.1" />
            <circle cx="15" cy="4.4" r="2.1" />
        </svg>
    );
}

// ---------- íconos de cada rasgo ----------
const TRAIT_ICONS = {
    temperament: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 15a8 8 0 0 1 16 0" />
            <path d="M12 15l4-4.5" />
            <circle cx="12" cy="15" r="1.2" fill="currentColor" stroke="none" />
        </svg>
    ),
    affection: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20s-7-4.35-9.5-9C1 7.5 3 4 6.5 4c2 0 3.3 1.1 4 2.2C11.2 5.1 12.5 4 14.5 4 18 4 20 7.5 18.5 11 16 15.65 12 20 12 20z" />
        </svg>
    ),
    energy: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
        </svg>
    ),
    physicalContact: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12" />
            <path d="M11 12V4.5a1.5 1.5 0 0 1 3 0V12" />
            <path d="M14 12V5.5a1.5 1.5 0 0 1 3 0V13" />
            <path d="M17 13V8.5a1.5 1.5 0 0 1 3 0V15c0 3.9-2.7 7-6.5 7-3 0-4.6-1.2-6-3l-2.8-4.3c-.5-.8-.2-1.8.6-2.2.7-.3 1.5-.1 2 .5L8 15" />
        </svg>
    ),
    sociability: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="8" r="2.6" />
            <circle cx="16" cy="9.5" r="2.2" />
            <path d="M3 19c.5-3 2.5-4.8 5-4.8s4.5 1.8 5 4.8" />
            <path d="M13.5 19c.4-2.3 1.9-3.7 3.8-3.7s3.4 1.4 3.7 3.7" />
        </svg>
    ),
};

const TRAIT_LABELS = {
    temperament: "Temperamento",
    affection: "Afecto",
    energy: "Energía",
    physicalContact: "Contacto físico",
    sociability: "Sociabilidad",
};

// Orden en que se muestran los rasgos en la ficha
const TRAIT_ORDER = [
    "temperament",
    "affection",
    "energy",
    "physicalContact",
    "sociability",
];

// ---------- estado de adopción: etiqueta del sello + texto/color del pie ----------
const STATUS_CONFIG = {
    disponible: {
        stampLabel: "Disponible",
        stampClass: "",
        footerLabel: "Lista para adoptar",
        footerClass: "",
    },
    proceso: {
        stampLabel: "En proceso",
        stampClass: "gato-card__stamp--proceso",
        footerLabel: "Reservado por una familia",
        footerClass: "gato-card__status--proceso",
    },
    adoptado: {
        stampLabel: "Adoptada",
        stampClass: "gato-card__stamp--adoptado",
        footerLabel: "Ya tiene hogar",
        footerClass: "gato-card__status--adoptado",
    },
};



function clampLevel(value) {
    const n = Number(value) || 0;
    return Math.min(5, Math.max(0, Math.round(n)));
}

export default function AdoptionCard({ cat }) {
    const {
        name = "Sin nombre",
        age = "Edad desconocida",
        photo,
        status = "disponible",
        traits = {},
    } = cat || {};

    const statusInfo = STATUS_CONFIG[status] ?? STATUS_CONFIG.disponible;

    return (
        <article className="gato-card" tabIndex={0}>
            <span className={`gato-card__stamp ${statusInfo.stampClass}`}>
                {statusInfo.stampLabel}
            </span>
            <div className="gato-card__front">
                <img
                    className="gato-card__img"
                    src={photo}
                    alt={`${name}, ${age}`}
                    loading="lazy"
                />

                <div className="gato-card__tag">
                    <span className="gato-card__name">{name}</span>
                    <span className="gato-card__age">{age}</span>
                </div>
            </div>

            <div className="gato-card__details">
                <ul className="gato-card__stats">
                    {TRAIT_ORDER.map((key) => {
                        const level = clampLevel(traits[key]);
                        return (
                            <li className="gato-card__stat" key={key}>
                                <span className="gato-card__stat-icon">{TRAIT_ICONS[key]}</span>
                                <span className="gato-card__stat-label">{TRAIT_LABELS[key]}</span>
                                <span className="gato-card__paws" aria-label={`${level} de 5`}>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <PawIcon key={i} filled={i < level} />
                                    ))}
                                </span>
                            </li>
                        );
                    })}
                </ul>
                <div className={`gato-card__status ${statusInfo.footerClass}`}>
                    {statusInfo.footerLabel}
                </div>
            </div>
        </article>
    );
}

// ---------- ejemplo de uso con una lista de gatos ----------
export function CatAdoptionGrid({ cats = INFO_CATS }) {
    return (
        <div className="gatos-grid">
            {cats.map((cat) => (
                <AdoptionCard key={cat.id ?? cat.name} cat={cat} />
            ))}
        </div>
    );
}