import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import RequestCategoryModal from "../components/RequestCategoryModal";
import { showSuccess, showError } from "../utils/toast";

export default function Advertise() {
  const [formData, setFormData] = useState({
    inviteLink: "",
    category: "Roleplay",
    description: "",
    banner: "",
  });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categories, setCategories] = useState([]);

  const { isAuthenticated, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await api("/categories");
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadCategories();
  }, []);

  if (loading) return null;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "description" && value.length > 500) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.inviteLink.trim() ||
      !formData.description.trim() ||
      !formData.banner.trim()
    ) {
      showError("Please fill all required fields.");
      return;
    }

    const discordRegex =
      /^https?:\/\/(www\.)?(discord\.gg|discord\.com\/invite)\/.+$/;

    if (!discordRegex.test(formData.inviteLink)) {
      showError("Please enter a valid Discord invite link.");
      return;
    }

    try {
      const response = await api("/advertisements", {
        method: "POST",
        body: JSON.stringify({
          inviteLink: formData.inviteLink,
          description: formData.description,
          banner: formData.banner,
          category: formData.category,
        }),
      });

      showSuccess(response.message);

      setFormData({
        inviteLink: "",
        description: "",
        banner: "",
        category: "Roleplay",
      });

      setTimeout(() => {
        navigate("/servers");
      }, 1500);
    } catch (err) {
      console.error(err);
      showError(err.message);
    }
  };

  return (
    <section className="container advertise-page">
      <div className="text-center mb-5">
        <h1 className="section-title">Advertise Your Community</h1>

        <p className="section-subtitle">
          Paste your Discord invite below. Discover will automatically fetch
          your server information from Discord.
        </p>
      </div>

      <div className="glass-card advertise-form p-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">Discord Invite</label>

            <input
              type="text"
              name="inviteLink"
              value={formData.inviteLink}
              onChange={handleChange}
              className="form-control custom-input"
              placeholder="https://discord.gg/..."
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
            <div className="mt-2">
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none text-slate-light"
                onClick={() => setShowCategoryModal(true)}
              >
                Can't find your category?{" "}
                <span className="text-decoration-underline text-slate-light">
                  Request one
                </span>
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Banner URL</label>

            <input
              type="text"
              name="banner"
              value={formData.banner}
              onChange={handleChange}
              className="form-control custom-input"
              placeholder="Use a permanent image URL. Discord attachment links expire. Recommended hosts: Imgur, Imgbox, or Postimages."
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Description</label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control custom-input"
              placeholder="Tell people about your community..."
            ></textarea>

            <div className="text-secondary mt-2">
              {formData.description.length}/500
            </div>
          </div>

          <button type="submit" className="btn-discover">
            Advertise Community
          </button>
        </form>
      </div>

      <RequestCategoryModal
        show={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
      />
    </section>
  );
}
