import React, { useEffect, useState } from "react";
import "./Navbar.css";

const HELP_OPTIONS = [
  { label: "Adopta", href: "/adopta" },
  { label: "Apadrina", href: "/apadrina" },
  { label: "Dona", href: "/dona" },
  { label: "Sé voluntario", href: "/voluntariado" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHelpOpenMobile, setIsHelpOpenMobile] = useState(false);

  // Se hace visible al hacer scroll
  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Si el usuario agranda la ventana a escritorio, cierra el menú móvil abierto
  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 1024) {
        setIsMobileOpen(false);
        setIsHelpOpenMobile(false);
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Visible (sólida) si se hizo scroll, si está en hover (PC) o si el menú móvil está abierto
  const isSolid = isScrolled || isHovered || isMobileOpen;

  return (
    <nav
      className={`navbar ${isSolid ? "navbar--solid" : ""} ${isMobileOpen ? "navbar--mobile-open" : ""
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="navbar__inner">
        <a href="#inicio" className="navbar__logo">
          logofundaciongatitusuv
        </a>

        {/* Menú de escritorio (con dropdown por hover) */}
        <ul className="navbar__links navbar__links--desktop">
          <li>
            <a href="#inicio">Inicio</a>
          </li>
          <li>
            <a href="#cafeteria">Catfetería</a>
          </li>
          <li className="navbar__dropdown">
            <button type="button" className="navbar__dropdown-trigger">
              ¿Cómo ayudar?
            </button>
            <ul className="navbar__dropdown-menu">
              {HELP_OPTIONS.map((opt) => (
                <li key={opt.label}>
                  <a href={opt.href}>{opt.label}</a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <a href="#nosotros">Nosotros</a>
          </li>
          <li>
            <a href="#contacto">Contacto</a>
          </li>
        </ul>

        {/* Botón hamburguesa: solo visible en móvil/tablet */}
        <button
          type="button"
          className="navbar__burger"
          aria-label={isMobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMobileOpen}
          onClick={() => setIsMobileOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Menú móvil / tablet: click en lugar de hover */}
      <div className="navbar__mobile-menu">
        <ul>
          <li>
            <a href="#inicio" onClick={() => setIsMobileOpen(false)}>
              Inicio
            </a>
          </li>
          <li>
            <a href="#cafeteria" onClick={() => setIsMobileOpen(false)}>
              Catfetería
            </a>
          </li>
          <li className="navbar__mobile-help">
            <button
              type="button"
              className="navbar__mobile-help-trigger"
              aria-expanded={isHelpOpenMobile}
              onClick={() => setIsHelpOpenMobile((v) => !v)}
            >
              ¿Cómo ayudar?
              <span
                className={`navbar__chevron ${isHelpOpenMobile ? "navbar__chevron--open" : ""
                  }`}
              />
            </button>
            {isHelpOpenMobile && (
              <ul className="navbar__mobile-submenu">
                {HELP_OPTIONS.map((opt) => (
                  <li key={opt.label}>
                    <a href={opt.href} onClick={() => setIsMobileOpen(false)}>
                      {opt.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <a href="#nosotros" onClick={() => setIsMobileOpen(false)}>
              Nosotros
            </a>
          </li>
          <li>
            <a href="#contacto" onClick={() => setIsMobileOpen(false)}>
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
