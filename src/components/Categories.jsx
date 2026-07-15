import { Link } from "react-router-dom";
export default function Categories({ categories }) {
  const topCategories = categories.slice(0, 5);
  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h2 className="section-title">Explore Categories</h2>

        <p className="section-subtitle">Browse communities by category.</p>
      </div>

      <div className="row g-4">
        {topCategories.map((category) => (
          <div className="col-lg-4" key={category.id}>
            <div className="glass-card category-card p-5 h-100">
              <div className="category-icon mb-4">{category.icon}</div>

              <h3 className="fw-bold mb-3">{category.name}</h3>

              <p className="text-secondary">
                Explore all {category.name.toLowerCase()} communities on
                Discover.
              </p>

              <Link
                to={`/servers?category=${encodeURIComponent(category.name)}`}
                className="btn-discover mt-3 text-decoration-none"
              >
                Explore
              </Link>
            </div>
          </div>
        ))}
        <div className="col-lg-4">
          <div className="glass-card category-card p-5 h-100 text-center">
            <div className="category-icon mb-4">🌐</div>

            <h3 className="fw-bold mb-3">Browse All</h3>

            <p className="text-secondary">
              Explore every category and discover thousands of communities.
            </p>

            <Link
              to="/servers"
              className="btn-discover mt-3 text-decoration-none"
            >
              View All
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
