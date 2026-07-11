import './ScoreCard.css'

function ScoreCard({ label, tone = 'blue', value }) {
  return (
    <article className={`score-card score-card--${tone}`}>
      <div><span>{label}</span><strong>{value}<small>/100</small></strong></div>
      <div aria-label={`${label}: ${value} out of 100`} aria-valuemax="100" aria-valuemin="0" aria-valuenow={value} className="score-card__track" role="progressbar"><span style={{ width: `${value}%` }} /></div>
    </article>
  )
}

export default ScoreCard