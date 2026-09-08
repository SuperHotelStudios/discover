import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { showError } from "../utils/toast";

export default function AdminAuditLogs() {
  const { loading, isAuthenticated, user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    action: "",
    executor: "",
    target: "",
    from: "",
    to: "",
  });

  async function loadLogs(nextFilters = filters, nextPage = page) {
    try {
      setPageLoading(true);
      const params = new URLSearchParams({
        ...Object.fromEntries(
          Object.entries(nextFilters).filter(([, value]) => value)
        ),
        page: String(nextPage),
        limit: "10",
      });
      const data = await api(`/admin/audit-logs?${params}`);
      setLogs(data.items || []);
      setPage(data.page || nextPage);
      setTotalPages(data.totalPages || 1);
      setSelectedId(data.items?.[0]?.id || null);
    } catch (error) {
      showError(error.message);
    } finally {
      setPageLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) loadLogs();
  }, [isAuthenticated]);

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== "ADMIN" && user?.role !== "OWNER") {
    return (
      <section className="container py-5 text-center">
        <h2>Access Denied</h2>
      </section>
    );
  }

  const selected = logs.find((log) => log.id === selectedId) || logs[0];
  const updateFilter = (event) => {
    const next = { ...filters, [event.target.name]: event.target.value };
    setFilters(next);
    setPage(1);
    loadLogs(next, 1);
  };
  const clearFilters = () => {
    const empty = { action: "", executor: "", target: "", from: "", to: "" };
    setFilters(empty);
    loadLogs(empty, 1);
  };

  return (
    <section className="container profile-page transcript-page">
      <div className="transcript-heading mb-4">
        <div>
          <span className="transcript-kicker">System records</span>
          <h1 className="fw-bold mb-2">Audit logs</h1>
          <p className="text-secondary mb-0">
            Read-only records of activity sent to the Discord audit channel.
          </p>
        </div>
        <div className="transcript-count">{logs.length} on this page</div>
      </div>
      <div className="transcript-toolbar mb-4">
        <div className="transcript-filter-grid audit-filter-grid">
          <select
            className="form-select transcript-control"
            name="action"
            value={filters.action}
            onChange={updateFilter}
          >
            <option value="">All actions</option>
            <option value="10">Guild update</option>
            <option value="11">Channel create</option>
            <option value="12">Channel update</option>
            <option value="13">Channel delete</option>
            <option value="72">Message delete</option>
          </select>
          <input
            className="form-control transcript-control"
            name="executor"
            value={filters.executor}
            onChange={updateFilter}
            placeholder="Executor"
          />
          <input
            className="form-control transcript-control"
            name="target"
            value={filters.target}
            onChange={updateFilter}
            placeholder="Target"
          />
          <input
            className="form-control transcript-control"
            type="date"
            name="from"
            value={filters.from}
            onChange={updateFilter}
          />
          <input
            className="form-control transcript-control"
            type="date"
            name="to"
            value={filters.to}
            onChange={updateFilter}
          />
          <button
            className="btn btn-outline-light transcript-clear"
            type="button"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </div>
      </div>
      {pageLoading ? (
        <div className="loading-screen">
          <h3>Loading audit logs...</h3>
        </div>
      ) : !logs.length ? (
        <div className="transcript-empty p-5 text-center">
          <h3>No audit logs found</h3>
          <p className="text-secondary mb-0">
            New Discord activity will appear here after it is recorded.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <div className="transcript-list-panel h-100">
              <div className="transcript-panel-heading">
                <div>
                  <span className="transcript-kicker">Archive</span>
                  <h2>Recent activity</h2>
                </div>
                <span className="transcript-total">
                  {page}/{totalPages}
                </span>
              </div>
              <div className="transcript-list">
                {logs.map((log) => (
                  <button
                    key={log.id}
                    type="button"
                    className={`audit-list-item ${selected?.id === log.id ? "is-selected" : ""}`}
                    onClick={() => setSelectedId(log.id)}
                  >
                    <strong>
                      {log.logText?.split("\n")[0] || `Action ${log.action}`}
                    </strong>
                    <span>
                      Action {log.action} <i />{" "}
                      {new Date(log.createdAt).toLocaleDateString()}
                    </span>
                  </button>
                ))}
              </div>
              <div className="transcript-pagination">
                <button
                  className="btn btn-sm btn-outline-light"
                  disabled={page <= 1}
                  onClick={() => loadLogs(filters, page - 1)}
                >
                  ← Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  className="btn btn-sm btn-outline-light"
                  disabled={page >= totalPages}
                  onClick={() => loadLogs(filters, page + 1)}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <div className="transcript-reader p-3 p-sm-4 h-100">
              {selected && (
                <>
                  <div className="transcript-reader-heading mb-3">
                    <div>
                      <span className="transcript-kicker">Audit event</span>
                      <h3 className="mb-1">
                        {selected.logText?.split("\n")[0] ||
                          `Action ${selected.action}`}
                      </h3>
                      <div className="text-secondary">
                        Action {selected.action}{" "}
                        {selected.executorName
                          ? `• ${selected.executorName}`
                          : ""}
                      </div>
                    </div>
                    <span className="transcript-date">
                      {new Date(selected.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <pre className="transcript-content">{selected.logText}</pre>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
