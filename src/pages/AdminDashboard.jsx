import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import StatCard from "../components/dashboard/StatCard";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await api("/admin/dashboard");
        setDashboard(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <section className="container py-5 text-center">
        <h2>Loading Admin Dashboard...</h2>
      </section>
    );
  }

  return (
    <section className="container profile-page">
      {/* HEADER */}

      <div className="glass-card profile-header p-4 p-sm-5 mb-4 text-center">
        <h1 className="fw-bold mb-3">🛠 Discover Control Center</h1>

        <p className="text-secondary mb-0">
          Manage communities, advertisements and the Discover platform.
        </p>
      </div>

      <div className="row g-4 mt-2">
        {/* LEFT */}

        <div className="col-12 col-lg-4">
          <div className="glass-card p-4 h-100">
            <h3 className="mb-4">Administrator</h3>

            <div className="profile-item">
              <strong>Role</strong>
              <div>Administrator</div>
            </div>

            <hr />

            <div className="profile-item">
              <strong>System</strong>
              <div>Discover v1</div>
            </div>

            <hr />

            <div className="profile-item">
              <strong>Backend</strong>
              <div>NestJS</div>
            </div>

            <hr />

            <div className="profile-item">
              <strong>Database</strong>
              <div>MariaDB</div>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="col-12 col-lg-8">
          {/* Statistics */}

          <div className="glass-card p-4">
            <h3 className="mb-4">Platform Statistics</h3>

            <div className="row g-3">
              <StatCard
                icon="bi-people-fill"
                title="Users"
                value={dashboard.statistics.users}
              />

              <StatCard
                icon="bi-discord"
                title="Communities"
                value={dashboard.statistics.communities}
              />

              <StatCard
                icon="bi-megaphone-fill"
                title="Advertisements"
                value={dashboard.statistics.advertisements}
              />

              <StatCard
                icon="bi-patch-check-fill"
                title="Verified"
                value={dashboard.statistics.verified}
              />

              <StatCard
                icon="bi-star-fill"
                title="Featured"
                value={dashboard.statistics.featured}
              />

              <StatCard
                icon="bi-tags-fill"
                title="Categories"
                value={dashboard.statistics.categories}
              />
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="glass-card p-3 p-sm-4 mt-4">
            <h3 className="mb-4">🚨 Pending Actions</h3>

            <div className="glass-card p-3 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
              <div>
                <h5>🚩 Reports</h5>

                <div className="text-secondary">Review community reports</div>
              </div>

              <Link
                to="/admin/reports"
                className="btn-discover text-decoration-none text-center w-100 w-sm-auto"
              >
                Manage →
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="glass-card p-3 p-sm-4 mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="mb-0">Partner Departure History</h3>
              <span className="text-secondary">
                {dashboard.statistics.partnerLeftEvents?.length || 0} recent
              </span>
            </div>

            {!dashboard.statistics.partnerLeftEvents?.length ? (
              <p className="text-secondary mb-0">
                No partner departures recorded yet.
              </p>
            ) : (
              <div className="row g-3">
                {dashboard.statistics.partnerLeftEvents.map((event) => (
                  <div className="col-12 col-xl-6" key={event.id}>
                    <article className="analytics-card p-3 h-100">
                      <div className="d-flex gap-3">
                        {event.banner ? (
                          <img
                            src={event.banner}
                            alt=""
                            width="96"
                            height="64"
                            style={{ objectFit: "cover", borderRadius: "6px" }}
                          />
                        ) : null}
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between gap-2">
                            <strong>{event.serverName}</strong>
                            <span className="text-secondary small">
                              {new Date(event.occurredAt).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-secondary mt-1">
                            Partner: {event.username}
                          </div>
                          <div className="text-secondary small mt-1">
                            {event.reason}
                          </div>
                          <div className="small mt-2">
                            Points rolled back: {event.pointsRolledBack}
                          </div>
                          {event.deliveries?.length ? (
                            <div className="small mt-2">
                              <strong>Admin notifications</strong>
                              <div className="d-flex flex-wrap gap-2 mt-1">
                                {event.deliveries.map((delivery) => (
                                  <span
                                    className={`badge ${delivery.status === "SENT" ? "text-bg-success" : "text-bg-danger"}`}
                                    key={delivery.id}
                                    title={delivery.errorMessage || ""}
                                  >
                                    {delivery.adminUsername}: {delivery.status}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="text-secondary small mt-2">
                              Admin notifications: pending
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="col-12">
          <div className="glass-card p-3 p-sm-4 mt-4">
            <h3 className="mb-4">Administration</h3>

            <div className="row g-3">
              <div className="col-6 col-md-3">
                <Link
                  to="/admin/categories"
                  className="analytics-card text-center text-decoration-none d-block p-4"
                >
                  <i className="bi bi-tags analytics-icon"></i>

                  <h5 className="mt-3">Categories</h5>
                </Link>
              </div>

              <div className="col-6 col-md-3">
                <Link
                  to="/admin/reports"
                  className="analytics-card text-center text-decoration-none d-block p-4"
                >
                  <i className="bi bi-flag-fill analytics-icon"></i>

                  <h5 className="mt-3">Reports</h5>
                </Link>
              </div>

              <div className="col-6 col-md-3">
                <Link
                  to="/admin/users"
                  className="analytics-card text-center text-decoration-none d-block p-4"
                >
                  <i className="bi bi-people analytics-icon"></i>

                  <h5 className="mt-3">Users</h5>
                </Link>
              </div>

              <div className="col-6 col-md-3">
                <Link
                  to="/admin/communities"
                  className="analytics-card text-center text-decoration-none d-block p-4"
                >
                  <i className="bi bi-discord analytics-icon"></i>

                  <h5 className="mt-3">Communities</h5>
                </Link>
              </div>

              <div className="col-6 col-md-3">
                <Link
                  to="/admin/transcripts"
                  className="analytics-card text-center text-decoration-none d-block p-4"
                >
                  <i className="bi bi-journal-text analytics-icon"></i>

                  <h5 className="mt-3">Transcripts</h5>
                </Link>
              </div>

              <div className="col-6 col-md-3">
                <Link
                  to="/admin/audit-logs"
                  className="analytics-card text-center text-decoration-none d-block p-4"
                >
                  <i className="bi bi-shield-check analytics-icon"></i>
                  <h5 className="mt-3">Audit logs</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
