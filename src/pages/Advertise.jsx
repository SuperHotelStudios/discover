import { useState } from "react";

export default function Advertise() {
  const [formData, setFormData] = useState({
    name: "",
    invite: "",
    category: "Design",
    description: "",
    banner: "",
    logo: ""
  });

  const [message, setMessage] = useState("");

  const showToast = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "description" &&
      value.length > 500
    ) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.invite.trim() ||
      !formData.description.trim()
    ) {
      showToast("Please fill all fields.");
      return;
    }

    const discordRegex =
      /^https?:\/\/(www\.)?(discord\.gg|discord\.com\/invite)\/.+$/;

    if (!discordRegex.test(formData.invite)) {
      showToast("Please enter a valid Discord invite link.");
      return;
    }

    console.log(formData);

    showToast("Community submitted successfully!");

    setFormData({
      name: "",
      invite: "",
      category: "Design",
      description: ""
    });
  };

  return (
    <section className="container advertise-page">

      <div className="text-center mb-5">

        <h1 className="section-title">
          Advertise Your Community
        </h1>

        <p className="section-subtitle">
          Submit your Roblox community to be reviewed and listed on Discover.
        </p>

      </div>

      <div className="glass-card advertise-form p-5">

        <form onSubmit={handleSubmit}>

          <div className="mb-4">

            <label className="form-label">
              Community Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control custom-input"
              placeholder="Enter community name"
            />

          </div>

          <div className="mb-4">

            <label className="form-label">
              Discord Invite
            </label>

            <input
              type="text"
              name="invite"
              value={formData.invite}
              onChange={handleChange}
              className="form-control custom-input"
              placeholder="https://discord.gg/..."
            />

          </div>

          <div className="mb-4">

            <label className="form-label">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select custom-input"
            >
              <option value="Design">
                Design
              </option>

              <option value="Development">
                Development
              </option>

              <option value="Roleplay">
                Roleplay
              </option>
            </select>

          </div>

          <div className="mb-4">

            <label className="form-label">
              Logo URL
            </label>

            <input
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              className="form-control custom-input"
              placeholder="https://..."
            />

          </div>

          <div className="mb-4">

            <label className="form-label">
              Banner URL
            </label>

            <input
              type="text"
              name="banner"
              value={formData.banner}
              onChange={handleChange}
              className="form-control custom-input"
              placeholder="https://..."
            />

          </div>

          <div className="mb-4">

            <label className="form-label">
              Description
            </label>

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

          <button
            type="submit"
            className="btn-discover"
          >
            Submit Community
          </button>

        </form>

      </div>

      {message && (
        <div className="toast-message">
          {message}
        </div>
      )}

    </section>
  );
}