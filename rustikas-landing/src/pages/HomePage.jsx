import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader.jsx";
import SiteImage from "../components/SiteImage.jsx";
import {
  capabilities,
  industrialServices,
  products,
  whatsappUrl,
} from "../siteData.js";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Rustikas</span>
          <h1>Productos de hormigon y soluciones industriales a medida.</h1>
          <p>
            Fabricamos baldosas, premoldeados y pavimentos, y ejecutamos obras
            industriales con foco en durabilidad, cumplimiento y operacion real.
          </p>
          <div className="actions">
            <a className="button" href={whatsappUrl}>
              Solicitar presupuesto
            </a>
            <Link className="button secondary" to="/industria">
              Ver soluciones industriales
            </Link>
          </div>
        </div>
        <SiteImage
          src="/images/hero/obra-industrial-rustikas.jpg"
          alt="Obra industrial ejecutada por Rustikas"
        />
      </section>

      <section className="split-choice">
        <Link to="/productos" className="choice-card">
          <span>Linea principal</span>
          <h2>Productos de Hormigon</h2>
          <p>Baldosas, premoldeados, pavimentos y soluciones para exteriores.</p>
        </Link>
        <Link to="/industria" className="choice-card dark">
          <span>Linea industrial</span>
          <h2>Construccion y Mantenimiento Industrial</h2>
          <p>Galpones, pisos de alto transito, camaras de frio y adecuaciones.</p>
        </Link>
      </section>

      <section className="content-band">
        <SectionHeader
          eyebrow="Productos"
          title="Hormigon fabricado para durar"
        >
          Soluciones para particulares, constructoras, arquitectos y empresas.
        </SectionHeader>
        <div className="card-grid">
          {products.map((product) => (
            <article className="info-card" key={product.title}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="feature-section">
        <SiteImage
          src="/images/industria/galpon-industrial-interior.jpg"
          alt="Interior de galpon industrial en obra"
        />
        <div>
          <span className="eyebrow">Soluciones Industriales</span>
          <h2>Infraestructura para empresas que no pueden detenerse.</h2>
          <p>
            Acompanamos obras, ampliaciones y mantenimiento en industrias,
            depositos logisticos, plantas productivas y camaras de frio.
          </p>
          <ul className="check-list">
            {industrialServices.slice(0, 5).map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
          <Link className="text-link" to="/industria">
            Conocer servicios industriales
          </Link>
        </div>
      </section>

      <section className="content-band muted">
        <SectionHeader eyebrow="Capacidades" title="Fabricacion + ejecucion">
          Un mismo equipo para producir elementos de hormigon y llevar la obra
          hasta su entrega.
        </SectionHeader>
        <div className="capability-grid">
          {capabilities.map((capability) => (
            <div className="capability-item" key={capability}>
              {capability}
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Conversemos sobre tu proyecto.</h2>
        <p>
          Contanos que necesitas fabricar, construir, ampliar o reparar. Te
          respondemos por WhatsApp.
        </p>
        <a className="button" href={whatsappUrl}>
          Contactar por WhatsApp
        </a>
      </section>
    </>
  );
}
