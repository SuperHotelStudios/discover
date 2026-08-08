import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import ReportModal from "../components/ReportModal";
export default function ServerDetails() {
  const { id } = useParams();

  const [views, setViews] = useState(0);
  const [clicks, setClicks] = useState(0);

  const [favorites, setFavorites] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const [communityReviews, setCommunityReviews] = useState([]);
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [hover, setHover] = useState(0);

  const [hasRated, setHasRated] = useState(false);
  const [showRatingToast, setShowRatingToast] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    async function loadCommunity() {
      try {
        const data = await api(`/communities/${id}`);
        const key = `community-view-${id}`;
        const lastView = localStorage.getItem(key);

        const now = Date.now();

        if (!lastView || now - Number(lastView) > 30 * 60 * 1000) {
          await api(`/communities/${id}/view`, {
            method: "POST",
          });

          localStorage.setItem(key, now.toString());
        }
        setCommunity(data);
        const reviewData = await api(`/reviews/community/${id}`);

        setCommunityReviews(reviewData);
        setRating(data.averageRating ?? 0);
        setReviews(data.totalReviews ?? 0);

        const viewsData = await api(`/communities/${id}/views`);
        const clicksData = await api(`/communities/${id}/clicks`);

        const favoritesData = await api(`/communities/${id}/favorites`);

        setFavorites(favoritesData.favoriteCount);
        setIsFavorited(favoritesData.isFavorited);

        setViews(viewsData.totalViews);
        setClicks(clicksData.totalClicks);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadCommunity();
  }, [id]);

  const handleRating = async (value) => {
    if (hasRated) {
      setToastMessage("Already Rated");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2500);

      return;
    }

    try {
      const response = await api("/reviews", {
        method: "POST",
        body: JSON.stringify({
          communityId: community.id,
          rating: value,
        }),
      });

      setToastMessage(response.message);
      setShowToast(true);
      setHasRated(true);

      // Reload community
      const updatedCommunity = await api(`/communities/${id}`);
      setCommunity(updatedCommunity);
      setRating(updatedCommunity.averageRating ?? 0);
      setReviews(updatedCommunity.totalReviews ?? 0);

      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    } catch (err) {
      setToastMessage(err.message);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    }

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const handleJoin = async () => {
    try {
      await api(`/communities/${id}/click`, {
        method: "POST",
      });
      const clicksData = await api(`/communities/${id}/clicks`);
      setClicks(clicksData.totalClicks);
    } catch (err) {
      console.error(err);
    }

    window.open(community.inviteLink, "_blank");
  };

  const handleFavorite = async () => {
    try {
      const response = await api(`/communities/${id}/favorite`, {
        method: "POST",
      });

      setToastMessage(response.message);
      setShowToast(true);

      const favoriteData = await api(`/communities/${id}/favorites`);

      setFavorites(favoriteData.favoriteCount);
      setIsFavorited(favoriteData.isFavorited);

      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    } catch (err) {
      console.error(err);

      setToastMessage(err.message);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    }
  };

  if (loading) {
    return (
      <section className="container py-5 text-center">
        <h2>Loading...</h2>
      </section>
    );
  }

  if (!community) {
    return (
      <section className="container py-5 text-center">
        <h2>Community Not Found</h2>
      </section>
    );
  }

  return (
    <section className="container server-details-page">
      <div className="p-3 p-sm-4 p-md-5">
        <div className="d-flex align-items-center gap-3 gap-md-4 flex-wrap">
          <img
            src={community.logo || "https://placehold.co/100x100?text=Logo"}
            alt={community.name}
            className="details-logo"
          />

          <div>
            <h2 className="fw-bold mb-1">{community.name}</h2>

            <p className="text-secondary mb-0">{community.description}</p>
          </div>
        </div>

        <hr />

        <div className="row text-center g-3 g-md-4">
          <div className="col-6 col-sm-3">
            <h5>👤 Advertised By</h5>
            <p className="mb-0">{community.createdBy?.displayName || "Unknown"}</p>
          </div>

          <div className="col-6 col-sm-3">
            <h5>🎭 Category</h5>
            <p className="mb-0">{community.category}</p>
          </div>

          <div className="col-6 col-sm-3">
            <h5>👥 Members</h5>
            <p className="mb-0">{community.memberCount.toLocaleString()}</p>
          </div>

          <div className="col-6 col-sm-3">
            <h5>🏆 Points</h5>
            <p className="mb-0">{(community.totalPoints ?? 0).toLocaleString()}</p>
          </div>

          <hr />

          <div className="rating-section text-center my-4 col-12">
            <h4 className="fw-bold mb-3">Rate this Community</h4>

            <div className="community-stars">
              {[1, 2, 3, 4, 5].map((star) => {
                let icon = "bi-star";

                if (hover && !hasRated) {
                  if (hover >= star) {
                    icon = "bi-star-fill";
                  }
                } else {
                  if (rating >= star) {
                    icon = "bi-star-fill";
                  } else if (rating >= star - 0.5) {
                    icon = "bi-star-half";
                  }
                }

                return (
                  <i
                    key={star}
                    className={`bi ${icon}`}
                    onMouseEnter={() => {
                      if (!hasRated) setHover(star);
                    }}
                    onMouseLeave={() => {
                      if (!hasRated) setHover(0);
                    }}
                    onClick={() => handleRating(star)}
                  ></i>
                );
              })}
            </div>

            <hr />

            <h3 className="mb-4">Community Reviews</h3>

            {communityReviews.length === 0 ? (
              <p className="text-secondary">No reviews yet.</p>
            ) : (
              communityReviews.map((review) => (
                <div key={review.id} className="glass-card p-3 mb-3 text-start">
                  <h5>{review.reviewer.displayName}</h5>

                  <div className="text-warning mb-2">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>

                  {review.comment && <p className="mb-1">{review.comment}</p>}

                  <small className="text-secondary">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </small>
                </div>
              ))
            )}

            <hr />
          </div>
          <div className="glass-card p-3 p-sm-4 mb-5 col-12">
            <h3 className="mb-4 text-center">
              <i className="bi bi-graph-up-arrow me-2"></i>
              Community Analytics
            </h3>

            <div className="row text-center g-3 g-md-4">
              <div className="col-6 col-sm-4 col-md">
                <div className="analytics-card">
                  <i className="bi bi-eye analytics-icon"></i>

                  <h2>{views.toLocaleString()}</h2>

                  <p>Views</p>
                </div>
              </div>

              <div className="col-6 col-sm-4 col-md">
                <div className="analytics-card">
                  <i className="bi bi-box-arrow-up-right analytics-icon"></i>

                  <h2>{clicks.toLocaleString()}</h2>

                  <p>Invite Clicks</p>
                </div>
              </div>

              <div className="col-6 col-sm-4 col-md">
                <div className="analytics-card">
                  <i
                    className="bi bi-heart-fill analytics-icon"
                    style={{ color: "#ff4d6d" }}
                  ></i>

                  <h2>{favorites}</h2>

                  <p>Favorites</p>
                </div>
              </div>

              <div className="col-6 col-sm-4 col-md">
                <div className="analytics-card">
                  <i className="bi bi-star-fill analytics-icon"></i>

                  <h2>{rating.toFixed(1)}</h2>

                  <p>Average Rating</p>
                </div>
              </div>

              <div className="col-6 col-sm-4 col-md">
                <div className="analytics-card">
                  <i className="bi bi-chat-left-text analytics-icon"></i>

                  <h2>{reviews.toLocaleString()}</h2>

                  <p>Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 mt-md-5 d-flex justify-content-center gap-2 gap-sm-3 flex-wrap">
          <button onClick={handleJoin} className="btn-discover">
            <i className="bi bi-discord me-2"></i>
            Join Community
          </button>

          <button
            onClick={handleFavorite}
            className={
              isFavorited
                ? "btn btn-danger favorite-btn"
                : "btn btn-outline-danger favorite-btn"
            }
            title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
          >
            <i
              className={`bi ${isFavorited ? "bi-heart-fill" : "bi-heart"}`}
            ></i>
          </button>

          <button
            className="btn-discover"
            onClick={() => setShowReportModal(true)}
          >
            Report
          </button>
        </div>

        {showToast && (
          <div className="rating-toast">
            <i className="bi bi-check-circle-fill me-2"></i>
            {toastMessage}
          </div>
        )}
        <ReportModal
          show={showReportModal}
          onClose={() => setShowReportModal(false)}
          communityId={community.id}
        />
      </div>
    </section>
  );
}
