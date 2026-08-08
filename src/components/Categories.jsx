import { Link } from "react-router-dom";
export default function Categories({ categories }) {
  const topCategories = categories.slice(0, 5);
  return (
    <section className="container py-4 py-md-5">
      <div className="text-center mb-4 mb-md-5">
        <h2 className="section-title">Explore Categories</h2>

        <p className="section-subtitle">Browse communities by category.</p>
      </div>

      <div className="row g-3 g-md-4">
        {topCategories.map((category) => (
          <div className="col-12 col-sm-6 col-lg-4" key={category.id}>
            <div className="glass-card category-card p-4 p-sm-5 h-100 d-flex flex-column">
              <div className="category-icon mb-3 mb-md-4">{category.icon}</div>

              <h3 className="fw-bold mb-2 mb-md-3">{category.name}</h3>

              <p className="text-secondary mb-3">
                Explore all {category.name.toLowerCase()} communities on
                Discover.
              </p>

              <Link
                to={`/servers?category=${encodeURIComponent(category.name)}`}
                className="btn-discover mt-auto text-decoration-none text-center"
              >
                Explore
              </Link>
            </div>
          </div>
        ))}
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="glass-card category-card p-4 p-sm-5 h-100 text-center d-flex flex-column">
            <div className="category-icon mb-3 mb-md-4">🌐</div>

            <h3 className="fw-bold mb-2 mb-md-3">Browse All</h3>

            <p className="text-secondary mb-3">
              Explore every category and discover thousands of communities.
            </p>

            <Link
              to="/servers"
              className="btn-discover mt-auto text-decoration-none text-center"
            >
              View All
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
