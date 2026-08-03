import DeleteCommunityModal from "./DeleteCommunityModal";

export default function CommunityDetailsModal({
  show,
  onClose,
  community,
  onVerify,
  onFeature,
  onHide,
  refresh,
}) {
  if (!show || !community) return null;

  return (
    <div className="modal-backdrop-custom">
      <div
        className="glass-card p-4"
        style={{
          maxWidth: "850px",
          width: "95%",
          margin: "4rem auto",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>🏘 Community Details</h2>

          <button className="btn-close btn-close-white" onClick={onClose} />
        </div>

        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src={community.logo}
              alt={community.name}
              style={{
                width: 130,
                height: 130,
                borderRadius: 20,
                objectFit: "cover",
              }}
            />

            <h3 className="mt-3">{community.name}</h3>

            <div className="mt-3">
              {community.verified && (
                <span className="badge bg-primary me-2">✔ Verified</span>
              )}

              {community.featured && (
                <span className="badge bg-warning text-dark me-2">
                  ⭐ Featured
                </span>
              )}

              {community.hidden && (
                <span className="badge bg-danger">🙈 Hidden</span>
              )}
            </div>
          </div>

          <div className="col-md-8">
            <div className="mb-3">
              <strong>Advertiser</strong>

              <div>{community.createdBy.displayName}</div>
            </div>

            <div className="mb-3">
              <strong>Category</strong>

              <div>{community.category}</div>
            </div>

            <div className="mb-3">
              <strong>Members</strong>

              <div>{community.memberCount.toLocaleString()}</div>
            </div>

            <div className="mb-3">
              <strong>Discord Guild ID</strong>

              <div className="text-break">{community.discordGuildId}</div>
            </div>

            <div className="mb-3">
              <strong>Invite</strong>

              <div className="text-break">
                <a href={community.inviteLink} target="_blank" rel="noreferrer">
                  {community.inviteLink}
                </a>
              </div>
            </div>

            <div className="mb-3">
              <strong>Description</strong>

              <div>{community.description}</div>
            </div>
          </div>
        </div>

        <hr />

        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-outline-primary" onClick={onVerify}>
            {community.verified ? "Unverify" : "Verify"}
          </button>

          <button className="btn btn-outline-warning" onClick={onFeature}>
            {community.featured ? "Unfeature" : "Feature"}
          </button>

          <button className="btn btn-outline-secondary" onClick={onHide}>
            {community.hidden ? "Restore" : "Hide"}
          </button>

          <button className="btn btn-danger">🗑 Delete</button>

          {/* <DeleteCommunityModal
            community={community}
            refresh={refresh}
            showButton
          /> */}
        </div>
      </div>
    </div>
  );
}
