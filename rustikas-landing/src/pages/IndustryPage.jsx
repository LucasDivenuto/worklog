import ClientLogoGrid from "../components/ClientLogoGrid.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import SiteImage from "../components/SiteImage.jsx";
import {
  capabilities,
  industrialClients,
  industrialServices,
  projectTypes,
  technicalWhatsappUrl,
} from "../siteData.js";

export default function IndustryPage() {
  return (
    <>
      <section className="page-hero">
        <div>
          <span className="eyebrow">Soluciones Industriales</span>
          <h1>Construccion, ampliacion y mantenimiento industrial.</h1>
          <p>
            Ejecutamos infraestructura para industrias, depositos logisticos,
            plantas productivas, camaras de frio y superficies de alto transito.
          </p>
        </div>
        <SiteImage
          src="/images/industria/interior-industrial-terminado.jpg"
          alt="Interior industrial terminado por Rustikas"
        />
      </section>

      <section className="content-band">
        <SectionHeader title="Servicios industriales">
          Capacidades pensadas para empresas que necesitan obras claras,
          coordinadas y ejecutadas con criterio operativo.
        </SectionHeader>
        <div className="service-list">
          {industrialServices.map((service) => (
            <div className="service-row" key={service}>
              {service}
            </div>
          ))}
        </div>
      </section>

      <section className="content-band muted">
        <SectionHeader eyebrow="Capacidades" title="Lo que Rustikas resuelve">
          En industria no alcanza con construir: hay que coordinar, cumplir y
          trabajar alrededor de operaciones reales.
        </SectionHeader>
        <div className="capability-grid">
          {capabilities.map((capability) => (
            <div className="capability-item" key={capability}>
              {capability}
            </div>
          ))}
        </div>
      </section>

      <section className="content-band">
        <SectionHeader title="Tipos de proyecto">
          Areas donde podemos aportar ejecucion, mantenimiento y soluciones de
          hormigon.
        </SectionHeader>
        <div className="card-grid">
          {projectTypes.map((project) => (
            <article className="info-card" key={project.title}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band muted">
        <SectionHeader eyebrow="Clientes industriales" title="Obras para empresas en operacion">
          Experiencia en entornos productivos, logisticos y frigorificos donde
          importan los tiempos, la coordinacion y la continuidad operativa.
        </SectionHeader>
        <ClientLogoGrid clients={industrialClients} />
      </section>

      <section className="feature-section reverse">
        <SiteImage
          src="/images/industria/armado-pavimento-industrial.jpg"
          alt="Armado de pavimento industrial de hormigon"
        />
        <div>
          <span className="eyebrow">Pavimentos</span>
          <h2>Hormigon preparado para alto transito.</h2>
          <p>
            Ejecutamos superficies industriales considerando uso, cargas,
            circulacion, mantenimiento y continuidad operativa.
          </p>
          <a className="text-link" href={technicalWhatsappUrl}>
            Consultar por pavimentos industriales
          </a>
        </div>
      </section>

      <section className="cta-section">
        <h2>Tenes una obra industrial en planificacion?</h2>
        <p>
          Coordinemos una consulta para entender alcance, tiempos y
          requerimientos de operacion.
        </p>
        <a className="button" href={technicalWhatsappUrl}>
          Hablar con departamento tecnico
        </a>
      </section>
    </>
  );
}
