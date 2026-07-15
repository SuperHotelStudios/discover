import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  if (loading) {
    return null;
  }

  return (
    <nav className="custom-navbar fixed-top">
      <div className="container navbar-wrapper">
        <Link className="brand-logo" to="/">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Discover"
            className="navbar-logo"
          />
        </Link>

        <div className="navbar-links">
          <Link className="custom-link" to="/">
            Home
          </Link>

          <Link className="custom-link" to="/servers">
            Communities
          </Link>

          <Link className="custom-link" to="/advertise">
            Advertise
          </Link>

          <Link className="custom-link" to="/leaderboard">
            Leaderboard
          </Link>
        </div>

        <div className="navbar-actions">
          <Link to="/advertise" className="btn-discover text-decoration-none">
            Submit
          </Link>

          {!isAuthenticated ? (
            <Link to="/login" className="btn-login text-decoration-none">
              Login
            </Link>
          ) : (
            <div className="user-menu">
              <Link to="/profile">
                <img
                  src={
                    user?.avatar
                      ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`
                      : "https://cdn.discordapp.com/embed/avatars/0.png"
                  }
                  alt="avatar"
                  className="user-avatar"
                />
              </Link>

              <div className="user-dropdown">
                <div className="dropdown-header">
                  <img
                    src={
                      user?.avatar
                        ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`
                        : "https://cdn.discordapp.com/embed/avatars/0.png"
                    }
                    alt="avatar"
                    className="dropdown-avatar"
                  />

                  <div>
                    <div className="dropdown-name">
                      {user?.displayName}

                      {user?.verified && (
                        <i
                          className="bi bi-patch-check-fill ms-2"
                          style={{ color: "#5865F2" }}
                        ></i>
                      )}
                    </div>

                    <div className="dropdown-username">@{user?.username}</div>
                  </div>
                </div>

                <hr className="dropdown-divider" />

                <Link to="/profile" className="dropdown-link">
                  👤 My Profile
                </Link>

                <Link to="/my-communities" className="dropdown-link">
                  📢 My Communities
                </Link>

                <Link to="/profile" className="dropdown-link">
                  ⭐ My Reviews
                </Link>

                <Link to="/leaderboard" className="dropdown-link">
                  🏆 Leaderboard
                </Link>

                <Link to="/dashboard" className="dropdown-link">
                  📊 Creator Dashboard
                </Link>

                <button className="dropdown-item" disabled>
                  ⚙ Settings
                  <span>Coming Soon</span>
                </button>

                <hr className="dropdown-divider" />

                <button onClick={logout} className="dropdown-item logout-item">
                  🚪 Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
