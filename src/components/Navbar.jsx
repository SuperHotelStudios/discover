import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return null;
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="custom-navbar fixed-top">
      <div className="container navbar-wrapper">
        <Link className="brand-logo" to="/" onClick={closeMenu}>
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Discover"
            className="navbar-logo"
          />
        </Link>

        <div className={`navbar-links ${isMenuOpen ? "show" : ""}`}>
          <Link className="custom-link" to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link className="custom-link" to="/servers" onClick={closeMenu}>
            Communities
          </Link>

          <Link className="custom-link" to="/advertise" onClick={closeMenu}>
            Advertise
          </Link>

          <Link className="custom-link" to="/leaderboard" onClick={closeMenu}>
            Leaderboard
          </Link>

          <Link
            to="/advertise"
            className="btn-discover text-decoration-none d-lg-none text-center"
            onClick={closeMenu}
          >
            Submit Community
          </Link>
        </div>

        <div className="navbar-actions">
          <Link
            to="/advertise"
            className="btn-discover text-decoration-none d-none d-lg-inline-block"
            onClick={closeMenu}
          >
            Submit
          </Link>

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="btn-login text-decoration-none"
              onClick={closeMenu}
            >
              Login
            </Link>
          ) : (
            <div
              className={`user-menu ${isUserMenuOpen ? "open" : ""}`}
              ref={userMenuRef}
            >
              <button
                type="button"
                className="user-avatar-btn"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
              >
                <img
                  src={
                    user?.avatar
                      ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`
                      : "https://cdn.discordapp.com/embed/avatars/0.png"
                  }
                  alt="avatar"
                  className="user-avatar"
                />
              </button>

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

                <Link to="/profile" className="dropdown-link" onClick={closeMenu}>
                  👤 My Profile
                </Link>

                <Link to="/my-communities" className="dropdown-link" onClick={closeMenu}>
                  📢 My Communities
                </Link>

                <Link to="/profile" className="dropdown-link" onClick={closeMenu}>
                  ⭐ My Reviews
                </Link>

                <Link to="/leaderboard" className="dropdown-link" onClick={closeMenu}>
                  🏆 Leaderboard
                </Link>

                <Link to="/dashboard" className="dropdown-link" onClick={closeMenu}>
                  📊 Creator Dashboard
                </Link>

                {(user?.role === "ADMIN" || user?.role === "OWNER") && (
                  <>
                    <hr className="dropdown-divider" />

                    <Link to="/admin" className="dropdown-link" onClick={closeMenu}>
                      🛠 Admin Dashboard
                    </Link>
                  </>
                )}

                <button className="dropdown-item" disabled>
                  ⚙ Settings
                  <span>Coming Soon</span>
                </button>

                <hr className="dropdown-divider" />

                <button onClick={() => { closeMenu(); logout(); }} className="dropdown-item logout-item">
                  🚪 Logout
                </button>
              </div>
            </div>
          )}

          <button
            className="navbar-toggler-btn ms-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <i className={`bi ${isMenuOpen ? "bi-x-lg" : "bi-list"}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
}
