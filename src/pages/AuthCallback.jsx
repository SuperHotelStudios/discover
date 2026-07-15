import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Logging you in...</h2>
      </div>
    </div>
  );
}
