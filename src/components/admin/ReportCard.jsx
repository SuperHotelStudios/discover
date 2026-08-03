import { useState } from "react";
import ReportDetailsModal from "./ReportDetailsModal";

export default function ReportCard({ report, refresh }) {
  const [showDetails, setShowDetails] = useState(false);

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
    <>
      <div className="glass-card p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <img
              src={report.community.logo}
              alt={report.community.name}
              className="details-logo"
              style={{
                width: "70px",
                height: "70px",
                objectFit: "cover",
              }}
            />

            <div>
              <h5 className="mb-1">{report.community.name}</h5>

              <div className="text-secondary">🚩 {report.reason}</div>

              <div className="text-secondary">
                👤 Reported by <strong>{report.reportedBy.displayName}</strong>
              </div>

              <div className="text-secondary">
                📅 {new Date(report.createdAt).toLocaleDateString()}
              </div>

              {report.description && (
                <div className="mt-2">
                  {report.description.length > 100
                    ? report.description.substring(0, 100) + "..."
                    : report.description}
                </div>
              )}
            </div>
          </div>

          <div className="text-end">
            <div className="mb-3">{getBadge(report.status)}</div>

            <button
              className="btn-discover"
              onClick={() => setShowDetails(true)}
            >
              View Details →
            </button>
          </div>
        </div>
      </div>

      <ReportDetailsModal
        show={showDetails}
        onClose={() => setShowDetails(false)}
        report={report}
        refresh={refresh}
      />
    </>
  );
}
