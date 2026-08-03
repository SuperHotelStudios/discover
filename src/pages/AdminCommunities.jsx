import { useEffect, useState } from "react";
import { api } from "../services/api";
import CommunityModerationCard from "../components/admin/CommunityModerationCard";

export default function AdminCommunities() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  async function loadCommunities() {
    try {
      const data = await api("/admin/communities");
      setCommunities(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCommunities();
  }, []);

  if (loading) {
    return (
      <section className="container py-5 text-center">
        <h2>Loading Communities...</h2>
      </section>
    );
  }

  return (
    <section className="container profile-page">
      <div className="glass-card profile-header p-5 mb-4 text-center">
        <h1>Community Moderation</h1>

        <p className="text-secondary mb-0">
          Manage all communities on Discover.
        </p>
      </div>

      <div className="glass-card p-3 mb-4">
        <input
          type="text"
          className="form-control custom-input"
          placeholder="🔍 Search community or advertiser..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="glass-card p-3 mb-4">
        <select
          className="form-select custom-input"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="ALL">All Communities</option>

          <option value="VERIFIED">Verified</option>

          <option value="FEATURED">Featured</option>

          <option value="HIDDEN">Hidden</option>
        </select>
      </div>

      {communities.length === 0 ? (
        <div className="glass-card p-5 text-center">
          <h3>No communities found.</h3>
        </div>
      ) : (
        communities
          .filter((community) => {
            const q = search.toLowerCase();

            const matchesSearch =
              community.name.toLowerCase().includes(q) ||
              community.createdBy.displayName.toLowerCase().includes(q);

            const matchesFilter =
              filter === "ALL" ||
              (filter === "VERIFIED" && community.verified) ||
              (filter === "FEATURED" && community.featured) ||
              (filter === "HIDDEN" && community.hidden);

            return matchesSearch && matchesFilter;
          })
          .map((community) => (
            <CommunityModerationCard
              key={community.id}
              community={community}
              refresh={loadCommunities}
            />
          ))
      )}
    </section>
  );
}
