const PAGE_TITLES = {
  home: "CraftLink AI",
  dashboard: "Dashboard",
  discover: "Discover Products",
  requirement: "Post Requirement",
  matches: "AI Matches",
  pricing: "Dynamic Pricing",
  orders: "Orders",
};

function Navbar({ page }) {
  return (
    <header className="topbar">
      <div>
        <h2>{PAGE_TITLES[page] || "CraftLink AI"}</h2>
        <p>AI-powered Artisan Marketplace</p>
      </div>

      <div className="topbar-right">
        <button
          type="button"
          className="notification-btn"
          onClick={() => alert("No new notifications")}
          aria-label="Notifications"
        >
          🔔
        </button>

        <div className="profile">
          <div className="avatar">B</div>

          <div className="profile-info">
            <strong>Heritage Retail Co.</strong>
            <p>B2B Buyer Workspace</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;