import { useState, useEffect } from "react";

import {
  LayoutDashboard,
  ShoppingBag,
  Plus,
  Sparkles,
  TrendingUp,
  Package,
  MessageSquare,
  BarChart3,
  Settings,
  Home,
  Menu,
  Bell,
  ChevronDown,
  FileText,
  IndianRupee,
  MapPin,
  Calendar,
  Save,
  Send,
  CheckCircle2,
  Users,
  X,
  Search,
  Edit3,
  Trash2,
  Eye,
  Filter,
  Boxes,
  ImagePlus,
  Heart,
} from "lucide-react";
import Login from "./login";
import Register from "./register";
import "./App.css";


  function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("isLoggedIn") === "true";
  });
  const [showRegister, setShowRegister] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [showAI, setShowAI] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New AI Match", text: "Meera Handlooms is a 94% match for your requirement.", time: "5 min ago", unread: true },
    { id: 2, title: "Order Updated", text: "Order #CL-10482 is now being processed.", time: "28 min ago", unread: true },
    { id: 3, title: "New Message", text: "You received a message from Thanjavur Crafts.", time: "1 hour ago", unread: false },
  ]);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [settingsData, setSettingsData] = useState({
    notifications: true,
    aiSuggestions: true,
    emailUpdates: false,
    publicProfile: true,
  });
  const [accountRole, setAccountRole] = useState(
     () => sessionStorage.getItem("accountRole") || "Buyer"
  );
    
  const [accountName, setAccountName] = useState(
      () => sessionStorage.getItem("accountName") || "Ravi Verma"
  );

  const getInitials = (name) => {
    return (name || "User")
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const buyerAccountName =
    sessionStorage.getItem("buyerAccountName") ||
    (accountRole === "Buyer" ? accountName : "Buyer");

  const artisanAccountName =
    sessionStorage.getItem("artisanAccountName") ||
    (accountRole === "Artisan" ? accountName : "Artisan");
const [pricingItems, setPricingItems] = useState([
  {
    product: "Handwoven Cotton Saree",
    current: 2750,
    suggested: 3100,
    demand: "High",
    confidence: "92%",
  },
  {
    product: "Traditional Brass Lamp",
    current: 3400,
    suggested: 3650,
    demand: "Medium",
    confidence: "88%",
  },
  {
    product: "Silver Jewellery",
    current: 1850,
    suggested: 2100,
    demand: "High",
    confidence: "90%",
  },
]);
  const buyerMenuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={21} /> },
    { name: "Discover Products", icon: <ShoppingBag size={21} /> },
    { name: "Post Requirement", icon: <Plus size={21} /> },
    { name: "AI Matches", icon: <Sparkles size={21} /> },
    { name: "Dynamic Pricing", icon: <TrendingUp size={21} /> },
    { name: "Orders", icon: <Package size={21} /> },
    { name: "Messages", icon: <MessageSquare size={21} /> },
    { name: "Analytics", icon: <BarChart3 size={21} /> },
    { name: "Settings", icon: <Settings size={21} /> },
  ];

  const artisanMenuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={21} /> },
    { name: "Buyer Opportunities", icon: <Users size={21} /> },
    { name: "My Products", icon: <Package size={21} /> },
    { name: "AI Matches", icon: <Sparkles size={21} /> },
    { name: "Dynamic Pricing", icon: <TrendingUp size={21} /> },
    { name: "Orders", icon: <ShoppingBag size={21} /> },
    { name: "Messages", icon: <MessageSquare size={21} /> },
    { name: "Analytics", icon: <BarChart3 size={21} /> },
    { name: "Settings", icon: <Settings size={21} /> },
  ];

  const menuItems =
    accountRole === "Artisan" ? artisanMenuItems : buyerMenuItems;

  const [searchQuery, setSearchQuery] = useState("");
  const [productFilter, setProductFilter] = useState("All");
  const [savedProductIds, setSavedProductIds] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, name: "Handwoven Cotton Saree", category: "Textiles", price: "2750", quantity: "120", artisan: "Meera Handlooms", location: "Coimbatore", emoji: "🧵" },
    { id: 2, name: "Traditional Brass Lamp", category: "Handicrafts", price: "3400", quantity: "45", artisan: "Thanjavur Crafts", location: "Thanjavur", emoji: "🪔" },
    { id: 3, name: "Handmade Silver Jewellery", category: "Jewellery", price: "1850", quantity: "80", artisan: "Heritage Silver", location: "Madurai", emoji: "💎" },
    { id: 4, name: "Terracotta Dinner Set", category: "Pottery", price: "2200", quantity: "60", artisan: "Village Pottery", location: "Pudukkottai", emoji: "🏺" },
  ]);

  const [productForm, setProductForm] = useState({
    id: null,
    name: "",
    category: "Textiles",
    price: "",
    quantity: "",
    image: "",
  });
  useEffect(() => {
     sessionStorage.setItem("accountRole", accountRole);
  sessionStorage.setItem("accountName", accountName);
}, [accountRole, accountName]);
const loadProducts = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/products");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const result = await response.json();

    console.log("Products from backend:", result);

    if (result.success) {
      const loadedProducts = result.data.map((product) => ({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        quantity: product.quantity,
        image: product.image_url || "",
        artisan_id: product.artisan_id || null,
        artisan: "Your Artisan Store",
        location: "Tamil Nadu",
        emoji: "✨",
      }));

      console.log("Loaded products:", loadedProducts);
      setProducts(loadedProducts);
    }
  } catch (error) {
    console.error("Failed to load products:", error);
  }
};

const loadOrders = async () => {
  try {
    setOrdersLoading(true);

    const response = await fetch("http://localhost:5000/api/orders");

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const result = await response.json();

    if (result.success) {
      const formattedOrders = result.data.map((order) => ({
        id: order.id,
        buyer_id: order.buyer_id,
        artisan_id: order.artisan_id,
        product_id: order.product_id,

        productName: order.products?.name || "Unknown Product",
        productImage: order.products?.image_url || "",
        productCategory: order.products?.category || "General",
        productPrice: order.products?.price || 0,

        quantity: order.quantity || 1,
        total_amount: Number(order.total_amount || 0),

        status: order.status || "Pending",
        created_at: order.created_at,

        date: new Date(order.created_at).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      }));

      setOrders(formattedOrders);
    }
  } catch (error) {
    console.error("Failed to load orders:", error);
  } finally {
    setOrdersLoading(false);
  }
};

const getLocalDemoId = (key) => {
  let id = localStorage.getItem(key);

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }

  return id;
};

const createProfile = async ({ name, role, email, phone, state, city }) => {
  const response = await fetch("http://localhost:5000/api/profiles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      role,
      email: email || null,
      phone: phone || null,
      state: state || null,
      city: city || null,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to create profile");
  }

  return result.data;
};

const getCurrentProfileId = () => {
  return sessionStorage.getItem("craftlinkProfileId") || "";
};

const placeOrder = async () => {
  if (!selectedProduct) return;

  const availableQuantity = Number(selectedProduct.quantity || 0);
  const quantity = Number(orderQuantity);
  const unitPrice = Number(selectedProduct.price || 0);

  if (!selectedProduct.id) {
    alert("This product does not have a valid product ID.");
    return;
  }

  if (!quantity || quantity < 1) {
    alert("Please select at least 1 unit.");
    return;
  }

  if (quantity > availableQuantity) {
    alert(`Only ${availableQuantity} units are available.`);
    return;
  }

  if (!unitPrice) {
    alert("This product does not have a valid price.");
    return;
  }

  setPlacingOrder(true);

  try {
    const buyerId = getLocalDemoId("craftlinkBuyerId");
    const artisanId = selectedProduct.artisan_id;

    if (!artisanId) {
      alert("This product is not linked to an Artisan.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buyer_id: buyerId,
        artisan_id: artisanId,
        product_id: selectedProduct.id,
        quantity,
        total_amount: unitPrice * quantity,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to place order");
    }

    alert("Order placed successfully! 🎉");

    setSelectedProduct(null);
    setOrderQuantity(1);

    await loadOrders();
    setActiveMenu("Orders");
  } catch (error) {
    console.error("PLACE ORDER ERROR:", error);
    alert(error.message || "Failed to place order.");
  } finally {
    setPlacingOrder(false);
  }
};


useEffect(() => {
  loadProducts();
  loadOrders();
}, []);

  const [showProductForm, setShowProductForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
const [placingOrder, setPlacingOrder] = useState(false);
const [productImagePreview, setProductImagePreview] = useState("");
const [orders, setOrders] = useState([]);
const [ordersLoading, setOrdersLoading] = useState(true);
  const [orderFilter, setOrderFilter] = useState("All");
  const [chatInput, setChatInput] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedChat, setSelectedChat] = useState(0);
  const [messages, setMessages] = useState([
    { id: 1, sender: "Meera Handlooms", text: "Hello! We can supply the required quantity.", time: "10:24 AM", mine: false },
    { id: 2, sender: "You", text: "Great. Please share your catalogue and pricing.", time: "10:26 AM", mine: true },
    { id: 3, sender: "Meera Handlooms", text: "Sure, I have shared the latest product details.", time: "10:28 AM", mine: false },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    quantity: "",
    minimum: "",
    maximum: "",
    state: "",
    city: "",
    timeline: "",
    description: "",
  });

  const stateCities = {
    "Tamil Nadu": [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Tiruchirappalli",
      "Salem",
      "Tiruppur",
      "Erode",
      "Vellore",
    ],
    "Kerala": [
      "Kochi",
      "Thiruvananthapuram",
      "Kozhikode",
      "Thrissur",
      "Kollam",
    ],
    "Karnataka": [
      "Bengaluru",
      "Mysuru",
      "Mangaluru",
      "Hubballi",
    ],
    "Andhra Pradesh": [
      "Visakhapatnam",
      "Vijayawada",
      "Guntur",
      "Tirupati",
    ],
    "Telangana": [
      "Hyderabad",
      "Warangal",
      "Nizamabad",
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => {
      if (name === "state") {
        return {
          ...previousData,
          state: value,
          city: "",
        };
      }

      return {
        ...previousData,
        [name]: value,
      };
    });
  };

  const saveDraft = () => {
    alert("Requirement saved as draft!");
  };

  const postRequirement = () => {
    if (
      !formData.title ||
      !formData.category ||
      !formData.quantity ||
      !formData.state ||
      !formData.city
    ) {
      alert("Please fill the required fields.");
      return;
    }

    alert("Requirement posted successfully!");
  };

  /* ================= DASHBOARD ================= */

  const renderDashboard = () => {
    if (accountRole === "Artisan") {
      const artisanStats = [
        {
          title: "Active Products",
          value: "12",
          description: "Products listed in marketplace",
          icon: Package,
        },
        {
          title: "Buyer Opportunities",
          value: "24",
          description: "New matching requirements",
          icon: FileText,
        },
        {
          title: "Active Orders",
          value: "08",
          description: "Orders currently in progress",
          icon: ShoppingBag,
        },
        {
          title: "Monthly Growth",
          value: "12%",
          description: "Growth compared to last month",
          icon: TrendingUp,
        },
      ];

      return (
        <div className="dashboard-page">
          <div className="dashboard-welcome">
            <div>
              <p className="dashboard-label">
                ARTISAN WORKSPACE
              </p>

              <h2>Welcome back, Artisan 👋</h2>

              <p className="dashboard-subtitle">
                Manage your products, discover buyer opportunities and grow your business with CraftLink AI.
              </p>
            </div>

            <button
              className="dashboard-post-btn"
              onClick={() =>
                setActiveMenu("Buyer Opportunities")
              }
            >
              <ShoppingBag size={20} />
              Explore Opportunities
            </button>
          </div>

          <div className="dashboard-stats">
            {artisanStats.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  className="dashboard-stat-card"
                  key={index}
                >
                  <div className="stat-icon">
                    <Icon size={25} />
                  </div>

                  <div className="stat-content">
                    <p>{item.title}</p>
                    <h3>{item.value}</h3>
                    <span>{item.description}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="dashboard-grid">
            <section className="dashboard-section recent-requirements">
              <div className="section-header">
                <div>
                  <p className="section-label">
                    MARKETPLACE OPPORTUNITIES
                  </p>

                  <h3>
                    Buyer Requirements For You
                  </h3>
                </div>
              </div>

              <div className="requirement-list">
                <div className="dashboard-requirement-item">
                  <div className="requirement-icon">
                    <FileText size={22} />
                  </div>

                  <div className="requirement-info">
                    <h4>
                      Handmade Cotton Sarees Required
                    </h4>

                    <p>
                      500 Units • Budget ₹1,50,000
                    </p>
                  </div>

                  <div className="requirement-status matching">
                    92% Match
                  </div>
                </div>

                <div className="dashboard-requirement-item">
                  <div className="requirement-icon">
                    <Sparkles size={22} />
                  </div>

                  <div className="requirement-info">
                    <h4>
                      Traditional Handcrafted Jewellery
                    </h4>

                    <p>
                      100 Units • Premium Buyer
                    </p>
                  </div>

                  <div className="requirement-status matching">
                    88% Match
                  </div>
                </div>

                <div className="dashboard-requirement-item">
                  <div className="requirement-icon">
                    <Package size={22} />
                  </div>

                  <div className="requirement-info">
                    <h4>
                      Handmade Home Decor Collection
                    </h4>

                    <p>
                      250 Units • Delivery in 30 days
                    </p>
                  </div>

                  <div className="requirement-status active">
                    New
                  </div>
                </div>
              </div>
            </section>

            <section className="dashboard-section ai-insight-card">
              <div className="ai-insight-top">
                <div className="ai-insight-icon">
                  <Sparkles size={26} />
                </div>

                <span>AI BUSINESS INSIGHT</span>
              </div>

              <h3>
                New Opportunities Found
              </h3>

              <p>
                CraftLink AI found 24 buyer requirements matching your products and artisan skills.
              </p>

              <div className="insight-progress">
                <div className="progress-info">
                  <span>
                    Marketplace Visibility
                  </span>

                  <strong>86%</strong>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: "86%" }}
                  />
                </div>
              </div>

              <button
                className="ai-insight-btn"
                onClick={() =>
                  setActiveMenu("AI Matches")
                }
              >
                <Sparkles size={18} />
                View AI Opportunities
              </button>
            </section>
          </div>

          <div className="dashboard-bottom-grid">
            <section className="dashboard-section quick-actions">
              <div className="section-header">
                <div>
                  <p className="section-label">
                    QUICK ACTIONS
                  </p>

                  <h3>
                    Grow your artisan business
                  </h3>
                </div>
              </div>

              <div className="quick-action-grid">
                <button
                  onClick={() =>
                    setActiveMenu("Buyer Opportunities")
                  }
                >
                  <ShoppingBag size={22} />
                  <span>
                    Explore Opportunities
                  </span>
                </button>

                <button
                  onClick={() =>
                    setActiveMenu("AI Matches")
                  }
                >
                  <Sparkles size={22} />
                  <span>
                    Find AI Opportunities
                  </span>
                </button>

                <button
                  onClick={() =>
                    setActiveMenu("Orders")
                  }
                >
                  <Package size={22} />
                  <span>
                    Manage Orders
                  </span>
                </button>
              </div>
            </section>

            <section className="dashboard-section marketplace-summary">
              <p className="section-label">
                THIS MONTH
              </p>

              <h3>
                Business Summary
              </h3>

              <div className="summary-row">
                <span>
                  New Buyer Opportunities
                </span>
                <strong>+24</strong>
              </div>

              <div className="summary-row">
                <span>
                  AI Matches
                </span>
                <strong>18</strong>
              </div>

              <div className="summary-row">
                <span>
                  Profile Visibility
                </span>
                <strong>86%</strong>
              </div>
            </section>
          </div>
        </div>
      );
    }

    const stats = [
      {
        title: "Active Requirements",
        value: "03",
        description: "Requirements currently active",
        icon: FileText,
      },
      {
        title: "AI Matches Found",
        value: "28",
        description: "Suitable artisan matches",
        icon: Sparkles,
      },
      {
        title: "Responses Received",
        value: "14",
        description: "New artisan responses",
        icon: Users,
      },
      {
        title: "Active Orders",
        value: "08",
        description: "Orders being processed",
        icon: Package,
      },
    ];

    return (
      <div className="dashboard-page">
        <div className="dashboard-welcome">
          <div>
            <p className="dashboard-label">
              MARKETPLACE OVERVIEW
            </p>

            <h2>Welcome back, {accountName} 👋</h2>

            <p className="dashboard-subtitle">
              Here's what's happening with your CraftLink AI
              marketplace today.
            </p>
          </div>

          <button
            className="dashboard-post-btn"
            onClick={() =>
              setActiveMenu("Post Requirement")
            }
          >
            <Plus size={20} />
            Post Requirement
          </button>
        </div>

        <div className="dashboard-stats">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                className="dashboard-stat-card"
                key={index}
              >
                <div className="stat-icon">
                  <Icon size={25} />
                </div>

                <div className="stat-content">
                  <p>{item.title}</p>
                  <h3>{item.value}</h3>
                  <span>{item.description}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="dashboard-grid">
          <section className="dashboard-section recent-requirements">
            <div className="section-header">
              <div>
                <p className="section-label">
                  RECENT ACTIVITY
                </p>

                <h3>
                  Your Recent Requirements
                </h3>
              </div>

              <button
                className="view-all-btn"
                onClick={() =>
                  setActiveMenu("Post Requirement")
                }
              >
                View All
              </button>
            </div>

            <div className="requirement-list">
              <div className="dashboard-requirement-item">
                <div className="requirement-icon">
                  <FileText size={22} />
                </div>

                <div className="requirement-info">
                  <h4>
                    Handmade Cotton Sarees for Retail
                  </h4>

                  <p>
                    Textiles • 500 Units • Coimbatore
                  </p>
                </div>

                <div className="requirement-status active">
                  Active
                </div>
              </div>

              <div className="dashboard-requirement-item">
                <div className="requirement-icon">
                  <Package size={22} />
                </div>

                <div className="requirement-info">
                  <h4>
                    Traditional Clay Pottery Collection
                  </h4>

                  <p>
                    Pottery • 200 Units • Puducherry
                  </p>
                </div>

                <div className="requirement-status matching">
                  12 Matches
                </div>
              </div>

              <div className="dashboard-requirement-item">
                <div className="requirement-icon">
                  <Sparkles size={22} />
                </div>

                <div className="requirement-info">
                  <h4>
                    Handcrafted Silver Jewellery
                  </h4>

                  <p>
                    Jewellery • 100 Units • Jaipur
                  </p>
                </div>

                <div className="requirement-status pending">
                  Pending
                </div>
              </div>
            </div>
          </section>

          <section className="dashboard-section ai-insight-card">
            <div className="ai-insight-top">
              <div className="ai-insight-icon">
                <Sparkles size={26} />
              </div>

              <span>AI INSIGHT</span>
            </div>

            <h3>
              Your Marketplace Is Growing
            </h3>

            <p>
              Your requirements have received more
              responses this week. CraftLink AI has
              identified new artisan matches for your
              business.
            </p>

            <div className="insight-progress">
              <div className="progress-info">
                <span>
                  Marketplace Activity
                </span>

                <strong>78%</strong>
              </div>

              <div className="progress-bar">
                <div className="progress-fill" />
              </div>
            </div>

            <button
              className="ai-insight-btn"
              onClick={() =>
                setActiveMenu("AI Matches")
              }
            >
              <Sparkles size={18} />
              Explore AI Matches
            </button>
          </section>
        </div>

        <div className="dashboard-bottom-grid">
          <section className="dashboard-section quick-actions">
            <div className="section-header">
              <div>
                <p className="section-label">
                  QUICK ACTIONS
                </p>

                <h3>
                  What would you like to do?
                </h3>
              </div>
            </div>

            <div className="quick-action-grid">
              <button
                onClick={() =>
                  setActiveMenu("Buyer Opportunities")
                }
              >
                <ShoppingBag size={22} />
                <span>
                  Discover Products
                </span>
              </button>

              <button
                onClick={() =>
                  setActiveMenu("Post Requirement")
                }
              >
                <Plus size={22} />
                <span>
                  Post Requirement
                </span>
              </button>

              <button
                onClick={() =>
                  setActiveMenu("AI Matches")
                }
              >
                <Sparkles size={22} />
                <span>
                  Find AI Matches
                </span>
              </button>
            </div>
          </section>

          <section className="dashboard-section marketplace-summary">
            <p className="section-label">
              THIS MONTH
            </p>

            <h3>
              Marketplace Summary
            </h3>

            <div className="summary-row">
              <span>
                New Artisan Connections
              </span>
              <strong>+24</strong>
            </div>

            <div className="summary-row">
              <span>
                Successful Matches
              </span>
              <strong>18</strong>
            </div>

            <div className="summary-row">
              <span>
                Average Response Time
              </span>
              <strong>2.4h</strong>
            </div>
          </section>
        </div>
      </div>
    );
  };

  /* ================= SIMPLE PAGE ================= */

 const renderBuyerOpportunities = () => {
  const opportunities = [
    {
      title: "Handmade Cotton Sarees Required",
      category: "Textiles",
      quantity: "500 Units",
      budget: "₹1,50,000",
      location: "Chennai",
      deadline: "Within 2 weeks",
      match: 92,
    },
    {
      title: "Traditional Handcrafted Jewellery",
      category: "Jewellery",
      quantity: "250 Units",
      budget: "₹2,00,000",
      location: "Bengaluru",
      deadline: "Within 1 month",
      match: 88,
    },
    {
      title: "Eco-friendly Terracotta Products",
      category: "Pottery",
      quantity: "400 Units",
      budget: "₹1,20,000",
      location: "Mumbai",
      deadline: "Flexible",
      match: 84,
    },
  ];

  return (
    <div className="page-container" style={{ display: "block" }}>
      
      <div className="dashboard-welcome" style={{ marginBottom: 24 }}>
        <div>
          <p className="dashboard-label">ARTISAN MARKETPLACE</p>
          <h2>Buyer Opportunities</h2>
          <p className="dashboard-subtitle">
            Requirements selected by AI based on your products and business profile.
          </p>
        </div>

        <div className="ai-match-badge">
          <Sparkles size={18} /> AI Matching Active
        </div>
      </div>

      <div className="opportunity-grid">
        {opportunities.map((item, index) => (
          <div className="opportunity-card" key={index}>
            
            <div className="opportunity-top">
              <div className="opportunity-category">
                {item.category}
              </div>

              <div className="match-score">
                {item.match}% Match
              </div>
            </div>

            <h3>{item.title}</h3>

            <div className="opportunity-meta">
              <span>
                <Package size={17} /> {item.quantity}
              </span>

              <span>
                <IndianRupee size={17} /> {item.budget}
              </span>

              <span>
                <MapPin size={17} /> {item.location}
              </span>

              <span>
                <Calendar size={17} /> {item.deadline}
              </span>
            </div>

            <div className="opportunity-actions">

              <button
                onClick={() => setSelectedOpportunity(item)}
              >
                <Eye size={17} /> View Details
              </button>

              <button
                className="primary-action"
                onClick={() =>
                  alert(
                    "Interest submitted successfully! The buyer will be notified."
                  )
                }
              >
                <Send size={17} /> Apply Now
              </button>

            </div>

          </div>
        ))}
      </div>


      {/* VIEW DETAILS POPUP */}

      {selectedOpportunity && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedOpportunity(null)}
        >
          <div
            className="details-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setSelectedOpportunity(null)}
            >
              ×
            </button>

            <p className="dashboard-label">
              BUYER REQUIREMENT
            </p>

            <h2>
              {selectedOpportunity.title}
            </h2>

            <div className="details-row">
              <strong>Category</strong>
              <span>
                {selectedOpportunity.category}
              </span>
            </div>

            <div className="details-row">
              <strong>Quantity</strong>
              <span>
                {selectedOpportunity.quantity}
              </span>
            </div>

            <div className="details-row">
              <strong>Budget</strong>
              <span>
                {selectedOpportunity.budget}
              </span>
            </div>

            <div className="details-row">
              <strong>Location</strong>
              <span>
                {selectedOpportunity.location}
              </span>
            </div>

            <div className="details-row">
              <strong>Deadline</strong>
              <span>
                {selectedOpportunity.deadline}
              </span>
            </div>

            <div className="details-row">
              <strong>AI Match</strong>
              <span>
                {selectedOpportunity.match}% Match
              </span>
            </div>

            <button
              className="primary-action"
              style={{ width: "100%", marginTop: "20px" }}
              onClick={() => {
                alert("Interest submitted successfully!");
                setSelectedOpportunity(null);
              }}
            >
              <Send size={17} /> Apply Now
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
  const renderMyProducts = () => {
    const currentArtisanId = getCurrentProfileId();

    const artisanProducts = products.filter(
      (product) => product.artisan_id === currentArtisanId
    );
    const saveProduct = async () => {
  console.log("SAVE BUTTON CLICKED");
  console.log("PRODUCT FORM:", productForm);

  if (!productForm.name || !productForm.price || !productForm.quantity) {
    alert("Please fill product name, price and quantity.");
    return;
  }

  try {
    let uploadedImageUrl = productForm.image || "";

if (productForm.image instanceof File) {
  const formData = new FormData();
  formData.append("image", productForm.image);

  const uploadResponse = await fetch(
    "http://localhost:5000/api/products/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const uploadResult = await uploadResponse.json();

  if (!uploadResponse.ok || !uploadResult.success) {
    alert(uploadResult.message || "Image upload failed");
    return;
  }

  uploadedImageUrl = uploadResult.image_url;
}
    const isEditing = !!productForm.id;

    const artisanId = getCurrentProfileId();

    if (!artisanId) {
      alert("Artisan profile not found. Please logout and register/login again.");
      return;
    }

    const url = isEditing
      ? `http://localhost:5000/api/products/${productForm.id}`
      : "http://localhost:5000/api/products";

    console.log("Sending request to:", url);

    const response = await fetch(url, {
      method: isEditing ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: productForm.name,
        category: productForm.category,
        price: Number(productForm.price),
        quantity: Number(productForm.quantity),
        image_url: uploadedImageUrl,
        artisan_id: artisanId,
      }),
    });

    console.log("Response status:", response.status);

    const result = await response.json();

    console.log("Backend response:", result);

    if (!response.ok || !result.success) {
      alert(result.message || "Failed to save product");
      return;
    }

    alert(
      isEditing
        ? "Product updated successfully!"
        : "Product saved successfully!"
    );

    setProductForm({
      id: null,
      name: "",
      category: "Textiles",
      price: "",
      quantity: "",
      image: "",
    });

    setProductImagePreview("");
    setShowProductForm(false);

    await loadProducts();

  } catch (error) {
    console.error("Save Product Error:", error);
    alert("Backend connection failed!");
  }
};

    const editProduct = (product) => {
      setProductForm(product);
      setProductImagePreview(product.image || "");
      setShowProductForm(true);
    };
    
const deleteProduct = async (id) => {
  if (!window.confirm("Delete this product?")) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/products/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      alert(result.message || "Failed to delete product");
      return;
    }

    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== id)
    );

    alert("Product deleted successfully!");

  } catch (error) {
    console.error("Delete Product Error:", error);
    alert("Failed to connect to backend");
  }
};
    return (
      <div className="page-container" style={{ display: "block" }}>
        <div className="dashboard-welcome" style={{ marginBottom: 24 }}>
          <div>
            <p className="dashboard-label">ARTISAN CATALOG</p>
            <h2>My Products</h2>
            <p className="dashboard-subtitle">Manage your marketplace catalog and product availability.</p>
          </div>
          <button
            type="button"
            className="dashboard-post-btn"
            onClick={() => {
              setProductForm({ id: null, name: "", category: "Textiles", price: "", quantity: "", image: "" });
              setProductImagePreview("");
              setShowProductForm(true);
            }}
          >
            <Plus size={20} /> Add Product
          </button>
        </div>

        {selectedProduct && (
          <div
            className="product-details-modal-overlay"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="product-details-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="product-details-close"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close product details"
              >
                <X size={21} />
              </button>

              <div className="product-details-image-wrap">
                {selectedProduct.image ? (
                  <img src={selectedProduct.image} alt={selectedProduct.name} />
                ) : (
                  <div className="product-details-image-placeholder">
                    <Package size={48} />
                  </div>
                )}
              </div>

              <div className="product-details-content">
                <span className="product-details-category">{selectedProduct.category}</span>
                <h2>{selectedProduct.name}</h2>

                <div className="product-details-meta">
                  <div>
                    <span>Price</span>
                    <strong>₹{selectedProduct.price || "—"}</strong>
                  </div>
                  <div>
                    <span>Available Quantity</span>
                    <strong>{selectedProduct.quantity || "—"}</strong>
                  </div>
                </div>

                <p>
                  This product is listed in your CraftLink AI marketplace catalog and is ready to be matched with relevant buyer requirements.
                </p>

                <div className="product-details-actions">
                  <button
                    type="button"
                    className="cancel-product-btn"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    className="dashboard-post-btn"
                    onClick={() => {
                      setActiveMenu("Post Requirement");
                      setSelectedProduct(null);
                    }}
                  >
                    <Sparkles size={18} /> Find AI Matches
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showProductForm && (
          <div
            className="product-modal-overlay"
            onClick={() => setShowProductForm(false)}
          >
            <div
              className="product-form-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="product-form-header">
                <div>
                  <p className="product-form-label">ARTISAN CATALOG</p>
                  <h3>{productForm.id ? "Edit Product" : "Add New Product"}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowProductForm(false)}
                  aria-label="Close product form"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="product-form-grid">
                <input
                  placeholder="Product name"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                />

                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                >
                  <option>Textiles</option>
                  <option>Jewellery</option>
                  <option>Pottery</option>
                  <option>Handicrafts</option>
                </select>

                <input
                  type="number"
                  placeholder="Price (₹)"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                />

                <input
                  type="number"
                  placeholder="Available quantity"
                  value={productForm.quantity}
                  onChange={(e) => setProductForm({ ...productForm, quantity: e.target.value })}
                />
              </div>

              <div className="product-image-upload">
                <label htmlFor="product-image">Product Image</label>
                <div className="product-image-upload-row">
                  <label className="product-upload-box" htmlFor="product-image">
                    {productImagePreview || productForm.image ? (
                      <img
                        src={productImagePreview || productForm.image}
                        alt="Product preview"
                        className="product-image-preview"
                      />
                    ) : (
                      <div className="product-upload-placeholder">
                        <ImagePlus size={28} />
                        <span>Upload product image</span>
                      </div>
                    )}
                  </label>

                  <input
                    id="product-image"
                    type="file"
                    accept="image/*"
                    className="product-file-input"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (!file) return;

                      setProductForm((previous) => ({
                        ...previous,
                        image: file,
                      }));

                      setProductImagePreview(URL.createObjectURL(file));
                    }}
                  />

                  <div className="product-image-help">
                    <strong>Make your product stand out</strong>
                    <span>Upload a clear square product photo.</span>
                    {(productImagePreview || productForm.image) && (
                      <button
                        type="button"
                        onClick={() => {
                          setProductImagePreview("");
                          setProductForm({ ...productForm, image: "" });
                        }}
                      >
                        Remove image
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="product-form-actions">
                <button
                  type="button"
                  className="cancel-product-btn"
                  onClick={() => setShowProductForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="dashboard-post-btn"
                  onClick={saveProduct}
                >
                  <Save size={18} /> Save Product
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="product-grid-new">
          {artisanProducts.map((product) => (
            <div className="market-product-card" key={product.id}>
              {product.image ? (
                <img
                  className="discover-product-image"
                  src={product.image}
                  alt={product.name}
                />
              ) : (
                <div className="product-emoji">{product.emoji}</div>
              )}
              <div className="product-category">{product.category}</div>
              <h3>{product.name}</h3>
              <p>{product.artisan}</p>
              <div className="product-price">₹{product.price}</div>
              <div className="product-quantity">{product.quantity} units available</div>
              <div className="product-actions">
                <button onClick={() => editProduct(product)}><Edit3 size={17} /> Edit</button>
                <button className="delete-action" onClick={() => deleteProduct(product.id)}><Trash2 size={17} /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDiscoverProducts = () => {
    const filteredProducts = products.filter((product) => {
      const query = searchQuery.trim().toLowerCase();

      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.artisan.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.location.toLowerCase().includes(query);

      const matchesCategory =
        productFilter === "All" || product.category === productFilter;

      return matchesSearch && matchesCategory;
    });

    const toggleSavedProduct = (id) => {
      setSavedProductIds((current) =>
        current.includes(id)
          ? current.filter((productId) => productId !== id)
          : [...current, id]
      );
    };

    const clearFilters = () => {
      setSearchQuery("");
      setProductFilter("All");
    };

    return (
      <div className="page-container" style={{ display: "block" }}>
        <div className="dashboard-welcome" style={{ marginBottom: 22 }}>
          <div>
            <p className="dashboard-label">B2B MARKETPLACE</p>
            <h2>Discover Products</h2>
            <p className="dashboard-subtitle">
              Browse verified products from skilled artisans.
            </p>
          </div>
        </div>

        <div className="market-filters discover-filter-bar">
          <div className="search-box">
            <Search size={19} />
            <input
              placeholder="Search products, artisans or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-select">
            <Filter size={18} />
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
            >
              <option>All</option>
              <option>Textiles</option>
              <option>Jewellery</option>
              <option>Pottery</option>
              <option>Handicrafts</option>
            </select>
          </div>

          {(searchQuery || productFilter !== "All") && (
            <button
              type="button"
              className="clear-filter-btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="discover-result-row">
          <span>
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} found
          </span>
          <span className="saved-count">
            <Heart size={15} />
            {savedProductIds.length} saved
          </span>
        </div>

        <div className="product-grid-new">
          {filteredProducts.map((product) => {
            const isSaved = savedProductIds.includes(product.id);

            return (
              <div className="market-product-card discover-product-card" key={product.id}>
                <button
                  type="button"
                  className={`favorite-product-btn ${isSaved ? "saved" : ""}`}
                  onClick={() => toggleSavedProduct(product.id)}
                  aria-label={isSaved ? "Remove from saved products" : "Save product"}
                  title={isSaved ? "Remove from saved" : "Save product"}
                >
                  <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
                </button>

                {product.image ? (
                  <img
                    className="discover-product-image"
                    src={product.image}
                    alt={product.name}
                  />
                ) : (
                  <div className="product-emoji">{product.emoji}</div>
                )}

                <div className="product-category">{product.category}</div>
                <h3>{product.name}</h3>
                <p>{product.artisan} • {product.location}</p>
                <div className="product-price">₹{product.price}</div>
                <div className="product-quantity">
                  {product.quantity} units available
                </div>

                <div className="discover-product-actions">
                  <button
                    type="button"
                    className="product-details-btn"
                    onClick={() => {
                      setOrderQuantity(1);
                      setSelectedProduct(product);
                    }}
                  >
                    <Eye size={17} /> View Details
                  </button>

                  <button
                    type="button"
                    className="product-contact-btn"
                    onClick={() => alert(`Enquiry sent to ${product.artisan}!`)}
                  >
                    <MessageSquare size={17} /> Contact
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {selectedProduct && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              background: "rgba(10, 20, 35, 0.58)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => {
              setSelectedProduct(null);
              setOrderQuantity(1);
            }}
          >
            <div
              style={{
                width: "min(760px, 100%)",
                maxHeight: "90vh",
                overflowY: "auto",
                background: "#ffffff",
                borderRadius: "24px",
                boxShadow: "0 30px 80px rgba(15, 23, 42, 0.25)",
                padding: "28px",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedProduct(null);
                  setOrderQuantity(1);
                }}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  width: "38px",
                  height: "38px",
                  border: "none",
                  borderRadius: "50%",
                  background: "#f1f5f9",
                  color: "#475569",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={20} />
              </button>

              <div style={{ display: "grid", gridTemplateColumns: "minmax(180px, 0.9fr) minmax(0, 1.3fr)", gap: "26px", alignItems: "start" }}>
                <div
                  style={{
                    minHeight: "260px",
                    borderRadius: "18px",
                    background: "linear-gradient(135deg, #eef2ff, #e8fafc)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {selectedProduct.image ? (
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div style={{ fontSize: "72px" }}>{selectedProduct.emoji || "✨"}</div>
                  )}
                </div>

                <div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "6px 10px",
                      borderRadius: "999px",
                      background: "#f0f0ff",
                      color: "#4b4cc9",
                      fontSize: "12px",
                      fontWeight: 700,
                      marginBottom: "12px",
                    }}
                  >
                    {selectedProduct.category}
                  </div>

                  <h2 style={{ margin: "0 40px 8px 0", color: "#162033", fontSize: "28px" }}>
                    {selectedProduct.name}
                  </h2>

                  <p style={{ margin: "0 0 16px", color: "#64748b", lineHeight: 1.6 }}>
                    {selectedProduct.artisan} • {selectedProduct.location}
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "18px" }}>
                    <div style={{ padding: "14px", border: "1px solid #e5e7eb", borderRadius: "14px" }}>
                      <span style={{ display: "block", color: "#64748b", fontSize: "12px", marginBottom: "5px" }}>Price / unit</span>
                      <strong style={{ color: "#162033", fontSize: "20px" }}>₹{Number(selectedProduct.price || 0).toLocaleString("en-IN")}</strong>
                    </div>
                    <div style={{ padding: "14px", border: "1px solid #e5e7eb", borderRadius: "14px" }}>
                      <span style={{ display: "block", color: "#64748b", fontSize: "12px", marginBottom: "5px" }}>Available</span>
                      <strong style={{ color: "#162033", fontSize: "20px" }}>{selectedProduct.quantity} units</strong>
                    </div>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <strong style={{ color: "#334155" }}>Quantity</strong>
                      <span style={{ color: "#64748b", fontSize: "13px" }}>{selectedProduct.quantity} max</span>
                    </div>

                    <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid #dbe3ea", borderRadius: "12px", overflow: "hidden" }}>
                      <button
                        type="button"
                        onClick={() => setOrderQuantity((current) => Math.max(1, current - 1))}
                        style={{ width: "42px", height: "42px", border: "none", background: "#f8fafc", cursor: "pointer", fontSize: "20px", color: "#334155" }}
                      >
                        −
                      </button>
                      <strong style={{ minWidth: "48px", textAlign: "center", color: "#162033" }}>{orderQuantity}</strong>
                      <button
                        type="button"
                        onClick={() => setOrderQuantity((current) => Math.min(Number(selectedProduct.quantity || 1), current + 1))}
                        style={{ width: "42px", height: "42px", border: "none", background: "#f8fafc", cursor: "pointer", fontSize: "20px", color: "#334155" }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderTop: "1px solid #edf1f4", borderBottom: "1px solid #edf1f4", marginBottom: "18px" }}>
                    <span style={{ color: "#64748b", fontWeight: 600 }}>Total Amount</span>
                    <strong style={{ color: "#202a42", fontSize: "24px" }}>
                      ₹{(Number(selectedProduct.price || 0) * orderQuantity).toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProduct(null);
                        setOrderQuantity(1);
                      }}
                      style={{
                        padding: "12px 18px",
                        border: "1px solid #dbe3ea",
                        borderRadius: "11px",
                        background: "#ffffff",
                        color: "#475569",
                        cursor: "pointer",
                        fontWeight: 700,
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      disabled={placingOrder}
                      onClick={placeOrder}
                      className="dashboard-post-btn"
                      style={{ opacity: placingOrder ? 0.7 : 1 }}
                    >
                      <ShoppingBag size={18} />
                      {placingOrder ? "Placing Order..." : "Place Order"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="empty-state discover-empty-state">
            <Search size={32} />
            <h3>No products found</h3>
            <p>Try another product name, artisan, location or category.</p>
            <button type="button" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderAIMatches = () => {
    const matches = [
      { name: "Meera Handlooms", product: "Handwoven Cotton Sarees", score: 94, reason: "Strong category, quantity and budget match", location: "Coimbatore" },
      { name: "Thanjavur Crafts", product: "Traditional Brass Products", score: 89, reason: "Excellent product capability and delivery match", location: "Thanjavur" },
      { name: "Heritage Silver", product: "Handmade Silver Jewellery", score: 86, reason: "Good category and market compatibility", location: "Madurai" },
    ];

    return (
      <div className="page-container" style={{ display: "block" }}>
        <div className="dashboard-welcome" style={{ marginBottom: 24 }}>
          <div>
            <p className="dashboard-label">AI MARKETPLACE INTELLIGENCE</p>
            <h2>AI Matches</h2>
            <p className="dashboard-subtitle">Smart matches generated from category, quantity, budget and location compatibility.</p>
          </div>
          <div className="ai-match-badge"><Sparkles size={18} /> AI Engine Active</div>
        </div>

        <div className="ai-match-list">
          {matches.map((match, index) => (
            <div className="ai-match-card" key={index}>
              <div className="ai-match-score-circle">{match.score}%</div>
              <div className="ai-match-main">
                <h3>{match.name}</h3>
                <p>{match.product} • {match.location}</p>
                <span>{match.reason}</span>
              </div>
              <div className="ai-match-checks">
                <div>✓ Category Match</div>
                <div>✓ Quantity Match</div>
                <div>✓ Budget Match</div>
                <div>✓ Location Compatible</div>
              </div>
              <button className="product-contact-btn" onClick={() => {
                setActiveMenu("Messages");
                alert(`Opening conversation with ${match.name}`);
              }}>
                <MessageSquare size={17} /> Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDynamicPricing = () => {
  const applyAIPrice = (productName) => {
    setPricingItems((currentItems) =>
      currentItems.map((item) =>
        item.product === productName
          ? {
              ...item,
              current: item.suggested,
            }
          : item
      )
    );
  };

  return (
    <div className="page-container" style={{ display: "block" }}>
      <div className="dashboard-welcome" style={{ marginBottom: 24 }}>
        <div>
          <p className="dashboard-label">AI-POWERED PRICING</p>
          <h2>Dynamic Pricing</h2>
          <p className="dashboard-subtitle">Use AI recommendations to keep your product pricing competitive.</p>
        </div>
      </div>
      <div className="pricing-table">
        {pricingItems.map((item) => (
          <div className="pricing-row" key={item.product}>
            <div>
              <strong>{item.product}</strong>
              <span>{item.demand} demand · {item.confidence} confidence</span>
            </div>
            <span>₹{Number(item.current).toLocaleString("en-IN")}</span>
            <strong>₹{Number(item.suggested).toLocaleString("en-IN")}</strong>
            <button type="button" onClick={() => applyAIPrice(item.product)}>Apply AI Price</button>
          </div>
        ))}
      </div>
    </div>
  );
};

  const renderOrders = () => (
    <div className="page-container" style={{ display: "block" }}>
      <div className="dashboard-welcome" style={{ marginBottom: 24 }}>
        <div>
          <p className="dashboard-label">ORDER MANAGEMENT</p>
          <h2>Orders</h2>
          <p className="dashboard-subtitle">Track your marketplace orders in one place.</p>
        </div>
      </div>
      {ordersLoading ? (
        <div className="empty-state"><p>Loading orders...</p></div>
      ) : orders.length === 0 ? (
        <div className="empty-state"><p>No orders found.</p></div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-details">
                <div className="order-product-preview">
                  {order.productImage ? <img src={order.productImage} alt={order.productName}  style={{
                      width: "70px",
                      height: "70px",
                      minWidth: "70px",
                      maxWidth: "70px",
                      minHeight: "70px",
                      maxHeight: "70px",
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: "10px",
                      display: "block",
                      flexShrink: 0,
                    }} /> : <div className="product-emoji">📦</div>}
                  <div>
                    <span>Product</span>
                    <strong>{order.productName || "Unknown Product"}</strong>
                    <small>{order.productCategory || "General"}</small>
                  </div>
                </div>
                <div className="order-detail-item"><span>Quantity</span><strong>{order.quantity || 0} Units</strong></div>
                <div className="order-detail-item"><span>Total Amount</span><strong>₹{Number(order.total_amount || 0).toLocaleString("en-IN")}</strong></div>
              </div>
              <div className="order-card-footer">
                <span>{order.status} · {order.date || "Date unavailable"}</span>
                <button type="button" className="product-contact-btn" onClick={() => setSelectedOrder(order)}><Eye size={17} /> View Order</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="details-modal" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setSelectedOrder(null)}>×</button>
            <p className="dashboard-label">ORDER DETAILS</p>
            <h2>{selectedOrder.id}</h2>
            <div className="details-row"><strong>Product</strong><span>{selectedOrder.productName}</span></div>
            <div className="details-row"><strong>Quantity</strong><span>{selectedOrder.quantity} Units</span></div>
            <div className="details-row"><strong>Amount</strong><span>₹{Number(selectedOrder.total_amount || 0).toLocaleString("en-IN")}</span></div>
            <div className="details-row"><strong>Status</strong><span>{selectedOrder.status}</span></div>
            <div className="details-row"><strong>Order Date</strong><span>{selectedOrder.date || "Date unavailable"}</span></div>
            <button type="button" className="primary-action" style={{ width: "100%", marginTop: "20px" }} onClick={() => setSelectedOrder(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );

/* OLD CORRUPTED ORDER JSX REMOVED
    <div
  className="order-details"
  style={{
    display: "grid",
    gridTemplateColumns: "minmax(220px, 1.6fr) 1fr 1fr",
    gap: "18px",
    alignItems: "center",
  }}
>
  <div
    className="order-product-preview"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "14px",
    }}
  >
    <div
      style={{
        width: "72px",
        height: "72px",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#f3f4f6",
        flexShrink: 0,
      }}
    >
      {order.productImage ? (
        <img
          src={order.productImage}
          alt={order.productName}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
          }}
        >
          📦
        </div>
      )}
    </div>

    <div>
      <span
        style={{
          display: "block",
          fontSize: "12px",
          color: "#777",
          marginBottom: "4px",
        }}
      >
        Product
      </span>

      <strong
        style={{
          display: "block",
          fontSize: "16px",
          marginBottom: "4px",
        }}
      >
        {order.productName || "Unknown Product"}
      </strong>

      <span
        style={{
          fontSize: "13px",
          color: "#777",
        }}
      >
        {order.productCategory || "General"}
      </span>
    </div>
  </div>

  <div className="order-detail-item">
    <span>Quantity</span>
    <strong>{order.quantity || 0} Units</strong>
  </div>

  <div className="order-detail-item">
    <span>Total Amount</span>
    <strong>
      ₹{Number(order.total_amount || 0).toLocaleString("en-IN")}
    </strong>
  </div>
</div>
              <div className="order-card-footer">
                <button
                  className="product-contact-btn"
                  onClick={() => setSelectedOrder(order)}
                >
                  <Eye size={17} />
                  View Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="details-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedOrder(null)}>×</button>
            <p className="dashboard-label">ORDER DETAILS</p>
            <h2>{selectedOrder.id}</h2>
            <div className="details-row"><strong>Product</strong><span>{selectedOrder.product_id}</span></div>
            <div className="details-row"><strong>Quantity</strong><span>{selectedOrder.quantity} Units</span></div>
            <div className="details-row"><strong>Amount</strong><span>₹{Number(selectedOrder.total_amount || 0).toLocaleString("en-IN")}</span></div>
            <div className="details-row"><strong>Status</strong><span>{selectedOrder.status}</span></div>
            <div className="details-row"><strong>Order Date</strong><span>{selectedOrder.created_at ? new Date(selectedOrder.created_at).toLocaleDateString("en-IN") : "Date unavailable"}</span></div>
            <button className="primary-action" style={{ width: "100%", marginTop: "20px" }} onClick={() => setSelectedOrder(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}; */
  const renderMessages = () => {
    const chats = [
      { name: "Meera Handlooms", role: "Artisan", initials: "MH" },
      { name: "Thanjavur Crafts", role: "Artisan", initials: "TC" },
      { name: "Heritage Silver", role: "Artisan", initials: "HS" },
    ];

    const sendMessage = () => {
      const value = chatInput.trim();
      if (!value) return;
      setMessages([...messages, { id: Date.now(), sender: "You", text: value, time: "Now", mine: true }]);
      setChatInput("");
    };

    return (
      <div className="page-container" style={{ display: "block" }}>
        <div className="dashboard-welcome" style={{ marginBottom: 20 }}>
          <div>
            <p className="dashboard-label">MARKETPLACE COMMUNICATION</p>
            <h2>Messages</h2>
            <p className="dashboard-subtitle">Connect directly with buyers and artisans.</p>
          </div>
        </div>

        <div className="messages-layout">
          <div className="chat-list">
            {chats.map((chat, index) => (
              <button key={chat.name} className={selectedChat === index ? "active-chat" : ""} onClick={() => setSelectedChat(index)}>
                <div className="chat-avatar">{chat.initials}</div>
                <div><strong>{chat.name}</strong><span>{chat.role}</span></div>
              </button>
            ))}
          </div>

          <div className="chat-window">
            <div className="chat-header"><div className="chat-avatar">{chats[selectedChat].initials}</div><div><strong>{chats[selectedChat].name}</strong><span>Online</span></div></div>
            <div className="chat-messages">
              {messages.map((message) => (
                <div key={message.id} className={`message-bubble ${message.mine ? "mine" : ""}`}>
                  <p>{message.text}</p><span>{message.time}</span>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Type your message..." />
              <button onClick={sendMessage}><Send size={19} /></button>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const renderAnalytics = () => {
    const metrics = [
      { label: "Total Revenue", value: "₹2.48L", change: "+18.4%", icon: IndianRupee },
      { label: "MarketBuy Nows", value: "86", change: "+12.1%", icon: Package },
      { label: "AI Match Conversion", value: "64%", change: "+8.2%", icon: Sparkles },
      { label: "New Connections", value: "38", change: "+21.0%", icon: Users },
    ];

    const bars = [
      { label: "Apr", value: 42 },
      { label: "May", value: 58 },
      { label: "Jun", value: 51 },
      { label: "Jul", value: 72 },
      { label: "Aug", value: 67 },
      { label: "Sep", value: 88 },
    ];

    return (
      <div className="page-container" style={{ display: "block" }}>
        <div className="dashboard-welcome" style={{ marginBottom: 24 }}>
          <div>
            <p className="dashboard-label">BUSINESS INSIGHTS</p>
            <h2>Analytics</h2>
            <p className="dashboard-subtitle">A quick overview of your marketplace growth and AI-powered performance.</p>
          </div>
          <div className="ai-match-badge"><BarChart3 size={18} /> Updated Today</div>
        </div>

        <div className="analytics-metrics">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div className="analytics-metric-card" key={metric.label}>
                <div className="analytics-icon"><Icon size={22} /></div>
                <div>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                  <em>{metric.change} this month</em>
                </div>
              </div>
            );
          })}
        </div>

        <div className="analytics-content-grid">
          <div className="analytics-chart-card">
            <div className="analytics-card-heading">
              <div>
                <span>PERFORMANCE</span>
                <h3>Marketplace Growth</h3>
              </div>
              <div className="growth-chip"><TrendingUp size={15} /> +18.4%</div>
            </div>

            <div className="bar-chart">
              {bars.map((bar) => (
                <div className="bar-column" key={bar.label}>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ height: `${bar.value}%` }} />
                  </div>
                  <span>{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="analytics-summary-card">
            <span>AI INSIGHT</span>
            <h3>Your strongest growth area</h3>
            <div className="insight-highlight">Textile Requirements</div>
            <p>AI matching performance is strongest for textile and handcrafted home product categories.</p>
            <div className="insight-stat">
              <strong>94%</strong>
              <span>Best average AI match score</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => {
    const toggleSetting = (key) => {
      setSettingsData({ ...settingsData, [key]: !settingsData[key] });
      setSettingsSaved(false);
    };

    const saveSettings = () => {
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 2500);
    };

    const settingRows = [
      {
        key: "notifications",
        title: "In-app Notifications",
        text: "Receive alerts for new matches, orders and messages.",
      },
      {
        key: "aiSuggestions",
        title: "AI Suggestions",
        text: "Show proactive AI recommendations inside the marketplace.",
      },
      {
        key: "emailUpdates",
        title: "Email Updates",
        text: "Receive important marketplace updates by email.",
      },
      {
        key: "publicProfile",
        title: "Public Marketplace Profile",
        text: "Allow verified marketplace users to discover your profile.",
      },
    ];

    return (
      <div className="page-container" style={{ display: "block" }}>
        <div className="dashboard-welcome" style={{ marginBottom: 24 }}>
          <div>
            <p className="dashboard-label">ACCOUNT PREFERENCES</p>
            <h2>Settings</h2>
            <p className="dashboard-subtitle">Manage your CraftLink AI workspace and marketplace preferences.</p>
          </div>
        </div>

        <div className="settings-layout">
          <div className="settings-profile-card">
            <div className={`settings-profile-avatar ${accountRole === "Artisan" ? "artisan-profile" : ""}`}>
              {getInitials(accountName)}
            </div>
            <h3>{accountName}</h3>
            <p>{accountRole} Workspace</p>
            <div className="settings-role-badge">CraftLink AI Member</div>
          </div>

          <div className="settings-main-card">
            <div className="settings-section-heading">
              <div>
                <span>WORKSPACE SETTINGS</span>
                <h3>Preferences</h3>
              </div>
              {settingsSaved && <div className="settings-saved"><CheckCircle2 size={17} /> Saved</div>}
            </div>

            <div className="settings-list">
              {settingRows.map((setting) => (
                <div className="setting-row" key={setting.key}>
                  <div>
                    <strong>{setting.title}</strong>
                    <p>{setting.text}</p>
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${settingsData[setting.key] ? "toggle-on" : ""}`}
                    onClick={() => toggleSetting(setting.key)}
                    aria-label={`Toggle ${setting.title}`}
                  >
                    <span />
                  </button>
                </div>
              ))}
            </div>

            <button className="save-settings-btn" onClick={saveSettings}>
              <Save size={18} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSimplePage = (
    title,
    description,
    Icon
  ) => {
    return (
      <div className="simple-page">
        <div className="simple-page-icon">
          <Icon size={34} />
        </div>

        <h2>{title}</h2>

        <p>{description}</p>
      </div>
    );
  };

  /* ================= POST REQUIREMENT ================= */

  const renderPostRequirement = () => {
    return (
      <div className="page-container">
        <section className="requirement-card">
          <div className="requirement-header">
            <div className="header-icon">
              <FileText size={30} />
            </div>

            <div>
              <h2>
                Requirement Details
              </h2>

              <p>
                Provide clear details to receive better AI matches.
              </p>
            </div>
          </div>

          <div className="divider" />

          <div className="form-group full-width">
            <label>
              Requirement Title <span>*</span>
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Example: Handmade Cotton Sarees for Retail"
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>
                Product Category <span>*</span>
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">
                  Select category
                </option>

                <option value="Textiles">
                  Textiles
                </option>

                <option value="Pottery">
                  Pottery
                </option>

                <option value="Jewellery">
                  Jewellery
                </option>

                <option value="Handicrafts">
                  Handicrafts
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>
                Quantity Required <span>*</span>
              </label>

              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Example: 500 units"
              />
            </div>

            <div className="form-group">
              <label>
                Minimum Budget (₹) <span>*</span>
              </label>

              <div className="input-icon">
                <IndianRupee size={20} />

                <input
                  type="number"
                  name="minimum"
                  value={formData.minimum}
                  onChange={handleChange}
                  placeholder="Minimum"
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                Maximum Budget (₹) <span>*</span>
              </label>

              <div className="input-icon">
                <IndianRupee size={20} />

                <input
                  type="number"
                  name="maximum"
                  value={formData.maximum}
                  onChange={handleChange}
                  placeholder="Maximum"
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                State <span>*</span>
              </label>

              <div className="input-icon">
                <MapPin size={20} />

                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="">
                    Select State
                  </option>

                  {Object.keys(stateCities).map((state) => (
                    <option
                      key={state}
                      value={state}
                    >
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>
                City <span>*</span>
              </label>

              <div className="input-icon">
                <MapPin size={20} />

                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!formData.state}
                >
                  <option value="">
                    {formData.state
                      ? "Select City"
                      : "Select State First"}
                  </option>

                  {formData.state &&
                    stateCities[formData.state].map((city) => (
                      <option
                        key={city}
                        value={city}
                      >
                        {city}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>
                Delivery Timeline <span>*</span>
              </label>

              <div className="input-icon">
                <Calendar size={20} />

                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                >
                  <option value="">
                    Select timeline
                  </option>

                  <option value="Within 1 week">
                    Within 1 week
                  </option>

                  <option value="Within 2 weeks">
                    Within 2 weeks
                  </option>

                  <option value="Within 1 month">
                    Within 1 month
                  </option>

                  <option value="Flexible">
                    Flexible
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-group full-width description-group">
            <label>
              Requirement Description <span>*</span>
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the products, preferred materials, quality standards and other important details..."
            />
          </div>

          <div className="form-footer">
            <button
              className="save-btn"
              onClick={saveDraft}
            >
              <Save size={20} />
              Save Draft
            </button>

            <button
              className="post-btn"
              onClick={postRequirement}
            >
              <Send size={20} />
              Post Requirement
            </button>
          </div>
        </section>

        <aside className="right-panel">
          <div className="ai-help-card">
            <div className="ai-help-icon">
              <Sparkles size={30} />
            </div>

            <p className="ai-label">
              AI ASSISTANCE
            </p>

            <h2>
              Get Better Matches
            </h2>

            <p className="ai-description">
              Add detailed information about your requirement
              to help CraftLink AI discover the best artisans
              for you.
            </p>

            <div className="ai-tips">
              <div>
                <CheckCircle2 size={19} />
                Mention preferred materials
              </div>

              <div>
                <CheckCircle2 size={19} />
                Add expected quantity
              </div>

              <div>
                <CheckCircle2 size={19} />
                Specify your budget range
              </div>

              <div>
                <CheckCircle2 size={19} />
                Include delivery timeline
              </div>
            </div>
          </div>

          <div className="activity-card">
            <h3>YOUR ACTIVITY</h3>

            <div className="activity-item">
              <div className="activity-icon">
                <FileText size={24} />
              </div>

              <div>
                <p>
                  Active Requirements
                </p>
                <strong>03</strong>
              </div>
            </div>

            <div className="activity-line" />

            <div className="activity-item">
              <div className="activity-icon">
                <Sparkles size={24} />
              </div>

              <div>
                <p>
                  AI Matches Found
                </p>
                <strong>28</strong>
              </div>
            </div>

            <div className="activity-line" />

            <div className="activity-item">
              <div className="activity-icon">
                <Users size={24} />
              </div>

              <div>
                <p>
                  Responses Received
                </p>
                <strong>14</strong>
              </div>
            </div>
          </div>
        </aside>
      </div>
    );
  };

  /* ================= ROUTING ================= */

  const renderPage = () => {
    switch (activeMenu) {
      case "Dashboard":
        return renderDashboard();

      case "Discover Products":
        return renderDiscoverProducts();

      case "Buyer Opportunities":
        return renderBuyerOpportunities();

      case "My Products":
        return renderMyProducts();

      case "Post Requirement":
        return renderPostRequirement();

      case "AI Matches":
        return renderAIMatches();

      case "Dynamic Pricing":
        return renderDynamicPricing();

      case "Orders":
        return renderOrders();

      case "Messages":
        return renderMessages();

      case "Analytics":
        return renderAnalytics();

      case "Settings":
        return renderSettings();

      default:
        return renderDashboard();
    }
  };
if (!isLoggedIn && showRegister) {
  return (
    <Register
      onRegister={async (role, formData) => {
        const userRole =
          role === "artisan" ? "Artisan" : "Buyer";

        try {
          const profile = await createProfile({
            name: formData.name,
            role: userRole,
            email: formData.email,
            phone: formData.phone,
            state: formData.state,
            city: formData.city,
          });

          setAccountRole(userRole);
          setAccountName(formData.name);

          sessionStorage.setItem("accountRole", userRole);
          sessionStorage.setItem("accountName", formData.name);
          sessionStorage.setItem(`${userRole.toLowerCase()}AccountName`, formData.name);
          sessionStorage.setItem("craftlinkProfileId", profile.id);
          sessionStorage.setItem("craftlinkProfileEmail", formData.email || "");
          sessionStorage.setItem("isLoggedIn", "true");

          alert("Account created successfully!");

          setShowRegister(false);
          setIsLoggedIn(true);
          setActiveMenu("Dashboard");
        } catch (error) {
          console.error("REGISTER PROFILE ERROR:", error);
          alert(error.message || "Failed to create account.");
        }
      }}

      onBackToLogin={() => {
        setShowRegister(false);
      }}
    />
  );
}

if (!isLoggedIn) {
  return (
    <Login
      onLogin={(role, email) => {
        const userRole =
          role === "artisan" ? "Artisan" : "Buyer";

        const userName =
          email.split("@")[0] ||
          (role === "artisan" ? "Artisan" : "Buyer");

        setAccountRole(userRole);
        setAccountName(userName);

        sessionStorage.setItem("accountRole", userRole);
        sessionStorage.setItem("accountName", userName);
        sessionStorage.setItem(`${userRole.toLowerCase()}AccountName`, userName);
        sessionStorage.setItem("isLoggedIn", "true");

        setIsLoggedIn(true);
        setActiveMenu("Dashboard");
      }}

      onRegister={() => {
        setShowRegister(true);
      }}
    />
  );
}
  return (
    <div className="app">
      {/* SIDEBAR */}

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo" aria-label="CraftLink AI">
            <Boxes size={23} strokeWidth={2.2} />
          </div>

          <div className="brand-text">
            <h2>
              Craft<span>Link</span>
            </h2>

            <p>
              AI MARKETPLACE
            </p>
          </div>
        </div>

        <div className="sidebar-menu">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`menu-item ${
                activeMenu === item.name
                  ? "active-menu"
                  : ""
              }`}
              onClick={() => {
                setActiveMenu(item.name);
                setShowAccountMenu(false);
              }}
            >
              {item.icon}

              <span>
                {item.name}
              </span>
            </button>
          ))}
        </div>

        <button
          className="back-home"
          onClick={() =>
            setActiveMenu("Dashboard")
          }
        >
          <Home size={20} />
          Back to Home
        </button>
      </aside>

      {/* MAIN CONTENT */}

      <main className="main-content">
        <header className="topbar">
          <div className="top-left">
            <Menu size={28} />

            <h1>
              {activeMenu}
            </h1>
          </div>

          {/* ACCOUNT AREA */}

          <div className="top-right account-area">
            <button
              type="button"
              className="notification"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowAccountMenu(false);
              }}
              aria-label="Notifications"
            >
              <Bell size={24} />
              {notifications.some((item) => item.unread) && <span />}
            </button>

            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-dropdown-header">
                  <div>
                    <strong>Notifications</strong>
                    <span>{notifications.filter((item) => item.unread).length} unread</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotifications(notifications.map((item) => ({ ...item, unread: false })))}
                  >
                    Mark all read
                  </button>
                </div>

                <div className="notification-list">
                  {notifications.map((item) => (
                    <button
                      type="button"
                      className={`notification-item ${item.unread ? "unread-notification" : ""}`}
                      key={item.id}
                      onClick={() => {
                        setNotifications(notifications.map((notice) =>
                          notice.id === item.id ? { ...notice, unread: false } : notice
                        ));
                      }}
                    >
                      <div className="notification-item-icon"><Bell size={16} /></div>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                        <span>{item.time}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              className="account-switch-btn"
              onClick={() => {
                setShowAccountMenu(!showAccountMenu);
                setShowNotifications(false);
              }}
            >
              <div
                className={`profile-circle ${
                  accountRole === "Artisan"
                    ? "artisan-profile"
                    : ""
                }`}
              >
                {getInitials(accountName)}
              </div>

              <div className="profile-info">
                <strong>
                  {accountName}
                </strong>

                <span>
                  {accountRole}
                </span>
              </div>

              <ChevronDown
                size={20}
                className={
                  showAccountMenu
                    ? "chevron-up"
                    : ""
                }
              />
            </button>

            {showAccountMenu && (
              <div className="account-dropdown">
                <div className="account-dropdown-header">
                  <strong>
                    Switch Account
                  </strong>

                  <span>
                    Select your workspace
                  </span>
                </div>

                <button
                  type="button"
                  className={`account-option ${accountRole === "Buyer" ? "active-account" : ""}`}
                  onClick={() => {
                    setAccountRole("Buyer");
                    setAccountName(buyerAccountName);
                    setActiveMenu("Dashboard");
                    setShowAccountMenu(false);
                  }}
                >
                  <div className="account-avatar">
                    {getInitials(buyerAccountName)}
                  </div>

                  <div className="account-option-info">
                    <strong>
                      {buyerAccountName}
                    </strong>

                    <span>
                      Buyer Account
                    </span>
                  </div>

                  {accountRole === "Buyer" && <CheckCircle2 size={18} />}
                </button>

                <button
                  type="button"
                  className={`account-option ${accountRole === "Artisan" ? "active-account" : ""}`}
                  onClick={() => {
                    setAccountRole("Artisan");
                    setAccountName(artisanAccountName);
                    setActiveMenu("Dashboard");
                    setShowAccountMenu(false);
                  }}
                >
                  <div className="account-avatar artisan-avatar">
                    {getInitials(artisanAccountName)}
                  </div>

                  <div className="account-option-info">
                    <strong>
                      {artisanAccountName}
                    </strong>

                    <span>
                      Artisan Account
                    </span>
                  </div>

                  {accountRole === "Artisan" && <CheckCircle2 size={18} />}
                </button>

                <div className="account-dropdown-line" />

                <button
                  type="button"
                  className="account-settings-btn"
                  onClick={() => {
                    sessionStorage.removeItem("isLoggedIn");
                    setIsLoggedIn(false);
                    setActiveMenu("Settings");
                    setShowAccountMenu(false);
                  }}
                >
                  <X size={18} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </header>

        {renderPage()}
      </main>

      {/* AI BUTTON */}

      <button
        type="button"
        className="ai-floating-button"
        onClick={() =>
          setShowAI(!showAI)
        }
      >
        <Sparkles size={20} />
        AI
      </button>

      {/* AI CHAT */}

            {showAI && (
        <div className="ai-chat">
          <div className="ai-chat-top">
            <strong>CraftLink AI</strong>

            <button
              type="button"
              onClick={() => setShowAI(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div className="ai-chat-body">
            Hi! Tell me your product requirement and
            I'll help you create it.
          </div>

          <input
            type="text"
            placeholder="Ask CraftLink AI..."
          />
        </div>
      )}
    </div>
  );
}

export default App;