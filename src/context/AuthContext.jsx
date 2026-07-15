import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await api("/auth/me");
        setUser(data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
