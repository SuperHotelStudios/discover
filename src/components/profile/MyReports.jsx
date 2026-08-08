import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      try {
        const data = await api("/reports/my");
        setReports(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  function getBadge(status) {
    switch (status) {
      case "RESOLVED":
        return <span className="badge bg-success">Resolved</span>;

      case "REJECTED":
        return <span className="badge bg-danger">Rejected</span>;

      default:
        return <span className="badge bg-warning text-dark">Pending</span>;
    }
  }

  return (
    <div className="glass-card p-4 mt-4">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-4">
        <h3>🚩 My Reports</h3>

        <Link to="/my-reports" className="text-decoration-none">
          View All →
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : reports.length === 0 ? (
        <p className="text-secondary">
          You haven't reported any communities yet.
        </p>
      ) : (
        reports.slice(0, 3).map((report) => (
          <div key={report.id} className="glass-card p-3 mb-3">
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
              <div className="d-flex align-items-center gap-3">
                <img
                  src={report.community.logo}
                  className="details-logo"
                  alt={report.community.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "12px"
                  }}
                />

                <div>
                  <h5 className="mb-1">{report.community.name}</h5>

                  <div className="text-secondary">🚩 {report.reason}</div>

                  <div className="text-secondary">
                    📅 {new Date(report.createdAt).toLocaleDateString()}
                  </div>

                  {report.description && (
                    <div className="mt-2">{report.description}</div>
                  )}

                  {report.adminNote && (
                    <div className="mt-2 text-info">
                      <strong>Admin Note:</strong> {report.adminNote}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-sm-end">
                {getBadge(report.status)}

                {report.reviewedBy && (
                  <div
                    className="text-secondary mt-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    By {report.reviewedBy.displayName}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
