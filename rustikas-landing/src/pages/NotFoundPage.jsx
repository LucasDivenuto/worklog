import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="page-hero compact">
      <div>
        <span className="eyebrow">404</span>
        <h1>Pagina no encontrada.</h1>
        <p>La direccion ingresada no existe o fue movida.</p>
        <Link className="button" to="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
