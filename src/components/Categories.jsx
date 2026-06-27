import { Link } from "react-router-dom";
export default function Categories() {
  const categories = [
    {
      icon: "🎨",
      title: "Design",
      description:
        "Discover communities focused on GFX, UI/UX, branding and creative Roblox projects."
    },
    {
      icon: "💻",
      title: "Development",
      description:
        "Find scripting, programming and Roblox Studio development communities."
    },
    {
      icon: "🎭",
      title: "Roleplay",
      description:
        "Explore roleplay communities, emergency services, city roleplay and more."
    }
  ];

  return (
    <section className="container py-5">

      <div className="text-center mb-5">

        <h2 className="section-title">
          Explore Communities
        </h2>

        <p className="section-subtitle">
          Discover communities based on your interests.
        </p>

      </div>

      <div className="row g-4">

        {categories.map((category) => (
          <div className="col-lg-4" key={category.title}>

            <div className="glass-card category-card p-5 h-100">

              <div className="category-icon mb-4">
                {category.icon}
              </div>

              <h3 className="fw-bold mb-3">
                {category.title}
              </h3>

              <p className="text-secondary">
                {category.description}
              </p>

              <Link className="btn-discover mt-3">
                Explore
              </Link>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}