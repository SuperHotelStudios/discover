import { useState } from "react";
import { api } from "../services/api";
import { showSuccess, showError } from "../utils/toast";

const reasons = [
  {
    value: "SPAM",
    label: "🚫 Spam",
  },
  {
    value: "NSFW",
    label: "🔞 NSFW",
  },
  {
    value: "HARASSMENT",
    label: "😡 Harassment",
  },
  {
    value: "SCAM",
    label: "💰 Scam",
  },
  {
    value: "HATE_SPEECH",
    label: "🚨 Hate Speech",
  },
  {
    value: "MISLEADING",
    label: "⚠ Misleading",
  },
  {
    value: "OTHER",
    label: "📌 Other",
  },
];

export default function ReportModal({ show, onClose, communityId }) {
  const [reason, setReason] = useState("SPAM");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  if (!show) return null;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api("/reports", {
        method: "POST",
        body: JSON.stringify({
          communityId,
          reason,
          description,
        }),
      });

      showSuccess(response.message);

      setReason("SPAM");
      setDescription("");
      onClose();
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-backdrop-custom">
      <div className="glass-card p-4 report-modal">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">🚩 Report Community</h3>

          <button
            className="btn-close btn-close-white"
            onClick={() => {
              setReason("SPAM");
              setDescription("");
              onClose();
            }}
          ></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Reason</label>

            <select
              className="form-select custom-input"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              {reasons.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label">Description (Optional)</label>

            <textarea
              rows="5"
              maxLength={500}
              className="form-control custom-input"
              placeholder="Provide additional details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="text-secondary mt-2">{description.length}/500</div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setReason("SPAM");
                setDescription("");
                onClose();
              }}
              disabled={loading}
            >
              Cancel
            </button>

            <button type="submit" className="btn-discover" disabled={loading}>
              {loading ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
