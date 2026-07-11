import './StepCard.css'

function StepCard({ number, title, description }) {
  return <article className="step-card"><span>{number}</span><h3>{title}</h3><p>{description}</p></article>
}

export default StepCard