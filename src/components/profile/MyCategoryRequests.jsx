import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

export default function MyCategoryRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRequests() {
      try {
        const data = await api("/category-requests/my");
        setRequests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadRequests();
  }, []);

  function getBadge(status) {
    switch (status) {
      case "APPROVED":
        return <span className="badge bg-success">Approved</span>;

      case "REJECTED":
        return <span className="badge bg-danger">Rejected</span>;

      default:
        return <span className="badge bg-warning text-dark">Pending</span>;
    }
  }

  return (
    <div className="glass-card p-4 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>⭐ My Category Requests</h3>

        <Link to="/my-category-requests" className="text-decoration-none">
          View All →
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p className="text-secondary">
          You haven't requested any categories yet.
        </p>
      ) : (
        requests.slice(0, 3).map((request) => (
          <div key={request.id} className="glass-card p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">
                  {request.icon} {request.name}
                </h5>

                <small className="text-secondary">
                  Requested on{" "}
                  {new Date(request.createdAt).toLocaleDateString()}
                </small>

                {request.status === "REJECTED" && request.rejectionReason && (
                  <div className="text-danger mt-2">
                    Reason: {request.rejectionReason}
                  </div>
                )}
              </div>

              {getBadge(request.status)}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
