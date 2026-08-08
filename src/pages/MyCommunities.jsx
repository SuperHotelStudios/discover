import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { showSuccess, showError } from "../utils/toast";

export default function MyCommunities() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  useEffect(() => {
    async function loadCommunities() {
      try {
        const data = await api("/communities/my");
        setCommunities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadCommunities();
  }, []);

  async function handleDelete() {
    if (!selectedCommunity) return;

    try {
      const response = await api(`/communities/${selectedCommunity.id}`, {
        method: "DELETE",
      });

      setCommunities((prev) =>
        prev.filter((community) => community.id !== selectedCommunity.id)
      );

      setShowDeleteModal(false);
      setSelectedCommunity(null);

      showSuccess(response.message);
    } catch (err) {
      showError(err.message);
    }
  }

  if (loading) {
    return (
      <section className="container py-5 text-center">
        <h2>Loading...</h2>
      </section>
    );
  }

  return (
    <section className="container servers-page">
      <h1 className="section-title mb-5 text-center">My Communities</h1>

      {communities.length === 0 ? (
        <div className="glass-card p-5 text-center">
          <h4>No communities yet.</h4>

          <p className="text-secondary">
            Advertise your first community to see it here.
          </p>
        </div>
      ) : (
        communities.map((community) => (
          <div key={community.id} className="glass-card p-3 p-sm-4 mb-4">
            <div className="row align-items-center g-3 g-md-4">
              <div className="col-12 col-md-2 text-center">
                <img
                  src={community.logo}
                  className="details-logo mx-auto"
                  alt={community.name}
                />
              </div>

              <div className="col-12 col-md-6">
                <h3 className="mb-2">
                  {community.name}

                  {community.verified && (
                    <span className="verified-badge ms-2">✔ Verified</span>
                  )}

                  {community.featured && (
                    <span className="featured-badge ms-2">⭐ Featured</span>
                  )}

                  {community.hidden && (
                    <span className="badge bg-danger ms-2">🙈 Hidden</span>
                  )}
                </h3>

                <p>{community.description}</p>

                {community.hidden && (
                  <div className="alert alert-warning py-2 mt-3">
                    <strong>Hidden by Discover Staff</strong>

                    <div>
                      Your community is currently hidden from public users.
                    </div>
                  </div>
                )}

                <div className="text-secondary mt-2">
                  👥 {community.memberCount.toLocaleString()} Members
                </div>

                <div className="text-secondary">
                  ⭐ {(community.averageRating ?? 0).toFixed(1)}
                </div>

                <div className="text-secondary">
                  🏆 {(community.totalPoints ?? 0).toLocaleString()} Points
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="d-flex flex-column flex-sm-row flex-md-column flex-lg-row gap-2 justify-content-md-end">
                  <Link
                    to={`/server/${community.id}`}
                    className="btn-discover text-decoration-none text-center"
                  >
                    View
                  </Link>

                  <Link
                    to={`/communities/${community.id}/edit`}
                    className="btn-discover text-decoration-none text-center"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setSelectedCommunity(community);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal glass-card">
            <h3 className="mb-4">🗑 Delete Community</h3>

            <p>Are you sure you want to delete</p>

            <h5 className="fw-bold">"{selectedCommunity?.name}"</h5>

            <p className="text-secondary mt-3">This action cannot be undone.</p>

            <div className="d-flex justify-content-end gap-3 mt-4">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedCommunity(null);
                }}
              >
                Cancel
              </button>

              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
