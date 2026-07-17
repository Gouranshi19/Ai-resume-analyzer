import "./ScoreCard.css";

function ScoreCard({ label, tone = "blue", value }) {
  return (
    <article className={`dashboard-score-card dashboard-score-card--${tone}`}>
      <div>
        <span>{label}</span>
        <strong>
          {value}
          <small>/100</small>
        </strong>
      </div>

      <div
        className="dashboard-score-card__track"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={value}
      >
        <span style={{ width: `${value}%` }} />
      </div>
    </article>
  );
}

export default ScoreCard;