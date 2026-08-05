import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/toast";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const hasHandledCallback = useRef(false);

  useEffect(() => {
    if (hasHandledCallback.current) return;
    hasHandledCallback.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      showError("Discord login failed. Please try again.");
      navigate("/login", { replace: true });
      return;
    }

    async function completeLogin() {
      localStorage.setItem("token", token);

      try {
        const user = await api("/auth/me");
        setUser(user);
        showSuccess("Logged in successfully.");
        navigate("/", { replace: true });
      } catch (err) {
        localStorage.removeItem("token");
        showError("Discord login failed. Please try again.");
        navigate("/login", { replace: true });
      }
    }

    completeLogin();
  }, [navigate, setUser]);

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Logging you in...</h2>
      </div>
    </div>
  );
}
