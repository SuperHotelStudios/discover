import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-section mt-5">

      <div className="container">

        <div className="row gy-5">

          <div className="col-lg-5">

            <h2 className="footer-logo">
              Discover
            </h2>

            <p className="footer-description">
              Discover Roblox Design, Development and
              Roleplay communities all in one place.
            </p>

          </div>

          <div className="col-lg-2">

            <h5 className="footer-heading">
              Browse
            </h5>

            <ul className="footer-links">

              <li>
                <Link to="/servers">
                  Communities
                </Link>
              </li>

              <li>
                <Link to="/leaderboard">
                  Leaderboard
                </Link>
              </li>

              <li>
                <Link to="/advertise">
                  Advertise
                </Link>
              </li>

            </ul>

          </div>

          <div className="col-lg-2">

            <h5 className="footer-heading">
              Resources
            </h5>

            <ul className="footer-links">

              <li>
                <Link to="/blog">
                  Blog
                </Link>
              </li>

              <li>
                <Link to="/login">
                  Sign In
                </Link>
              </li>

            </ul>

          </div>

          <div className="col-lg-3">

            <h5 className="footer-heading">
              Discover
            </h5>

            <p className="text-secondary">
              Built for Roblox communities.
            </p>

          </div>

        </div>

        <hr className="footer-divider" />

        <div className="d-flex justify-content-between flex-wrap">

          <span className="text-secondary">
            © 2026 Discover
          </span>

          <span className="text-secondary">
            Roblox Community Directory
          </span>

        </div>

      </div>

    </footer>
  );
}