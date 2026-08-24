import { useState } from "react";
import "./PaymentCard.css";

/**
 * Tarjeta de medio de pago / donación.
 *
 * Forma esperada del objeto `paymentMethod`:
 * {
 *   id: string | number,
 *   title: string,              // ej. "PayPal", "Bancolombia"
 *   subtitle: string,           // ej. "Donación internacional" | "Cuenta de ahorros"
 *   type: "link" | "account" | "phone",
 *   value: string,              // enlace de pago | # de cuenta | # de teléfono
 *   icon?: string,              // URL del logo (opcional, cae a un ícono genérico)
 * }
 */

// ---------- íconos ----------
function IconLink() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 15 15 9" />
            <path d="M10.5 6.5 12 5a4 4 0 0 1 5.66 5.66l-1.5 1.5" />
            <path d="M13.5 17.5 12 19a4 4 0 0 1-5.66-5.66l1.5-1.5" />
        </svg>
    );
}

function IconCopy() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
        </svg>
    );
}

function IconCheck() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}

// ícono genérico por si el medio de pago no trae logo propio
function IconGenericCard() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2.5" y="5.5" width="19" height="13" rx="2.2" />
            <path d="M2.5 10h19" />
        </svg>
    );
}

// etiqueta del botón según el tipo de medio de pago
const ACTION_LABELS = {
    link: "Ir al enlace",
    account: "Copiar número",
    phone: "Copiar número",
};

function normalizeUrl(value) {
    return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

export default function PaymentCard({ paymentMethod }) {
    const [copied, setCopied] = useState(false);

    const {
        title = "Medio de pago",
        subtitle = "",
        type = "account",
        value = "",
        icon,
    } = paymentMethod || {};

    const isLink = paymentMethod.type === "link";
    const actionLabel = copied ? "¡Copiado!" : ACTION_LABELS[paymentMethod.type] ?? "Copiar";

    async function handleClick() {
        if (isLink) {
            window.open(normalizeUrl(value), "_blank", "noopener,noreferrer");
            return;
        }

        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch (err) {
            console.error("No se pudo copiar el valor:", err);
        }
    }

    return (
        <div className="payment-card">
            <div className="payment-card__inner">
                <div className="payment-card__icon">
                    {paymentMethod.icon ? (
                        <img src={import.meta.env.BASE_URL + paymentMethod.icon} alt={`Logo de ${paymentMethod.title}`} />
                    ) : (
                        <IconGenericCard />
                    )}
                </div>

                <h3 className="payment-card__title">{paymentMethod.title}</h3>
                {paymentMethod.subtitle && <p className="payment-card__subtitle">{paymentMethod.subtitle}</p>}
                <hr />
                <span className="payment-card__value">{paymentMethod.value}</span>

                <button
                    type="button"
                    className={`payment-card__action${copied ? " is-copied" : ""}`}
                    onClick={handleClick}
                >
                    <span className="payment-card__action-icon">
                        {copied ? <IconCheck /> : isLink ? <IconLink /> : <IconCopy />}
                    </span>
                    {actionLabel}
                </button>
            </div>
        </div>
    );
}

// // ---------- ejemplo de uso con varios medios de pago ----------
// export function PaymentCardGrid({ paymentMethods = [DEFAULT_paymentMethod] }) {
//   return (
//     <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
//       {paymentMethods.map((paymentMethod) => (
//         <PaymentCard key={paymentMethod.id ?? paymentMethod.title} paymentMethod={paymentMethod} />
//       ))}
//     </div>
//   );
// }