import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import StatCard from "../components/dashboard/StatCard";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

      <div className="glass-card profile-header p-5 mb-4 text-center">
        <h1 className="fw-bold mb-3">🛠 Discover Control Center</h1>

        <p className="text-secondary mb-0">
          Manage communities, advertisements and the Discover platform.
        </p>
      </div>

      <div className="row g-4 mt-2">
        {/* LEFT */}

        <div className="col-lg-4">
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

        <div className="col-lg-8">
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

        <div className="glass-card p-4 mt-4">
          <h3 className="mb-4">🚨 Pending Actions</h3>

          <div className="glass-card p-3 mb-3 d-flex justify-content-between align-items-center">
            <div>
              <h5>🚩 Reports</h5>

              <div className="text-secondary">Review community reports</div>
            </div>

            <Link
              to="/admin/reports"
              className="btn-discover text-decoration-none"
            >
              Manage →
            </Link>
          </div>
        </div>

        <div className="glass-card p-4 mt-4">
          <h3 className="mb-4">Administration</h3>

          <div className="row g-3">
            <div className="col-md-3">
              <Link
                to="/admin/categories"
                className="analytics-card text-center text-decoration-none d-block p-4"
              >
                <i className="bi bi-tags analytics-icon"></i>

                <h5 className="mt-3">Categories</h5>
              </Link>
            </div>

            <div className="col-md-3">
              <Link
                to="/admin/reports"
                className="analytics-card text-center text-decoration-none d-block p-4"
              >
                <i className="bi bi-flag-fill analytics-icon"></i>

                <h5 className="mt-3">Reports</h5>
              </Link>
            </div>

            <div className="col-md-3">
              <Link
                to="/admin/users"
                className="analytics-card text-center text-decoration-none d-block p-4"
              >
                <i className="bi bi-people analytics-icon"></i>

                <h5 className="mt-3">Users</h5>
              </Link>
            </div>

            <div className="col-md-3">
              <Link
                to="/admin/communities"
                className="analytics-card text-center text-decoration-none d-block p-4"
              >
                <i className="bi bi-discord analytics-icon"></i>

                <h5 className="mt-3">Communities</h5>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
