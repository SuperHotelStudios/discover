import { useEffect, useState } from "react";
import { api } from "../services/api";

import StatCard from "../components/dashboard/StatCard";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";

export default function CreatorDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await api("/dashboard");
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
        <h2>Loading Dashboard...</h2>
      </section>
    );
  }

  if (!dashboard) {
    return (
      <section className="container py-5 text-center">
        <h2>Please login to view your dashboard.</h2>
      </section>
    );
  }
  console.log("Dashboard:", dashboard);

  if (dashboard) {
    console.log("Views Chart:", dashboard.viewsChart);
    console.log("Clicks Chart:", dashboard.clicksChart);
  }
  return (
    <section className="container servers-page">
      <h1 className="section-title mb-5">📊 Creator Dashboard</h1>

      {/* Statistics */}

      <div className="row g-4 mb-5">
        <StatCard
          icon="bi-collection-fill"
          title="Communities"
          value={dashboard.statistics.communities}
        />

        <StatCard
          icon="bi-eye-fill"
          title="Views"
          value={dashboard.statistics.views}
        />

        <StatCard
          icon="bi-box-arrow-up-right"
          title="Invite Clicks"
          value={dashboard.statistics.clicks}
        />

        <StatCard
          icon="bi-heart-fill"
          title="Favorites"
          value={dashboard.statistics.favorites}
        />

        <StatCard
          icon="bi-chat-left-text-fill"
          title="Reviews"
          value={dashboard.statistics.reviews}
        />

        <StatCard
          icon="bi-star-fill"
          title="Average Rating"
          value={dashboard.statistics.rating.toFixed(1)}
        />
      </div>

      {/* Top Communities + Reviews */}

      <div className="row g-4 mb-5">
        <div className="col-lg-6">
          <div className="glass-card p-4 h-100">
            <h3 className="mb-4">🏆 Top Performing Communities</h3>

            {dashboard.topCommunities.length === 0 ? (
              <div className="text-center py-5">
                <h5>No communities yet.</h5>

                <p className="text-secondary">
                  Advertise your first community.
                </p>
              </div>
            ) : (
              dashboard.topCommunities.map((community, index) => (
                <div key={community.id}>
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={
                        community.logo ||
                        "https://placehold.co/100x100?text=Logo"
                      }
                      className="community-logo"
                      alt={community.name}
                    />

                    <div>
                      <h5 className="mb-1">
                        {index === 0 && "🥇"}
                        {index === 1 && "🥈"}
                        {index === 2 && "🥉"}
                        {index > 2 && "🏅"} {community.name}
                      </h5>

                      <small className="text-secondary">
                        {community.category}
                      </small>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="d-flex justify-content-between">
                      <span>🏆 Points</span>

                      <strong>{community.totalPoints.toLocaleString()}</strong>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>⭐ Rating</span>

                      <strong>{community.averageRating.toFixed(1)}</strong>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>📝 Reviews</span>

                      <strong>{community.totalReviews}</strong>
                    </div>
                  </div>

                  {index !== dashboard.topCommunities.length - 1 && <hr />}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Latest Reviews */}

        <div className="col-lg-6">
          <div className="glass-card p-4 h-100">
            <h3 className="mb-4">⭐ Latest Reviews</h3>

            {dashboard.latestReviews.length === 0 ? (
              <div className="text-center py-5">
                <h5>No Reviews Yet</h5>

                <p className="text-secondary">Reviews will appear here.</p>
              </div>
            ) : (
              dashboard.latestReviews.map((review) => (
                <div key={review.id}>
                  <div className="d-flex justify-content-between">
                    <strong>{review.reviewer.displayName}</strong>

                    <small className="text-secondary">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </small>
                  </div>

                  <div className="text-warning my-2">
                    {"★".repeat(review.rating)}

                    {"☆".repeat(5 - review.rating)}
                  </div>

                  <small className="text-secondary">
                    {review.community.name}
                  </small>

                  {review.comment && (
                    <p className="mt-2 mb-2">"{review.comment}"</p>
                  )}

                  <hr />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Charts */}

      <div className="row g-4">
        <div className="col-lg-6">
          <AnalyticsChart
            title="Views (Last 30 Days)"
            data={dashboard.viewsChart}
          />
        </div>

        <div className="col-lg-6">
          <AnalyticsChart
            title="Invite Clicks (Last 30 Days)"
            data={dashboard.clicksChart}
          />
        </div>
      </div>
    </section>
  );
}
