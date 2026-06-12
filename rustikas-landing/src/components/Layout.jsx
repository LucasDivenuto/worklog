import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  technicalWhatsappUrl,
  tileSalesWhatsappUrl,
  worklogUrl,
} from "../siteData.js";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/productos", label: "Productos" },
  { to: "/industria", label: "Soluciones Industriales" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
];

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <Link className="brand" to="/" onClick={closeMenu}>
          <img
            className="brand-logo"
            src="/images/brand/logo-rustikas-color.jpg"
            alt="Rustikas"
          />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label="Abrir menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
        <div
          className={`header-menu ${isMenuOpen ? "is-open" : ""}`}
          id="main-navigation"
        >
          <nav className="main-nav" aria-label="Navegacion principal">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <a className="ghost-link" href={worklogUrl}>
              Ingresar
            </a>
            <Link
              className="button button-small"
              to="/contacto"
              onClick={closeMenu}
            >
              WhatsApp
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div>
          <img
            className="footer-logo"
            src="/images/brand/logo-rustikas-blanco.png"
            alt="Rustikas"
          />
          <p>Fabricacion propia y ejecucion de obra en un solo equipo.</p>
        </div>
        <div className="footer-links">
          <a href={tileSalesWhatsappUrl}>Ventas de baldosas</a>
          <a href={technicalWhatsappUrl}>Departamento tecnico</a>
          <a href={worklogUrl}>Ingresar a WorkLog</a>
        </div>
      </footer>
    </>
  );
}
