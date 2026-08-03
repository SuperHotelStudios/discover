import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import MyCategoryRequests from "../components/profile/MyCategoryRequests";
import MyReports from "../components/profile/MyReports";

export default function Profile() {
  const { loading, isAuthenticated } = useAuth();

  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await api("/users/profile");
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setProfileLoading(false);
      }
    }

    if (isAuthenticated) {
      loadProfile();
    }
  }, [isAuthenticated]);

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (profileLoading) {
    return (
      <section className="container py-5 text-center">
        <h2>Loading Profile...</h2>
      </section>
    );
  }

  return (
    <section className="container profile-page">
      <div className="glass-card profile-header p-5">
        <div className="text-center">
          <img
            src={
              profile.avatar
                ? `https://cdn.discordapp.com/avatars/${profile.discordId}/${profile.avatar}.png`
                : "https://cdn.discordapp.com/embed/avatars/0.png"
            }
            alt={profile.displayName}
            className="profile-avatar"
          />

          <h1 className="mt-4 fw-bold">{profile.displayName}</h1>

          <div className="profile-username">@{profile.username}</div>

          {profile.verified && (
            <div className="verified-badge mt-3">
              ✔ Verified Discord Account
            </div>
          )}
        </div>
      </div>

      <div className="row g-4 mt-2">
        <div className="col-lg-4">
          <div className="glass-card p-4 h-100">
            <h3 className="mb-4">Account Information</h3>

            <div className="profile-item">
              <strong>Email</strong>

              <div>{profile.email}</div>
            </div>

            <hr />

            <div className="profile-item">
              <strong>Role</strong>

              <div>{profile.role}</div>
            </div>

            <hr />

            <div className="profile-item">
              <strong>Joined Discover</strong>

              <div>{new Date(profile.createdAt).toLocaleDateString()}</div>
            </div>

            <hr />

            <div className="profile-item">
              <strong>Last Advertisement</strong>

              <div>
                {profile.lastAdvertisementAt
                  ? new Date(profile.lastAdvertisementAt).toLocaleString()
                  : "Never"}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="glass-card p-4">
            <h3 className="mb-4">Statistics</h3>

            <div className="row g-3">
              <div className="col-md-4">
                <div className="analytics-card text-center">
                  <i className="bi bi-collection analytics-icon"></i>

                  <h2>{profile.statistics.communities}</h2>

                  <p>Communities</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="analytics-card text-center">
                  <i className="bi bi-star-fill analytics-icon"></i>

                  <h2>{profile.statistics.reviews}</h2>

                  <p>Reviews</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="analytics-card text-center">
                  <i className="bi bi-trophy-fill analytics-icon"></i>

                  <h2>{profile.statistics.totalPoints}</h2>

                  <p>Total Points</p>
                </div>
              </div>
            </div>
          </div>

          <MyCategoryRequests />

          <MyReports />

          <div className="glass-card p-4 mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>My Communities</h3>

              <Link to="/my-communities" className="text-decoration-none">
                View All →
              </Link>
            </div>

            {profile.communities.length === 0 ? (
              <p className="text-secondary">
                You haven't advertised any communities yet.
              </p>
            ) : (
              profile.communities.slice(0, 3).map((community) => (
                <div key={community.id} className="glass-card p-3 mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={community.logo}
                        className="details-logo"
                        alt={community.name}
                        style={{
                          width: "60px",
                          height: "60px",
                        }}
                      />

                      <div>
                        <h5 className="mb-1">{community.name}</h5>

                        <div className="text-secondary">
                          👥 {community.memberCount.toLocaleString()} Members
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/server/${community.id}`}
                      className="btn-discover text-decoration-none"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="glass-card p-4 mt-4">
            <h3 className="mb-4">Creator Analytics</h3>

            <div className="row g-3">
              <div className="col-md-3">
                <div className="analytics-card text-center">
                  <i className="bi bi-eye analytics-icon"></i>

                  <h2>{profile.analytics.totalViews.toLocaleString()}</h2>

                  <p>Total Views</p>
                </div>
              </div>

              <div className="col-md-3">
                <div className="analytics-card text-center">
                  <i className="bi bi-box-arrow-up-right analytics-icon"></i>

                  <h2>{profile.analytics.totalClicks.toLocaleString()}</h2>

                  <p>Invite Clicks</p>
                </div>
              </div>

              <div className="col-md-3">
                <div className="analytics-card text-center">
                  <i className="bi bi-heart-fill analytics-icon"></i>

                  <h2>{profile.analytics.totalFavorites.toLocaleString()}</h2>

                  <p>Favorites</p>
                </div>
              </div>

              <div className="col-md-3">
                <div className="analytics-card text-center">
                  <i className="bi bi-graph-up analytics-icon"></i>

                  <h2>{profile.analytics.averageRating.toFixed(1)}</h2>

                  <p>Average Rating</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-4 mt-4">
            <h3 className="mb-4">🏆 Best Performing Community</h3>

            {profile.bestCommunity ? (
              <>
                <h4>{profile.bestCommunity.name}</h4>

                <div className="row text-center mt-4">
                  <div className="col">
                    <strong>👁 {profile.bestCommunity.views}</strong>

                    <div>Views</div>
                  </div>

                  <div className="col">
                    <strong>🔗 {profile.bestCommunity.clicks}</strong>

                    <div>Clicks</div>
                  </div>

                  <div className="col">
                    <strong>❤️ {profile.bestCommunity.favorites}</strong>

                    <div>Favorites</div>
                  </div>

                  <div className="col">
                    <strong>
                      ⭐ {profile.bestCommunity.rating.toFixed(1)}
                    </strong>

                    <div>Rating</div>
                  </div>

                  <div className="col">
                    <strong>🏆 {profile.bestCommunity.points}</strong>

                    <div>Points</div>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-secondary">No communities yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
