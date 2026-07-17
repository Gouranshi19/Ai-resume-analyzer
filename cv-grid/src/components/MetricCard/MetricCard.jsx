import "./MetricCard.css";

function MetricCard({ accent, inverse, label, muted, value }) {
    return (
        <article
        className={`metric-card${accent ? " metric-card--accent" : ""}${inverse ? " metric-card--inverse" : ""}${muted ? " metric-card--muted" : ""}`}
        >
        <span>{label}</span>
        <strong>{value}</strong>
        </article>
    );
}

export default MetricCard;
