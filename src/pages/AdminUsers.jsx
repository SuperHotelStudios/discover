import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { showError, showSuccess } from "../utils/toast";

const roles = ["USER", "STAFF", "ADMIN", "OWNER"];

export default function AdminUsers() {
  const { loading, isAuthenticated, user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const canManageUsers = currentUser?.role === "OWNER";

  async function loadUsers(searchTerm = "") {
    try {
      setPageLoading(true);
      const query = searchTerm.trim()
        ? `?search=${encodeURIComponent(searchTerm.trim())}`
        : "";
      setUsers(await api(`/admin/users${query}`));
    } catch (err) {
      showError(err.message);
    } finally {
      setPageLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadUsers();
    }
  }, [isAuthenticated]);

  async function changeRole(targetUser, role) {
    if (role === targetUser.role) return;

    if (!window.confirm(`Change ${targetUser.displayName || targetUser.username} to ${role}?`)) {
      return;
    }

    try {
      setUpdatingId(targetUser.id);
      const response = await api(`/admin/users/${targetUser.id}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
      });
      showSuccess(response.message);
      loadUsers(search);
    } catch (err) {
      showError(err.message);
    } finally {
      setUpdatingId(null);
    }
  }

  async function changeBanStatus(targetUser) {
    const action = targetUser.isBanned ? "unban" : "ban";
    const reason = window.prompt(
      `Enter the reason to ${action} ${targetUser.displayName || targetUser.username}:`,
    );

    if (!reason?.trim()) {
      showError(`A reason is required to ${action} this user.`);
      return;
    }

    if (!window.confirm(`Are you sure you want to ${action} this user?`)) {
      return;
    }

    try {
      setUpdatingId(targetUser.id);
      const response = await api(`/admin/users/${targetUser.id}/${action}`, {
        method: "PATCH",
        body: JSON.stringify({ reason: reason.trim() }),
      });
      showSuccess(response.message);
      loadUsers(search);
    } catch (err) {
      showError(err.message);
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser?.role !== "ADMIN" && currentUser?.role !== "OWNER") {
    return (
      <section className="container py-5 text-center">
        <h2>Access Denied</h2>
      </section>
    );
  }

  return (
    <section className="container profile-page">
      <div className="glass-card p-5">
        <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap mb-4">
          <div>
            <h1 className="mb-1">User Management</h1>
            <p className="text-secondary mb-0">
              {canManageUsers
                ? "Manage Discover roles and account access."
                : "View Discover users. Only owners can make changes."}
            </p>
          </div>
          <span className="badge bg-primary">{users.length} Users</span>
        </div>

        <form
          className="d-flex gap-2 mb-4"
          onSubmit={(event) => {
            event.preventDefault();
            loadUsers(search);
          }}
        >
          <input
            className="form-control custom-input"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search username, display name, or Discord ID"
          />
          <button className="btn-discover" type="submit">
            Search
          </button>
        </form>

        {pageLoading ? (
          <div className="text-center py-5">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="text-center py-5 text-secondary">No users found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Discord ID</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  {canManageUsers && <th className="text-end">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {users.map((targetUser) => {
                  const isSelf = targetUser.id === currentUser.id;
                  const isUpdating = updatingId === targetUser.id;
                  const canEditTarget = canManageUsers && !isSelf && targetUser.role !== "OWNER";

                  return (
                    <tr key={targetUser.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={
                              targetUser.avatar
                                ? `https://cdn.discordapp.com/avatars/${targetUser.discordId}/${targetUser.avatar}.png`
                                : "https://cdn.discordapp.com/embed/avatars/0.png"
                            }
                            alt=""
                            width="40"
                            height="40"
                            className="rounded-circle"
                          />
                          <div>
                            <div>{targetUser.displayName || targetUser.username}</div>
                            <small className="text-secondary">@{targetUser.username}</small>
                          </div>
                        </div>
                      </td>
                      <td><code>{targetUser.discordId}</code></td>
                      <td>
                        <span className={`badge ${targetUser.role === "OWNER" ? "bg-danger" : targetUser.role === "ADMIN" ? "bg-primary" : targetUser.role === "STAFF" ? "bg-info text-dark" : "bg-secondary"}`}>
                          {targetUser.role}
                        </span>
                      </td>
                      <td>
                        {targetUser.isBanned ? (
                          <div>
                            <span className="badge bg-danger">Banned</span>
                            <div className="small text-secondary mt-1">{targetUser.banReason}</div>
                          </div>
                        ) : (
                          <span className={targetUser.verified ? "badge bg-success" : "badge bg-secondary"}>
                            {targetUser.verified ? "Verified" : "Unverified"}
                          </span>
                        )}
                      </td>
                      <td>{new Date(targetUser.createdAt).toLocaleDateString()}</td>
                      {canManageUsers && (
                        <td className="text-end">
                          {canEditTarget ? (
                            <div className="d-flex justify-content-end gap-2">
                              <select
                                className="form-select form-select-sm"
                                style={{ maxWidth: "115px" }}
                                value={targetUser.role}
                                disabled={isUpdating}
                                onChange={(event) => changeRole(targetUser, event.target.value)}
                              >
                                {roles.map((role) => <option key={role}>{role}</option>)}
                              </select>
                              <button
                                className={targetUser.isBanned ? "btn btn-sm btn-success" : "btn btn-sm btn-danger"}
                                disabled={isUpdating}
                                onClick={() => changeBanStatus(targetUser)}
                              >
                                {targetUser.isBanned ? "Unban" : "Ban"}
                              </button>
                            </div>
                          ) : (
                            <span className="text-secondary small">{isSelf ? "Your account" : "Protected"}</span>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
