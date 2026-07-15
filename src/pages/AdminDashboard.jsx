import { useEffect, useState } from "react";
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
    <section className="container servers-page">
      <h1 className="section-title mb-5">🛠 Admin Dashboard</h1>

      <div className="col-lg-4 col-md-6"></div>
      <div className="row g-4 justify-content-center">
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
      </div>
    </section>
  );
}
