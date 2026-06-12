import SectionHeader from "../components/SectionHeader.jsx";
import SiteImage from "../components/SiteImage.jsx";
import HorizontalCarousel from "../components/HorizontalCarousel.jsx";
import { projectGallery, projectTypes, whatsappUrl } from "../siteData.js";

export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero">
        <div>
          <span className="eyebrow">Proyectos</span>
          <h1>Obras industriales, pavimentos y soluciones ejecutadas.</h1>
          <p>
            Una muestra de trabajos realizados en infraestructura industrial,
            superficies de hormigon, cerramientos y espacios productivos.
          </p>
        </div>
        <SiteImage
          src="/images/proyectos/proyectos-hero-fachada.jpg"
          alt="Fachada industrial y pavimento exterior ejecutado por Rustikas"
        />
      </section>

      <section className="content-band">
        <SectionHeader title="Areas de trabajo">
          Ejecutamos proyectos que combinan obra civil, estructuras,
          cerramientos, pavimentos y adecuaciones para operacion industrial.
        </SectionHeader>
        <div className="project-grid">
          {projectTypes.map((project) => (
            <article className="project-card" key={project.title}>
              <SiteImage src={project.image} alt={project.alt} />
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band muted">
        <SectionHeader title="Mas trabajos realizados">
          Fotografias de obras en distintas etapas: preparacion, ejecucion,
          terminacion y entrega.
        </SectionHeader>
        <HorizontalCarousel
          ariaLabel="Mas trabajos realizados"
          className="project-carousel"
        >
          {projectGallery.map((project) => (
            <article className="project-card carousel-card" key={project.title}>
              <SiteImage src={project.image} alt={project.alt} />
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </HorizontalCarousel>
      </section>

      <section className="cta-section">
        <h2>Queres consultar por una obra similar?</h2>
        <p>Envianos fotos, medidas o una descripcion del trabajo por WhatsApp.</p>
        <a className="button" href={whatsappUrl}>
          Enviar consulta
        </a>
      </section>
    </>
  );
}
