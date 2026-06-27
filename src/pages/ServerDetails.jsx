import { useParams } from "react-router-dom";
import communities from "../data/communities";

export default function ServerDetails() {
  const { id } = useParams();

  const community = communities.find((c) => c.id === Number(id));

  if (!community) {
    return (
      <section className="container server-page">
        <div className="glass-card p-5 text-center">
          <h2>Community Not Found</h2>
          <p className="text-secondary">
            The requested community does not exist.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container server-page">
      <div className="glass-card server-card">
        <img
          src={community.banner}
          alt={community.name}
          className="server-banner"
        />

        <div className="server-content">
          <div className="server-header">
            <img
              src={community.logo}
              alt={community.name}
              className="server-logo"
            />

            <div>
              <div className="d-flex align-items-center gap-2">
                <h1 className="server-title mb-0">{community.name}</h1>

                {community.verified && (
                  <span className="verified-badge">✔</span>
                )}
              </div>

              <p className="text-secondary mb-0">{community.category}</p>
            </div>
          </div>

          <div className="server-stats">
            <div className="stat-box">
              <h5>👥 Members</h5>
              <p>{community.members.toLocaleString()}</p>
            </div>

            <div className="stat-box">
              <h5>🏆 Points</h5>
              <p>{community.points.toLocaleString()}</p>
            </div>

            <div className="stat-box">
              <h5>👤 Owner</h5>
              <p>{community.owner}</p>
            </div>
          </div>

          <div className="mt-4">
            <h4>About</h4>

            <p className="text-secondary">{community.description}</p>
          </div>

          <div className="server-tags">
            {community.tags.map((tag) => (
              <span key={tag} className="community-tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="text-center mt-5">
            <a
              href={community.invite}
              target="_blank"
              rel="noreferrer"
              className="btn-discover text-decoration-none"
            >
              <i className="bi bi-discord me-2"></i>
              Join Community
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
