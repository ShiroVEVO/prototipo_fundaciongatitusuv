import { useState } from 'react';
import './TierCard.css';


/**
 * "glowColor" y "glowIntensity" son lo que hace que una card "brille": 
 * glowColor acepta cualquier color CSS (hex, rgb, var(--...)),
 * glowIntensity acepta 'soft' | 'medium' | 'strong' y controla qué tan
 * notorio es el resplandor (todo en SponsorCards.css).
 */

export default function TierCard({ tier, GENERAL_BENEFITS }) {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped((prev) => !prev);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  };

  const glowStyle = {
    '--tier-glow-color': tier.glowColor,
  };

  return (
    <div className={`tier-card tier-card--${tier.glowIntensity}`} style={glowStyle}>
      <div
        className={`tier-card__inner${flipped ? ' is-flipped' : ''}`}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`Ver beneficios completos de ${tier.name}`}
        onClick={toggle}
        onKeyDown={handleKeyDown}
      >
        {/* Cara frontal */}
        <div className="tier-card__face tier-card__face--front">
          {tier.featured && <span className="tier-card__badge">Más elegido</span>}

          <div className="tier-card__paws" aria-hidden="true">
            {'🐾'.repeat(tier.pawLevel)}
          </div>

          <h3 className="tier-card__name">{tier.name}</h3>

          <span className="tier-card__price-label">Desde</span>
          <p className="tier-card__price">
            <span className="tier-card__price-amount">{tier.price}</span>
            <span className="tier-card__price-period">/mes</span>
          </p>
          <p className="tier-card__price-note">{tier.priceNote}</p>

          <ul className="tier-card__highlights">
            {tier.highlightBenefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>

          <span className="tier-card__flip-hint">Toca para ver todos los beneficios ↻</span>
        </div>

        {/* Cara trasera */}
        <div className="tier-card__face tier-card__face--back">
          <div className="tier-card__back-content">
            <h3 className="tier-card__name tier-card__name--back">{tier.name}</h3>

            <ul className="tier-card__full-list">
              {tier.fullBenefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>

            <div className="tier-card__general">
              <p className="tier-card__general-title">Para todos los padrinos</p>
              <ul className="tier-card__general-list">
                {GENERAL_BENEFITS.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>

            <span className="tier-card__flip-hint">Toca para volver ↺</span>
          </div>

          <span className="tier-card__scroll-hint" aria-hidden="true">
            ▾
          </span>
        </div>
      </div>
    </div>
  );
}


