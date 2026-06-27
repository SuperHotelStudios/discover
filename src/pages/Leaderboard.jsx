import { Link } from "react-router-dom";
import communities from "../data/communities";

export default function Leaderboard() {
  const leaderboard = [...communities].sort((a, b) => b.points - a.points);

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

  return (
    <section className="container leaderboard-page">
      <div className="text-center mb-5">
        <h1 className="section-title mt-3">Community Leaderboard</h1>

        <p className="section-subtitle">
          The highest ranked Roblox communities on Discover.
        </p>
      </div>

      <div className="leaderboard-list">
        {leaderboard.map((community) => (
          <div className="glass-card leaderboard-card" key={community.id}>
            <div className="leaderboard-rank">{getMedal(community.rank)}</div>

            <img
              src={community.logo}
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
                👥 {community.members.toLocaleString()} Members
              </div>
            </div>

            <div className="leaderboard-points">
              <div className="points-value">
                {community.points.toLocaleString()}
              </div>

              <small className="text-secondary">Points</small>
            </div>

            <Link
              to={`/server/${community.id}`}
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
