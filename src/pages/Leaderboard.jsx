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
        {leaderboard.map((community, index) => (
          <div className="glass-card leaderboard-card" key={community.id}>
            <div className="leaderboard-rank">{getMedal(index + 1)}</div>

            <img
              src={community.logo || "https://placehold.co/100x100?text=Logo"}
              alt={community.name}
              className="leaderboard-logo"
            />

            <div className="leaderboard-info">
              <h4 className="fw-bold mb-1">
                {community.name}

                {community.featured && (
                  <span className="featured-badge ms-2">⭐ Featured</span>
                )}
              </h4>

              <div className="text-secondary">
                👥 {community.memberCount.toLocaleString()} Members
              </div>

              <div className="text-secondary">
                👁 {community.views.toLocaleString()} Views
              </div>

              <div className="text-secondary">
                ❤️ {community.favorites.toLocaleString()} Favorites
              </div>

              <div className="text-secondary">
                ⭐ {community.averageRating.toFixed(1)}
              </div>
            </div>

            <div className="leaderboard-points">
              <div className="points-value">
                {community.totalPoints.toLocaleString()}
              </div>

              <small className="text-secondary">Points</small>
            </div>

            <Link
              to={`/servers/${community.id}`}
              className="btn-discover text-decoration-none"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
