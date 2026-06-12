import SectionHeader from "../components/SectionHeader.jsx";
import SiteImage from "../components/SiteImage.jsx";
import { capabilities } from "../siteData.js";

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div>
          <span className="eyebrow">Nosotros</span>
          <h1>Fabricacion propia y ejecucion de obra en un mismo equipo.</h1>
          <p>
            Somos una empresa uruguaya dedicada a productos de hormigon,
            soluciones para exteriores y obras industriales con enfoque practico
            y durable.
          </p>
        </div>
        <SiteImage
          src="/images/proyectos/galpon-industrial-terminado.jpg"
          alt="Obra industrial terminada por Rustikas"
        />
      </section>

      <section className="content-band">
        <SectionHeader title="Una ventaja concreta">
          Muchas empresas fabrican o construyen. Rustikas integra ambas
          capacidades para resolver desde la produccion hasta la obra terminada.
        </SectionHeader>
        <div className="capability-grid">
          {capabilities.map((capability) => (
            <div className="capability-item" key={capability}>
              {capability}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
