import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { showError } from "../utils/toast";

export default function AdminTranscripts() {
  const { loading, isAuthenticated, user } = useAuth();
  const [transcripts, setTranscripts] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const [filters, setFilters] = useState({
    type: "",
    user: "",
    staff: "",
    from: "",
    to: "",
  });

  async function loadTranscripts(nextFilters = filters, nextPage = page) {
    try {
      setPageLoading(true);
      const params = new URLSearchParams({
        ...Object.fromEntries(
          Object.entries(nextFilters).filter(([, value]) => value)
        ),
        page: String(nextPage),
        limit: String(pageSize),
      });
      const data = await api(
        `/admin/transcripts${params.toString() ? `?${params}` : ""}`
      );
      setTranscripts(data.items || []);
      setPage(data.page || nextPage);
      setTotalPages(data.totalPages || 1);
      if ((data.items || []).length) {
        setSelectedId(data.items[0].id);
      }
    } catch (err) {
      showError(err.message);
    } finally {
      setPageLoading(false);
    }
  }

  function updateFilter(event) {
    const nextFilters = { ...filters, [event.target.name]: event.target.value };
    setFilters(nextFilters);
    setPage(1);
    loadTranscripts(nextFilters, 1);
  }

  function exportTranscript(transcript) {
    const header = [
      "DISCOVER.GG TICKET TRANSCRIPT",
      "================================",
      `Ticket: ${transcript.ticketName}`,
      `Type: ${transcript.ticketType}`,
      `Owner: ${transcript.ownerUsername || "Unknown user"}`,
      `Closed by: ${transcript.closedBy || "Unknown staff member"}`,
      `Created: ${new Date(transcript.createdAt).toLocaleString()}`,
      "",
      transcript.transcriptText,
    ].join("\n");
    const blob = new Blob([header], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${transcript.ticketName || "ticket-transcript"}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadTranscripts();
    }
  }, [isAuthenticated]);

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "ADMIN" && user?.role !== "OWNER") {
    return (
      <section className="container py-5 text-center">
        <h2>Access Denied</h2>
      </section>
    );
  }

  const selectedTranscript =
    transcripts.find((transcript) => transcript.id === selectedId) ||
    transcripts[0] ||
    null;

  return (
    <section className="container profile-page transcript-page">
      <div className="transcript-heading mb-4">
        <div>
          <span className="transcript-kicker">Support archive</span>
          <h1 className="fw-bold mb-2">Ticket transcripts</h1>
          <p className="text-secondary mb-0">
            Permanent, read-only records of closed support conversations.
          </p>
        </div>
        <div className="transcript-count">
          {transcripts.length} on this page
        </div>
      </div>

      <div className="transcript-toolbar mb-4">
        <div className="transcript-filter-grid">
          <div className="transcript-filter-field">
            <select
              className="form-select transcript-control"
              name="type"
              value={filters.type}
              onChange={updateFilter}
            >
              <option value="">All types</option>
              <option value="general">General</option>
              <option value="partnership">Partnership</option>
              <option value="management">Management</option>
            </select>
          </div>
          <div className="transcript-filter-field">
            <input
              className="form-control transcript-control"
              name="user"
              value={filters.user}
              onChange={updateFilter}
              placeholder="User"
            />
          </div>
          <div className="transcript-filter-field">
            <input
              className="form-control transcript-control"
              name="staff"
              value={filters.staff}
              onChange={updateFilter}
              placeholder="Staff member"
            />
          </div>
          <div className="transcript-filter-field">
            <input
              className="form-control transcript-control"
              type="date"
              name="from"
              value={filters.from}
              onChange={updateFilter}
            />
          </div>
          <div className="transcript-filter-field">
            <input
              className="form-control transcript-control"
              type="date"
              name="to"
              value={filters.to}
              onChange={updateFilter}
            />
          </div>
          <div className="transcript-filter-actions">
            <button
              className="btn btn-outline-light transcript-clear"
              type="button"
              onClick={() => {
                const cleared = {
                  type: "",
                  user: "",
                  staff: "",
                  from: "",
                  to: "",
                };
                setFilters(cleared);
                setPage(1);
                loadTranscripts(cleared, 1);
              }}
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>

      {pageLoading ? (
        <div className="transcript-empty p-5 text-center">
          <h3>Loading transcripts...</h3>
        </div>
      ) : transcripts.length === 0 ? (
        <div className="glass-card p-5 text-center">
          <h3>No transcripts yet</h3>
          <p className="text-secondary mb-0">
            Support tickets will appear here once they are created.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <div className="transcript-list-panel h-100">
              <div className="transcript-panel-heading">
                <div>
                  <span className="transcript-kicker">Archive</span>
                  <h2>Recent tickets</h2>
                </div>
                <span className="transcript-total">
                  {totalPages > 1
                    ? `${page}/${totalPages}`
                    : transcripts.length}
                </span>
              </div>
              <div className="transcript-list">
                {transcripts.map((transcript) => (
                  <div
                    key={transcript.id}
                    className={`transcript-list-item ${selectedTranscript?.id === transcript.id ? "is-selected" : ""}`}
                  >
                    <button
                      type="button"
                      className="transcript-select"
                      onClick={() => setSelectedId(transcript.id)}
                    >
                      <strong>{transcript.ticketName}</strong>
                      <span>
                        {transcript.ticketType} <i />{" "}
                        {new Date(transcript.createdAt).toLocaleDateString()}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="transcript-export"
                      onClick={() => exportTranscript(transcript)}
                    >
                      Export
                    </button>
                  </div>
                ))}
              </div>
              <div className="transcript-pagination">
                <button
                  className="btn btn-sm btn-outline-light"
                  type="button"
                  disabled={page <= 1}
                  onClick={() => loadTranscripts(filters, page - 1)}
                >
                  ← Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  className="btn btn-sm btn-outline-light"
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => loadTranscripts(filters, page + 1)}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <div className="transcript-reader p-3 p-sm-4 h-100">
              {selectedTranscript && (
                <>
                  <div className="transcript-reader-heading mb-3">
                    <div>
                      <h3 className="mb-1">{selectedTranscript.ticketName}</h3>
                      <div className="text-secondary">
                        {selectedTranscript.ticketType} •{" "}
                        {selectedTranscript.ownerUsername || "Unknown user"}
                      </div>
                    </div>
                    <span className="transcript-date">
                      {new Date(
                        selectedTranscript.createdAt
                      ).toLocaleDateString()}
                    </span>
                    <button
                      className="btn btn-sm btn-outline-light transcript-reader-export"
                      type="button"
                      onClick={() => exportTranscript(selectedTranscript)}
                    >
                      Export TXT
                    </button>
                  </div>

                  <pre className="transcript-content">
                    {selectedTranscript.transcriptText}
                  </pre>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
