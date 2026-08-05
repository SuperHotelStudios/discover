import { useState } from "react";
import { api } from "../../services/api";
import { showSuccess, showError } from "../../utils/toast";

export default function DeleteCommunityModal({
  show,
  onClose,
  community,
  refresh,
}) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  async function deleteCommunity() {
    if (!reason.trim()) {
      showError("Please provide a reason for deleting this community.");
      return;
    }

    try {
      setLoading(true);

      const response = await api(`/admin/communities/${community.id}`, {
        method: "DELETE",
        body: JSON.stringify({
          reason,
        }),
      });

      showSuccess(response.message);

      refresh();

      onClose();
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-backdrop-custom">
      <div
        className="glass-card p-4"
        style={{
          maxWidth: "650px",
          width: "95%",
          margin: "6rem auto",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Delete Community</h2>

          <button className="btn-close btn-close-white" onClick={onClose} />
        </div>

        <div className="text-center mb-4">
          <img
            src={community.logo}
            alt={community.name}
            style={{
              width: 90,
              height: 90,
              borderRadius: 18,
              objectFit: "cover",
            }}
          />

          <h3 className="mt-3">{community.name}</h3>

          <div className="text-secondary">
            Advertiser: <strong>{community.createdBy.displayName}</strong>
          </div>
        </div>

        <div className="alert alert-danger">
          <strong>Warning</strong>

          <div className="mt-2">
            This action permanently deletes the community, advertisements,
            reviews, reports, favorites, views and invite clicks.
          </div>

          <div className="mt-2">This action cannot be undone.</div>
        </div>

        <div className="mb-4">
          <label className="form-label">Reason for deletion</label>

          <textarea
            rows={5}
            className="form-control custom-input"
            placeholder="Explain why this community is being deleted..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button
            className="btn btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="btn btn-danger"
            onClick={deleteCommunity}
            disabled={loading}
          >
            Delete Community
          </button>
        </div>
      </div>
    </div>
  );
}
