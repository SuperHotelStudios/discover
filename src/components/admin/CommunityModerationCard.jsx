import { api } from "../../services/api";
import { useState } from "react";
import DeleteCommunityModal from "./DeleteCommunityModal";
import CommunityDetailsModal from "./CommunityDetailsModal";
import { showSuccess, showError } from "../../utils/toast";

export default function CommunityModerationCard({ community, refresh }) {
  const [showDelete, setShowDelete] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  async function toggleVerify() {
    try {
      const response = await api(`/admin/communities/${community.id}/verify`, {
        method: "PATCH",
      });

      showSuccess(response.message);

      refresh();
    } catch (err) {
      showError(err.message);
    }
  }

  async function toggleFeature() {
    try {
      const response = await api(`/admin/communities/${community.id}/feature`, {
        method: "PATCH",
      });

      showSuccess(response.message);

      refresh();
    } catch (err) {
      showError(err.message);
    }
  }

  async function toggleHidden() {
    try {
      const response = await api(`/admin/communities/${community.id}/hide`, {
        method: "PATCH",
      });

      showSuccess(response.message);

      refresh();
    } catch (err) {
      showError(err.message);
    }
  }

  return (
    <>
      <div
        className="glass-card p-3 p-sm-4 mb-4 moderation-card"
        style={{ cursor: "pointer" }}
        onClick={() => setShowDetails(true)}
      >
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-3">
          <div className="d-flex gap-3 w-100">
            <img
              src={community.logo}
              alt={community.name}
              className="details-logo flex-shrink-0"
            />

            <div>
              <h4 className="mb-2">{community.name}</h4>

              <div className="text-secondary">
                👤 Advertiser: {community.createdBy.displayName}
              </div>

              <div className="text-secondary">📂 {community.category}</div>

              <div className="text-secondary">
                👥 {community.memberCount.toLocaleString()} Members
              </div>

              <div className="mt-3">
                {community.verified && (
                  <span className="badge bg-primary me-2">✔ Verified</span>
                )}

                {community.featured && (
                  <span className="badge bg-warning text-dark me-2">
                    ⭐ Featured
                  </span>
                )}

                {community.hidden && (
                  <span className="badge bg-danger">🙈 Hidden</span>
                )}
              </div>
            </div>
          </div>

          <div className="d-flex flex-row flex-wrap flex-lg-column gap-2 moderation-actions w-100 w-lg-auto">
            <button
              className="btn btn-outline-primary"
              onClick={(e) => {
                e.stopPropagation();
                toggleVerify();
              }}
            >
              {community.verified ? "Unverify" : "Verify"}
            </button>

            <button className="btn btn-outline-warning" onClick={toggleFeature}>
              {community.featured ? "Unfeature" : "Feature"}
            </button>

            <button
              className="btn btn-outline-secondary"
              onClick={toggleHidden}
            >
              {community.hidden ? "Restore" : "Hide"}
            </button>

            <button
              className="btn btn-danger"
              onClick={() => setShowDelete(true)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <DeleteCommunityModal
        show={showDelete}
        onClose={() => setShowDelete(false)}
        community={community}
        refresh={refresh}
      />
    </>
  );
}
