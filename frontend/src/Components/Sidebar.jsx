import {
  Home,
  LayoutDashboard,
  Search,
  Plus,
  Sparkles,
  IndianRupee,
  Package,
  ArrowLeft,
} from "lucide-react";

function Sidebar({ page, setPage }) {
  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: <Home size={17} />,
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={17} />,
    },
    {
      id: "discover",
      label: "Discover Products",
      icon: <Search size={17} />,
    },
    {
      id: "requirement",
      label: "Post Requirement",
      icon: <Plus size={17} />,
    },
    {
      id: "matches",
      label: "AI Matches",
      icon: <Sparkles size={17} />,
    },
    {
      id: "pricing",
      label: "Dynamic Pricing",
      icon: <IndianRupee size={17} />,
    },
    {
      id: "orders",
      label: "Orders",
      icon: <Package size={17} />,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-section">
        <div className="logo-box">CL</div>
        <h2>CraftLink AI</h2>
      </div>

      <nav className="nav-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-item ${page === item.id ? "active" : ""}`}
            onClick={() => setPage(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button
          type="button"
          className="back-home"
          onClick={() => setPage("home")}
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;