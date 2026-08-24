import { TierCard, TextHeader } from "../../../components"

import "./SponsorGrid.css"
/**
 * SponsorCards
 *
 * Muestra los tiers de apadrinamiento felino. Cada card inicia mostrando
 * lo esencial (nombre, costo, vencimiento y beneficios destacados) y al
 * hacer clic (o Enter/Espacio) se voltea y revela el listado completo.
 *
 * Para personalizar el resplandor de una card, pasa tu propio arreglo
 * `tiers` (mismo shape que DEFAULT_TIERS) y ajusta `glowColor` /
 * `glowIntensity` ('soft' | 'medium' | 'strong') por cada tier.
 */
export default function SponsorGrid({ tiers, GENERAL_BENEFITS }) {
    return (
        <section className="sponsor-cards">
            <TextHeader eyebrow="Apadrinamiento" title="Elige cómo ayudar a uno de nuestros gatitus" subtitle="Todos los planes son mes a mes: tú decides cuándo pausar o cancelar." />
            <div className="sponsor-cards__grid">
                {tiers.map((tier) => (
                    <TierCard key={tier.id} tier={tier} GENERAL_BENEFITS={GENERAL_BENEFITS} />
                ))}
            </div>
        </section>
    );
}