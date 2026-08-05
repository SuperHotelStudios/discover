import { useState } from "react";
import { api } from "../services/api";
import { showError, showSuccess } from "../utils/toast";

export default function RequestCategoryModal({ show, onClose }) {
  const [form, setForm] = useState({
    name: "",
    icon: "",
  });

  const [loading, setLoading] = useState(false);

  if (!show) return null;

  async function submit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api("/category-requests", {
        method: "POST",
        body: JSON.stringify(form),
      });

      showSuccess(res.message);

      setForm({
        name: "",
        icon: "",
      });

      onClose();
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="glass-card request-modal">
        <div className="text-center mb-4">
          <div className="featured-icon mb-3" style={{ fontSize: "3rem" }}>
            🏷️
          </div>

          <h2 className="fw-bold">Request New Category</h2>

          <p className="text-secondary">
            Can't find your category? Submit a request and an administrator will
            review it.
          </p>
        </div>

        <form onSubmit={submit}>
          <div className="mb-3">
            <label>Category Name</label>

            <input
              className="form-control custom-input"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-4">
            <label>Emoji</label>

            <input
              className="form-control custom-input"
              placeholder=""
              value={form.icon}
              onChange={(e) =>
                setForm({
                  ...form,
                  icon: e.target.value,
                })
              }
            />
          </div>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button type="submit" className="btn-discover" disabled={loading}>
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </button>
            <button className="modal-close" onClick={onClose}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
