import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { showError, showSuccess } from "../utils/toast";

export default function EditCommunity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    inviteLink: "",
    memberCount: 0,
    category: "",
    description: "",
    banner: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "description" && value.length > 500) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [communityData, categoryData] = await Promise.all([
          api(`/communities/${id}`),
          api("/categories"),
        ]);

        setFormData({
          name: communityData.name,
          inviteLink: communityData.inviteLink,
          memberCount: communityData.memberCount,
          category: communityData.category,
          description: communityData.description,
          banner: communityData.banner,
        });

        setCategories(categoryData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.banner.trim() || !formData.description.trim()) {
      showError("Please fill all required fields.");
      return;
    }

    try {
      const response = await api(`/communities/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          banner: formData.banner,
          category: formData.category,
          description: formData.description,
        }),
      });

      showSuccess(response.message || "Community updated successfully.");

      setTimeout(() => {
        navigate("/my-communities");
      }, 1500);
    } catch (err) {
      showError(err.message);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <section className="container advertise-page">
      <div className="text-center mb-5">
        <h1 className="section-title">Edit Community</h1>

        <p className="section-subtitle">
          Update your community information. Server details synced from Discord
          cannot be changed.
        </p>
      </div>

      <div className="glass-card advertise-form p-5">
        <div className="glass-card p-3 mb-5 text-center">
          <strong>💡 Tip</strong>

          <div className="text-secondary mt-2">
            Community Name, Invite Link and Member Count are automatically
            synchronized from Discord and cannot be edited here.
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">
              Community Name
              <span className="text-secondary ms-2">
                🔒 Synced from Discord
              </span>
            </label>

            <input
              value={formData.name}
              disabled
              className="form-control custom-input"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              Discord Invite
              <span className="text-secondary ms-2">
                🔒 Synced from Discord
              </span>
            </label>

            <input
              value={formData.inviteLink}
              disabled
              className="form-control custom-input"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              Members
              <span className="text-secondary ms-2">
                🔒 Synced from Discord
              </span>
            </label>

            <input
              value={formData.memberCount}
              disabled
              className="form-control custom-input"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select custom-input"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label">Banner URL</label>

            <input
              type="text"
              name="banner"
              value={formData.banner}
              onChange={handleChange}
              className="form-control custom-input"
              placeholder="Use a permanent image URL."
            />
          </div>

          <div className="mt-4">
            <label className="form-label">Banner Preview</label>

            <div className="glass-card overflow-hidden">
              <img
                src={
                  formData.banner ||
                  "https://placehold.co/1200x350?text=Banner+Preview"
                }
                alt="Banner Preview"
                className="img-fluid w-100"
                style={{
                  maxHeight: "260px",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/1200x350?text=Invalid+Banner";
                }}
              />
            </div>

            <div className="text-secondary mt-2">
              Changes update instantly as you edit the URL.
            </div>
          </div>

          <div className="mt-4 mb-4">
            <label className="form-label">Description</label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control custom-input"
            />

            <div className="text-secondary mt-2">
              {formData.description.length}/500
            </div>
          </div>

          <div className="d-flex gap-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/my-communities")}
            >
              Cancel
            </button>

            <button type="submit" className="btn-discover">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
