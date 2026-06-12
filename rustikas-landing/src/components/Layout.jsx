import { NavLink } from "react-router-dom";
import { whatsappUrl, worklogUrl } from "../siteData.js";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/productos", label: "Productos" },
  { to: "/industria", label: "Soluciones Industriales" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
];

export default function Layout({ children }) {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="/">
          <img
            className="brand-logo"
            src="/images/brand/logo-rustikas-negro.png"
            alt="Rustikas"
          />
        </a>
        <nav className="main-nav" aria-label="Navegacion principal">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
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
          <a className="button button-small" href={whatsappUrl}>
            WhatsApp
          </a>
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
          <a href={whatsappUrl}>Consultar por WhatsApp</a>
          <a href={worklogUrl}>Ingresar a WorkLog</a>
        </div>
      </footer>
    </>
  );
}
