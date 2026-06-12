export default function ClientLogoGrid({ clients }) {
  return (
    <div className="client-logo-grid">
      {clients.map((client) => {
        const content = (
          <>
            <div className="client-logo-media">
              <img src={client.logo} alt={client.name} loading="lazy" />
            </div>
            <figcaption>{client.name}</figcaption>
          </>
        );

        return client.url ? (
          <a
            className="client-logo-card"
            href={client.url}
            key={client.name}
            rel="noreferrer"
            target="_blank"
          >
            {content}
          </a>
        ) : (
          <figure className="client-logo-card" key={client.name}>
            {content}
          </figure>
        );
      })}
    </div>
  );
}
