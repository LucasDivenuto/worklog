export default function SiteImage({ src, alt, className = "" }) {
  return <img className={`site-image ${className}`.trim()} src={src} alt={alt} />;
}
