import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LOGO_SRC, HELP_WAYS } from "../../../data";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/" || location.pathname === "/adopta";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHelpOpenMobile, setIsHelpOpenMobile] = useState(false);

  // Se hace visible al hacer scroll (solo aplica en la landing)
  useEffect(() => {
    if (!isLandingPage) return;

    function onScroll() {
      setIsScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLandingPage]);

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

  // Al entrar/salir de la landing, resetea los estados que ya no aplican
  useEffect(() => {
    if (!isLandingPage) {
      setIsScrolled(false);
      setIsHovered(false);
    }
  }, [isLandingPage]);

  // En la landing: sólida si hubo scroll, hover (PC) o el menú móvil está abierto.
  // Fuera de la landing: siempre sólida (verde), sin importar scroll/hover.
  const isSolid = isLandingPage ? isScrolled || isHovered || isMobileOpen : true;

  return (
    <nav
      className={`navbar ${isSolid ? "navbar--solid" : ""} ${isMobileOpen ? "navbar--mobile-open" : ""
        }`}
      onMouseEnter={() => isLandingPage && setIsHovered(true)}
      onMouseLeave={() => isLandingPage && setIsHovered(false)}
    >
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <img id="navbar_logoFundacion" src={import.meta.env.BASE_URL + LOGO_SRC} alt="Fundación Gatitus UV" />
        </Link>

        {/* Menú de escritorio (con dropdown por hover) */}
        <ul className="navbar__links navbar__links--desktop">
          <li>
            <Link className="NavBarReferences" to="/">Inicio</Link>
          </li>
          <li>
            <Link className="NavBarReferences" to="/catfeteria">Catfetería</Link>
          </li>
          <li className="navbar__dropdown"> {/*FALTA ADAPTAR A ANCLAS EN LA PESTAÑA DE AYUDA*/}
            <button type="button" className="navbar__dropdown-trigger">
              ¿Cómo ayudar?
            </button>
            <ul className="navbar__dropdown-menu">
              {HELP_WAYS.map((opt) => (
                <li key={opt.label}>
                  <Link to={opt.href}>{opt.label}</Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link className="NavBarReferences" to="/nosotros">Nosotros</Link>
          </li>
          <li>
            <Link className="NavBarReferences" to="/contacto">Contacto</Link>
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
            <Link className="NavBarReferences" to="/" onClick={() => setIsMobileOpen(false)}>Inicio</Link>
          </li>
          <li>
            <Link className="NavBarReferences" to="/catfeteria" onClick={() => setIsMobileOpen(false)}>Catfetería</Link>
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
            {isHelpOpenMobile && ( /*FALTA ADAPTAR A ANCLAS EN LA PESTAÑA DE AYUDA*/
              <ul className="navbar__mobile-submenu">
                {HELP_WAYS.map((opt) => (
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
            <Link className="NavBarReferences" to="/nosotros" onClick={() => setIsMobileOpen(false)}>Nosotros</Link>
          </li>
          <li>
            <Link className="NavBarReferences" to="/contacto" onClick={() => setIsMobileOpen(false)}>Contacto</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
