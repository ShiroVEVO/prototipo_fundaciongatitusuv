import React, { useEffect, useRef, useState } from "react";

/**
 * Cuenta de forma animada desde 0 hasta `value` cuando el elemento entra en pantalla.
 * Uso: <StatsCounter value={128} label="Dados en adopción" suffix="+" />
 */
export default function StatsCounter({ value, label, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          animateCount();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function animateCount() {
    const duration = 2000;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  return (
    <div className="stat" ref={ref}>
      <span className="stat__value">
        {count}
        {suffix}
      </span>
      <span className="stat__label">{label}</span>
    </div>
  );
}
