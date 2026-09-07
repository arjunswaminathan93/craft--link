import { useState } from "react";
import {
  Store,
  ShoppingBag,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const Login = ({ onLogin, onRegister }) => {
  const [selectedRole, setSelectedRole] = useState("artisan");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    onLogin(selectedRole, email);
  };

  return (
    <div className="login-page">

      <div className="login-brand-section">
        <div className="login-brand">

          <div className="login-logo">
            <Sparkles size={30} />
          </div>

          <h1>CraftLink</h1>

          <p>
            Connecting skilled artisans with buyers
            across the marketplace.
          </p>

          <div className="login-feature">
            <Sparkles size={18} />
            AI Powered Marketplace
          </div>

        </div>
      </div>

      <div className="login-form-section">

        <div className="login-box">

          <div className="login-heading">
            <p>WELCOME TO CRAFTLINK</p>
            <h2>Sign in to continue</h2>
            <span>Choose your account type</span>
          </div>

          {/* ROLE SELECTION */}

          <div className="role-selection">

            <button
              type="button"
              className={`role-card ${
                selectedRole === "artisan" ? "selected" : ""
              }`}
              onClick={() => setSelectedRole("artisan")}
            >
              <Store size={25} />

              <div>
                <strong>Artisan</strong>
                <span>Manage your products & orders</span>
              </div>

            </button>

            <button
              type="button"
              className={`role-card ${
                selectedRole === "buyer" ? "selected" : ""
              }`}
              onClick={() => setSelectedRole("buyer")}
            >
              <ShoppingBag size={25} />

              <div>
                <strong>Buyer</strong>
                <span>Discover and purchase products</span>
              </div>

            </button>

          </div>

          {/* LOGIN FORM */}

          <form onSubmit={handleLogin}>

            <div className="login-input">

              <label>Email Address</label>

              <div>
                <Mail size={19} />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

            </div>

            <div className="login-input">

              <label>Password</label>

              <div>
                <Lock size={19} />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

              </div>

            </div>

            <button className="login-submit">

              Sign in as {selectedRole === "artisan"
                ? "Artisan"
                : "Buyer"}

              <ArrowRight size={19} />

            </button>

          </form>
<div className="login-register-link">
  Don't have an account?

  <button
    type="button"
    onClick={onRegister}
  >
    Register Now
  </button>
</div>
        </div>

      </div>

    </div>
  );
};

export default Login;