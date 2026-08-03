import { Link } from "react-router-dom";

export default function FeaturedServers({ communities }) {
  const featured = communities
    .filter((community) => community.featured)
    .sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <span className="hero-badge">Featured</span>

        <h2 className="section-title mt-3">Featured Communities</h2>

        <p className="section-subtitle">
          Discover some of the best communities on Discover.
        </p>
      </div>

      {featured.length === 0 ? (
        <div className="glass-card featured-empty text-center p-5">
          <div className="featured-icon mb-4">🚀</div>

          <h3 className="fw-bold mb-3">Your Community Could Be Here</h3>

          <p className="text-secondary mx-auto featured-text">
            Featured communities will appear here once they're selected.
          </p>

          <Link
            to="/advertise"
            className="btn-discover text-decoration-none mt-4 d-inline-block"
          >
            Submit Community
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {featured.slice(0, 3).map((community) => (
            <div className="col-lg-4" key={community.id}>
              <div className="glass-card community-card h-100">
                <img
                  src={community.banner}
                  className="community-banner"
                  alt={community.name}
                />

                <div className="p-4">
                  <img
                    src={community.logo}
                    className="community-logo mb-3"
                    alt={community.name}
                  />

                  <h4 className="mb-2">
                    {community.name}

                    {community.verified && (
                      <span className="verified-badge ms-2">✔ Verified</span>
                    )}

                    {community.featured && (
                      <span className="featured-badge ms-2">⭐ Featured</span>
                    )}
                  </h4>

                  <p className="text-secondary">{community.description}</p>

                  <Link
                    to={`/server/${community.id}`}
                    className="btn-discover text-decoration-none"
                  >
                    View Community
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
