import ClientLogoGrid from "../components/ClientLogoGrid.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import SiteImage from "../components/SiteImage.jsx";
import HorizontalCarousel from "../components/HorizontalCarousel.jsx";
import {
  catalogModels,
  productGallery,
  products,
  tileClients,
  tileSalesWhatsappUrl,
} from "../siteData.js";

export default function ProductsPage() {
  return (
    <>
      <section className="page-hero">
        <div>
          <span className="eyebrow">Productos de Hormigon</span>
          <h1>Baldosas, premoldeados y pavimentos para obras durables.</h1>
          <p>
            Fabricamos productos para exteriores y superficies de uso intensivo,
            con foco en resistencia, terminacion y continuidad de suministro.
          </p>
        </div>
        <SiteImage
          src="/images/productos/piso-baldosas-exterior-hero.jpg"
          alt="Piso exterior terminado con baldosas de hormigon Rustikas"
        />
      </section>

      <section className="content-band">
        <SectionHeader title="Catalogo de modelos">
          Desliza para recorrer distintos modelos de baldosas de hormigon,
          colores y terminaciones disponibles.
        </SectionHeader>
        <HorizontalCarousel
          ariaLabel="Catalogo de baldosas"
          className="catalog-carousel"
        >
          {catalogModels.map((model) => (
            <article
              className={`info-card product-card carousel-card ${
                model.featured ? "featured-product-card" : ""
              }`}
              key={model.title}
            >
              <SiteImage src={model.image} alt={model.alt} />
              <h3>{model.title}</h3>
              <p>{model.description}</p>
            </article>
          ))}
        </HorizontalCarousel>
      </section>

      <section className="featured-product">
        <SiteImage
          src="/images/productos/catalogo-9-panes-gris.jpg"
          alt="Baldosa 9 panes gris homologada para veredas peatonales"
        />
        <div>
          <span className="eyebrow">Producto principal</span>
          <h2>Baldosa 9 panes gris homologada para veredas.</h2>
          <p>
            Es uno de nuestros productos de mayor rotacion para grandes
            barracas. Se utiliza en reparacion y construccion de veredas
            peatonales por su formato practico, resistencia y terminacion.
            Esta homologada por la IMM y ensayada en la Facultad de Ingenieria.
          </p>
          <a className="button" href={tileSalesWhatsappUrl}>
            Consultar por 9 panes gris
          </a>
        </div>
      </section>

      <section className="content-band">
        <SectionHeader
          eyebrow="Clientes de baldosas"
          title="Suministro para barracas y obras con demanda continua"
        >
          Nuestros modelos de baldosas son elegidos por empresas que trabajan
          con volumen, reposicion y obras peatonales.
        </SectionHeader>
        <ClientLogoGrid clients={tileClients} />
      </section>

      <section className="feature-section reverse">
        <div>
          <span className="eyebrow">Aplicaciones</span>
          <h2>Espacios exteriores, accesos y superficies exigidas.</h2>
          <p>
            Nuestros productos se adaptan a patios, veredas, accesos,
            circulaciones, espacios comunes y obras que requieren piezas
            resistentes y faciles de mantener.
          </p>
          <a className="button" href={tileSalesWhatsappUrl}>
            Consultar disponibilidad
          </a>
        </div>
        <SiteImage
          src="/images/productos/piso-baldosas-piscina.jpg"
          alt="Piso exterior con baldosas Rustikas terminado"
        />
      </section>

      <section className="content-band muted">
        <SectionHeader title="Produccion y modelos especiales">
          Fabricamos piezas en distintas texturas, colores y terminaciones,
          incluyendo baldosas tactiles para accesibilidad.
        </SectionHeader>
        <div className="project-grid">
          {productGallery.map((item) => (
            <article className="project-card" key={item.title}>
              <SiteImage src={item.image} alt={item.alt} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band">
        <SectionHeader title="Lineas de producto">
          Soluciones para particulares, constructoras, arquitectos, barracas y
          empresas.
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
    </>
  );
}
