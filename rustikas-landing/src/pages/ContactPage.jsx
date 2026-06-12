import SectionHeader from "../components/SectionHeader.jsx";
import SiteImage from "../components/SiteImage.jsx";
import {
  technicalWhatsappUrl,
  tileSalesWhatsappUrl,
  worklogUrl,
} from "../siteData.js";

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div>
          <span className="eyebrow">Contacto</span>
          <h1>Hablemos de productos, obras o mantenimiento.</h1>
          <p>
            Contanos que necesitas fabricar, reparar o ejecutar. Te orientamos
            por el canal correspondiente y coordinamos el siguiente paso.
          </p>
          <div className="actions">
            <a className="button" href={tileSalesWhatsappUrl}>
              Ventas de baldosas
            </a>
            <a className="button secondary" href={technicalWhatsappUrl}>
              Departamento tecnico
            </a>
            <a className="ghost-link" href={worklogUrl}>
              Ingresar a WorkLog
            </a>
          </div>
        </div>
        <SiteImage
          src="/images/productos/contacto-productos-baldosas.jpg"
          alt="Baldosas Rustikas en proceso de produccion"
        />
      </section>

      <section className="content-band">
        <SectionHeader title="Para una respuesta mas precisa">
          Si consultas por WhatsApp, podes incluir fotos, ubicacion, medidas,
          tipo de superficie, plazos estimados o una descripcion breve del
          trabajo a realizar.
        </SectionHeader>
        <div className="contact-panels">
          <article className="info-card">
            <h3>Productos de hormigon</h3>
            <p>Baldosas, premoldeados, pavimentos y soluciones para exteriores.</p>
            <a className="text-link" href={tileSalesWhatsappUrl}>
              WhatsApp ventas: 094 941 396
            </a>
          </article>
          <article className="info-card">
            <h3>Soluciones industriales</h3>
            <p>Galpones, pisos, camaras de frio, ampliaciones y mantenimiento.</p>
            <a className="text-link" href={technicalWhatsappUrl}>
              Departamento tecnico: 094 509 299
            </a>
          </article>
        </div>
      </section>
    </>
  );
}
