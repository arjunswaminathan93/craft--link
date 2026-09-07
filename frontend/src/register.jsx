import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  MapPinned,
  Store,
  ShoppingBag,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const Register = ({ onRegister, onBackToLogin }) => {
  const [selectedRole, setSelectedRole] = useState("artisan");

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.mobile ||
      !formData.email ||
      !formData.city ||
      !formData.pincode
    ) {
      alert("Please fill all the details");
      return;
    }

    if (formData.mobile.length !== 10) {
      alert("Please enter a valid 10 digit mobile number");
      return;
    }

    if (formData.pincode.length !== 6) {
      alert("Please enter a valid 6 digit pincode");
      return;
    }

    onRegister(selectedRole, formData);
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}

      <div className="login-brand-section">
        <div className="login-brand">

          <div className="login-logo">
            <Sparkles size={30} />
          </div>

          <h1>Join CraftLink</h1>

          <p>
            Create your account and become part of
            India's growing artisan marketplace.
          </p>

          <div className="login-feature">
            <Sparkles size={18} />
            AI Powered Marketplace
          </div>

        </div>
      </div>


      {/* RIGHT SIDE */}

      <div className="login-form-section">

        <div className="login-box">

          <div className="login-heading">
            <p>CREATE YOUR ACCOUNT</p>

            <h2>Register with CraftLink</h2>

            <span>
              Enter your details to get started
            </span>
          </div>


          {/* ROLE */}

          <div className="role-selection">

            <button
              type="button"
              className={`role-card ${
                selectedRole === "artisan"
                  ? "selected"
                  : ""
              }`}
              onClick={() => setSelectedRole("artisan")}
            >
              <Store size={25} />

              <div>
                <strong>Artisan</strong>

                <span>
                  Sell your products
                </span>
              </div>

            </button>


            <button
              type="button"
              className={`role-card ${
                selectedRole === "buyer"
                  ? "selected"
                  : ""
              }`}
              onClick={() => setSelectedRole("buyer")}
            >
              <ShoppingBag size={25} />

              <div>
                <strong>Buyer</strong>

                <span>
                  Discover products
                </span>
              </div>

            </button>

          </div>


          {/* FORM */}

          <form onSubmit={handleRegister}>

            <div className="register-grid">

              <div className="login-input">

                <label>Full Name</label>

                <div>
                  <User size={18} />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

              </div>


              <div className="login-input">

                <label>Mobile Number</label>

                <div>
                  <Phone size={18} />

                  <input
                    type="tel"
                    name="mobile"
                    placeholder="10 digit number"
                    maxLength="10"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>

              </div>


              <div className="login-input">

                <label>Email Address</label>

                <div>
                  <Mail size={18} />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

              </div>


              <div className="login-input">

                <label>City</label>

                <div>
                  <MapPin size={18} />

                  <input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

              </div>


              <div className="login-input">

                <label>Pincode</label>

                <div>
                  <MapPinned size={18} />

                  <input
                    type="text"
                    name="pincode"
                    placeholder="6 digit pincode"
                    maxLength="6"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>

              </div>

            </div>


            <button className="login-submit">

              Create Account

              <ArrowRight size={19} />

            </button>

          </form>


          <div className="login-register-link">
            Already have an account?

            <button
              type="button"
              onClick={onBackToLogin}
            >
              Sign In
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;