import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function MyCategoryRequests() {
  const { loading, isAuthenticated } = useAuth();

  const [requests, setRequests] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    async function loadRequests() {
      try {
        const data = await api("/category-requests/my");
        setRequests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setPageLoading(false);
      }
    }

    if (isAuthenticated) {
      loadRequests();
    }
  }, [isAuthenticated]);

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (pageLoading) {
    return (
      <section className="container py-5 text-center">
        <h2>Loading Category Requests...</h2>
      </section>
    );
  }

  return (
    <section className="container profile-page">
      <div className="glass-card p-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>⭐ My Category Requests</h1>

          <span className="badge bg-primary">{requests.length} Total</span>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-5">
            <i
              className="bi bi-tags"
              style={{
                fontSize: "4rem",
              }}
            ></i>

            <h3 className="mt-4">No Category Requests</h3>

            <p className="text-secondary">
              You haven't requested any categories yet.
            </p>
          </div>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="glass-card p-4 mb-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h3>
                    {request.icon} {request.name}
                  </h3>

                  <p className="text-secondary mb-2">
                    Requested on {new Date(request.createdAt).toLocaleString()}
                  </p>

                  {request.reviewedAt && (
                    <p className="text-secondary mb-2">
                      Reviewed on{" "}
                      {new Date(request.reviewedAt).toLocaleString()}
                    </p>
                  )}

                  {request.status === "REJECTED" && request.rejectionReason && (
                    <div className="alert alert-danger mt-3 mb-0">
                      <strong>Rejection Reason:</strong>

                      <br />

                      {request.rejectionReason}
                    </div>
                  )}
                </div>

                <div>
                  {request.status === "APPROVED" && (
                    <span className="badge bg-success fs-6">Approved</span>
                  )}

                  {request.status === "PENDING" && (
                    <span className="badge bg-warning text-dark fs-6">
                      Pending
                    </span>
                  )}

                  {request.status === "REJECTED" && (
                    <span className="badge bg-danger fs-6">Rejected</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
