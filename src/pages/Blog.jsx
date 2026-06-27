import { Link } from "react-router-dom";

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "Welcome to Discover",
      description:
        "Discover is now live! Start exploring Roblox communities or submit your own.",
      date: "June 2026",
      category: "Announcement",
    },
    {
      id: 2,
      title: "How Community Verification Works",
      description:
        "Learn how communities can become verified and earn more visibility.",
      date: "Coming Soon",
      category: "Guide",
    },
    {
      id: 3,
      title: "Featured Communities Program",
      description:
        "Find out how featured communities are selected every month.",
      date: "Coming Soon",
      category: "Updates",
    },
  ];

  return (
    <section className="container blog-page">
      <div className="text-center mb-5">
        <h1 className="section-title mt-3">Blog & Updates</h1>

        <p className="section-subtitle">
          Stay updated with Discover announcements and Roblox community news.
        </p>
      </div>

      <div className="row g-4">
        {posts.map((post) => (
          <div className="col-lg-4" key={post.id}>
            <div className="glass-card blog-card h-100 p-4">
              <span className="community-tag">{post.category}</span>

              <h3 className="fw-bold mt-4">{post.title}</h3>

              <p className="text-secondary mt-3">{post.description}</p>

              <div className="mt-auto">
                <small className="text-secondary">{post.date}</small>
              </div>

              <Link
                to="#"
                className="btn-discover text-decoration-none mt-4 d-inline-block"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
