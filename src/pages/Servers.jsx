import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../services/api";

export default function Servers() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function loadData() {
      try {
        const communityData = await api("/communities");
        const categoryData = await api("/categories");

        setCommunities(communityData);
        setCategories(categoryData);

        const searchQuery = searchParams.get("search");

        const categoryQuery = searchParams.get("category");

        if (searchQuery) {
          setSearch(searchQuery);
        }

        if (categoryQuery) {
          setCategory(categoryQuery);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [searchParams]);

  const filteredCommunities = communities.filter((community) => {
    const matchesSearch =
      community.name.toLowerCase().includes(search.toLowerCase()) ||
      community.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || community.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <section className="container servers-page text-center py-5">
        <h2>Loading communities...</h2>
      </section>
    );
  }
  return (
    <section className="container servers-page">
      <div className="text-center mb-5">
        <h1 className="section-title">Communities</h1>

        <p className="section-subtitle">
          Discover Roblox communities and find your next place to connect.
        </p>
      </div>

      <div className="hero-search servers-search mb-4">
        <i className="bi bi-search"></i>

        <input
          type="text"
          placeholder="Search communities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
        <button
          className={`category-filter ${
            category === "All" ? "active-filter" : ""
          }`}
          onClick={() => setCategory("All")}
        >
          🌐 All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-filter ${
              category === cat.name ? "active-filter" : ""
            }`}
            onClick={() => setCategory(cat.name)}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {filteredCommunities.length === 0 ? (
        <div className="glass-card text-center p-5 empty-state">
          <div className="featured-icon mb-3">🔍</div>

          <h3 className="fw-bold">No Communities Found</h3>

          <p className="text-secondary">
            Try changing your search or category filter.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredCommunities.map((community) => (
            <div className="col-lg-4" key={community.id}>
              <div className="glass-card community-card h-100">
                <Link
                  to={`/server/${community.id}`}
                  className="text-decoration-none text-white"
                >
                  <img
                    src={
                      community.banner ||
                      "https://placehold.co/800x250?text=Community+Banner"
                    }
                    alt={community.name}
                    className="community-banner"
                  />

                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <img
                        src={
                          community.logo ||
                          "https://placehold.co/100x100?text=Logo"
                        }
                        alt={community.name}
                        className="community-logo"
                      />

                      <div>
                        <h4 className="fw-bold mb-0">{community.name}</h4>

                        <span className="community-category-badge">
                          {
                            categories.find(
                              (c) => c.name === community.category
                            )?.icon
                          }{" "}
                          {community.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-secondary">{community.description}</p>
                  </div>
                </Link>

                <div className="text-center p-4 pt-0">
                  <a
                    href={community.inviteLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-discover btn-sm text-decoration-none"
                  >
                    <i className="bi bi-discord me-2"></i>
                    Join Community
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
