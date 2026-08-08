import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const data = await api("/communities");

        setLeaderboard(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);
  const getMedal = (rank) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  if (loading) {
    return (
      <section className="container py-5 text-center">
        <h2>Loading...</h2>
      </section>
    );
  }

  return (
    <section className="container leaderboard-page">
      <div className="text-center mb-5">
        <h1 className="section-title mt-3">Community Leaderboard</h1>

        <p className="section-subtitle">
          The highest ranked Roblox communities on Discover.
        </p>
      </div>

      <div className="leaderboard-list">
        {leaderboard.length === 0 ? (
          <div className="glass-card leaderboard-empty">
            <div className="leaderboard-empty-icon">🏆</div>
            <h3 className="leaderboard-empty-title">
              No communities ranked yet
            </h3>
            <p className="leaderboard-empty-text">
              This leaderboard is empty right now. Add your community and get it
              featured to claim the top spot.
            </p>
            <Link to="/servers" className="btn-discover text-decoration-none">
              Explore communities
            </Link>
          </div>
        ) : (
          leaderboard.map((community, index) => (
            <div
              className="glass-card leaderboard-card p-3 p-sm-4"
              key={community.id}
            >
              <div className="leaderboard-rank fw-bold">
                {getMedal(index + 1)}
              </div>

              <img
                src={community.logo || "https://placehold.co/100x100?text=Logo"}
                alt={community.name}
                className="leaderboard-logo"
              />

              <div className="leaderboard-info">
                <h4 className="fw-bold mb-1 d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start gap-1">
                  {community.name}

                  {community.verified && (
                    <span className="verified-badge">✔ Verified</span>
                  )}

                  {community.featured && (
                    <span className="featured-badge">⭐ Featured</span>
                  )}
                </h4>

                <div className="d-flex flex-wrap justify-content-center justify-content-sm-start gap-3 mt-2">
                  <span className="text-secondary">
                    👥 {community.memberCount.toLocaleString()} Members
                  </span>

                  <span className="text-secondary">
                    👁 {community.views.toLocaleString()} Views
                  </span>

                  <span className="text-secondary">
                    ❤️ {community.favorites.toLocaleString()} Favorites
                  </span>

                  <span className="text-secondary">
                    ⭐ {community.averageRating.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="leaderboard-points">
                <div className="points-value">
                  {community.totalPoints.toLocaleString()}
                </div>

                <small className="text-secondary">Points</small>
              </div>

              <Link
                to={`/server/${community.id}`}
                className="btn-discover text-decoration-none text-center w-100 w-sm-auto"
              >
                View
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
