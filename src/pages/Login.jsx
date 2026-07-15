import "./../styles/login.css";
import { API_URL } from "../config/api";

export default function Login() {
  const login = () => {
    window.location.href = `${API_URL}/auth/discord`;
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          className="login-logo"
        />

        <h1 className="login-title">Welcome to Discover</h1>

        <p className="login-subtitle">
          Continue with Discord to access your profile, communities and
          advertisements.
        </p>

        <button onClick={login} className="discord-btn">
          Continue with Discord
        </button>

        <div className="login-note">
          We never ask for your Discord password.
        </div>
      </div>
    </div>
  );
}
