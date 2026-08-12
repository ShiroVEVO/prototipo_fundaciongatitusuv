import { Link } from "react-router-dom";

import "./Footer.css";

import { LOGO_SRC, SOCIALS } from "../../../data";

const NAV_LINKS = [
  { label: "Adopciones", href: "#rescate" },
  { label: "Cafetería", href: "#cafeteria" },
  { label: "Cómo ayudar", href: "#ayudar" },
  { label: "Hogar de paso", href: "/hogar-de-paso" },
  { label: "Voluntariado", href: "/voluntariado" },
  { label: "Donar", href: "/donar" },
  { label: "Apadrinar", href: "/apadrinar" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <img id="footer_logoFundacion" src={import.meta.env.BASE_URL + LOGO_SRC} alt="Fundación Gatitus UV" />
        <p>Refugio y catfeteria. Bogotá, Colombia.</p>
      </div>

      <div className="footer__col">
        <h4>Navegación</h4>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link to={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__col">
        <h4>Contacto</h4>
        <ul>
          <li>
            <a href="mailto:contacto@fundaciongatitusuv.org">contacto@fundaciongatitusuv.org</a>
          </li>
          <li>
            <a href="tel:+573118471387">+57 311 8471 387</a>
          </li>
          <li>
            <a href="https://maps.app.goo.gl/DkRSEB8cmvpd8VVA7" target="_blank" rel="noreferrer">
              Calle 121 #47-25, Bogotá
            </a>
          </li>
        </ul>
      </div>

      <div className="footer__col">
        <h4>Síguenos</h4>
        <ul>
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Fundación Gatitus uv. Todos los derechos reservados.</span>
        <span>Designed and powered by </span>
        <a href="https://github.com/ShiroVEVO" target="_blank" rel="noreferrer">Shirovevo</a>
      </div>
    </footer>
  );
}
