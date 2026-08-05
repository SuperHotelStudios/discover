import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { showError, showSuccess } from "../utils/toast";

export default function AdminCategoryRequests() {
  const { loading, isAuthenticated, user } = useAuth();

  const [requests, setRequests] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  async function loadRequests() {
    try {
      const data = await api("/category-requests/pending");
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setPageLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadRequests();
    }
  }, [isAuthenticated]);

  async function approve(id) {
    if (!window.confirm("Approve this category request?")) {
      return;
    }

    try {
      const response = await api(`/category-requests/${id}/approve`, {
        method: "PATCH",
      });

      showSuccess(response.message);
      loadRequests();
    } catch (err) {
      showError(err.message);
    }
  }

  async function reject(id) {
    const reason = prompt("Enter rejection reason:");

    if (!reason) return;

    try {
      const response = await api(`/category-requests/${id}/reject`, {
        method: "PATCH",
        body: JSON.stringify({
          reason,
        }),
      });

      showSuccess(response.message);
      loadRequests();
    } catch (err) {
      showError(err.message);
    }
  }

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "ADMIN" && user?.role !== "OWNER") {
    return (
      <section className="container py-5 text-center">
        <h2>Access Denied</h2>
      </section>
    );
  }

  if (pageLoading) {
    return (
      <section className="container py-5 text-center">
        <h2>Loading...</h2>
      </section>
    );
  }

  return (
    <section className="container profile-page">
      <div className="glass-card p-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>⭐ Category Requests</h1>

          <span className="badge bg-primary">{requests.length} Pending</span>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-5">
            <i
              className="bi bi-check-circle"
              style={{
                fontSize: "4rem",
              }}
            ></i>

            <h3 className="mt-4">No Pending Requests</h3>
          </div>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="glass-card p-4 mb-4">
              <div className="d-flex justify-content-between">
                <div>
                  <h3>
                    {request.icon} {request.name}
                  </h3>

                  <p className="mb-1">
                    <strong>Requested By:</strong>{" "}
                    {request.requestedBy.displayName}
                  </p>

                  <p className="text-secondary">
                    {new Date(request.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="d-flex gap-2 align-items-center">
                  <button
                    className="btn btn-success"
                    onClick={() => approve(request.id)}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => reject(request.id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
