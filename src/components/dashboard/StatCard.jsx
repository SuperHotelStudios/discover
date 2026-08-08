export default function StatCard({ icon, title, value, color = "" }) {
  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="glass-card dashboard-stat-card p-4 text-center h-100">
        <div className={`dashboard-stat-icon ${color}`}>
          <i className={`bi ${icon}`}></i>
        </div>

        <h2 className="fw-bold mt-3">
          {typeof value === "number" ? value.toLocaleString() : value}
        </h2>

        <p className="text-secondary mb-0">{title}</p>
      </div>
    </div>
  );
}
