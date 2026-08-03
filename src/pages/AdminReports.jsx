import { useEffect, useState } from "react";
import { api } from "../services/api";
import ReportCard from "../components/admin/ReportCard";

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [reason, setReason] = useState("ALL");

  const [status, setStatus] = useState("PENDING");

  async function loadReports(selectedStatus = status) {
    try {
      setLoading(true);

      const data = await api(`/reports?status=${selectedStatus}`);

      setReports(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports(status);
  }, [status]);

  function tabClass(value) {
    return value === status ? "btn-discover" : "btn btn-outline-light";
  }

  return (
    <section className="container profile-page">
      <div className="glass-card profile-header p-5 mb-4 text-center">
        <h1>Report Management</h1>

        <p className="text-secondary mb-0">
          Review and moderate community reports.
        </p>
      </div>

      <div className="glass-card p-3 mb-4">
        <input
          type="text"
          className="form-control custom-input"
          placeholder="🔍 Search community or reporter..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* STATUS FILTER */}

      <div className="glass-card p-3 mb-4">
        <div className="report-tabs d-flex gap-3 justify-content-center flex-wrap">
          <button
            className={status === "PENDING" ? "active" : ""}
            onClick={() => setStatus("PENDING")}
          >
            Pending
          </button>

          <button
            className={status === "RESOLVED" ? "active" : ""}
            onClick={() => setStatus("RESOLVED")}
          >
            Resolved
          </button>

          <button
            className={status === "REJECTED" ? "active" : ""}
            onClick={() => setStatus("REJECTED")}
          >
            Rejected
          </button>
        </div>
      </div>

      <div className="glass-card p-3 mb-4">
        <select
          className="form-select custom-input"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        >
          <option value="ALL">All Reasons</option>
          <option value="SPAM">Spam</option>
          <option value="SCAM">Scam</option>
          <option value="NSFW">NSFW</option>
          <option value="HARASSMENT">Harassment</option>
          <option value="HATE_SPEECH">Hate Speech</option>
          <option value="MISLEADING">Misleading</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      {loading ? (
        <div className="glass-card p-5 text-center">
          <h3>Loading Reports...</h3>
        </div>
      ) : reports.length === 0 ? (
        <div className="glass-card p-5 text-center">
          <h3>No {status.toLowerCase()} reports</h3>

          <p className="text-secondary">Everything looks good.</p>
        </div>
      ) : (
        reports
          .filter((report) => {
            const matchesSearch =
              report.community.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              report.reportedBy.displayName
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesReason = reason === "ALL" || report.reason === reason;

            return matchesSearch && matchesReason;
          })
          .map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              refresh={() => loadReports(status)}
            />
          ))
      )}
    </section>
  );
}
