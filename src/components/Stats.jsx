export default function Stats() {
  return (
    <section className="container my-5">
      <div className="row g-3 g-md-4 justify-content-center">

        <div className="col-12 col-sm-4">
          <div className="glass-card p-4 text-center">
            <h2 className="display-5 fw-bold stat-value stat-indigo">
              500+
            </h2>
            <p className="text-secondary mt-2 mb-0">
              Servers
            </p>
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="glass-card p-4 text-center">
            <h2 className="display-5 fw-bold stat-value stat-purple">
              25K+
            </h2>
            <p className="text-secondary mt-2 mb-0">
              Members
            </p>
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="glass-card p-4 text-center">
            <h2 className="display-5 fw-bold stat-value stat-cyan">
              100+
            </h2>
            <p className="text-secondary mt-2 mb-0">
              Advertisements
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}