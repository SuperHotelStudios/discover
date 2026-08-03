import { useState } from "react";
import { api } from "../../services/api";
import { showSuccess, showError } from "../../utils/toast";

export default function ReportDetailsModal({ show, onClose, report, refresh }) {
  const [note, setNote] = useState(report.adminNote || "");
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  async function reviewReport(action) {
    try {
      setLoading(true);

      const response = await api(`/reports/${report.id}/${action}`, {
        method: "PATCH",
        body: JSON.stringify({
          note,
        }),
      });

      showSuccess(response.message);

      refresh();
      onClose();
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  }

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
    <div className="modal-backdrop-custom">
      <div
        className="glass-card p-4"
        style={{
          maxWidth: "750px",
          width: "95%",
          margin: "5rem auto",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>🚩 Report Details</h2>

          <button className="btn-close btn-close-white" onClick={onClose} />
        </div>

        <div className="d-flex gap-4 align-items-start mb-4">
          <img
            src={report.community.logo}
            alt={report.community.name}
            style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              objectFit: "cover",
            }}
          />

          <div className="flex-grow-1">
            <h4>{report.community.name}</h4>

            <div className="text-secondary">
              👤 Advertiser:{" "}
              {report.community.createdBy?.displayName ?? "Unknown"}
            </div>

            <div className="text-secondary">
              🚩 Reported By: {report.reportedBy.displayName}
            </div>

            <div className="text-secondary">
              📅 Submitted: {new Date(report.createdAt).toLocaleString()}
            </div>

            <div className="mt-2">{getBadge(report.status)}</div>
          </div>
        </div>

        <hr />

        <div className="mb-3">
          <strong>Reason</strong>

          <p className="mt-2">{report.reason}</p>
        </div>

        <div className="mb-4">
          <strong>Description</strong>

          <p className="mt-2">
            {report.description || "No description provided."}
          </p>
        </div>

        <div className="mb-4">
          <label className="form-label">Admin Note</label>

          <textarea
            rows={5}
            className="form-control custom-input"
            placeholder="Write a note for the user..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button
            className="btn btn-danger"
            disabled={loading}
            onClick={() => reviewReport("reject")}
          >
            Reject
          </button>

          <button
            className="btn btn-success"
            disabled={loading}
            onClick={() => reviewReport("resolve")}
          >
            Resolve
          </button>
        </div>
      </div>
    </div>
  );
}
