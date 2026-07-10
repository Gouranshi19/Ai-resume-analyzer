import './FeatureCard.css'

function FeatureCard({ description, icon, linkHref, linkLabel, title }) {
  return (
    <article className="feature-card">
      <span aria-hidden="true" className="feature-card__icon">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={linkHref}>{linkLabel} <span aria-hidden="true">→</span></a>
    </article>
  )
}

export default FeatureCard