import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/image/img_logo.png";
import Dashboard from "../../assets/image/img_dashboard.png";
import { Eye, EyeOff } from "lucide-react";
import { STRINGS } from "../../constants/strings";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../../features/loginSlice/LoginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(
        fetchLogin({ email, password })
      ).unwrap();
      sessionStorage.setItem("isAuthenticated", "true")
      console.log("Login successful:", result);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-image">
          <img src={Dashboard} alt="Dashboard preview" />
        </div>
      </div>

      <div className="login-right">
        <div className="right-logo">
          <img src={Logo} alt="HRMS Logo" />
          <h1>{STRINGS.TITLE}</h1>
        </div>

        <br />

        <div className="right-welcome">
          <h3>{STRINGS.WELCOME} 👋</h3>
          <p>{STRINGS.HERE}</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-container">
            <input
              type="email"
              name="email"
              className="floating-input"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>

          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="floating-input"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label>{STRINGS.PASSWORD}</label>

            <span
              className="password-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </span>
          </div>
 
          {error && (
            <p className="error-message">
              {typeof error === "string"
                ? error
                : error.message ||
                  error.detail ||
                  error.email?.[0] ||
                  "Login failed. Please check your credentials."}
            </p>
          )}

          <div className="remember-forgot">
            <div className="checkboxs">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>

            <div className="forgot-link">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : STRINGS.LOGIN}
          </button>
        </form>
      </div>
    </div>
  ); 
};

export default Login;
