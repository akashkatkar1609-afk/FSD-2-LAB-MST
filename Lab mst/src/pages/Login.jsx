import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) {
    navigate("/dashboard", { replace: true });
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(formData.username.trim(), formData.password);
    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    const from = location.state?.from?.pathname || "/dashboard";
    navigate(from, { replace: true });
  };

  return (
    <main className="login-page">
      <div className="login-glow login-glow-one" />
      <div className="login-glow login-glow-two" />

      <section className="login-card" aria-label="Role based authentication login">
        <div className="login-showcase">
          <div className="brand-mark" aria-hidden="true">
            <span>RA</span>
          </div>

          <p className="eyebrow">SECURE ACCESS</p>
          <h1>Welcome back.</h1>
          <p className="showcase-text">
            Sign in to your role-based workspace and access the features assigned to your account.
          </p>

          <div className="security-points">
            <div><span>✓</span> Role-based access control</div>
            <div><span>✓</span> Protected dashboard</div>
            <div><span>✓</span> Secure session handling</div>
          </div>
        </div>

        <div className="login-form-panel">
          <div className="login-heading">
            <span className="mobile-brand">RA</span>
            <p className="form-kicker">ROLEAUTH</p>
            <h2>Sign in</h2>
            <p>Enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="username">Username</label>
            <div className="input-wrap">
              <span className="input-icon" aria-hidden="true">@</span>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                required
              />
            </div>

            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <span className="input-icon" aria-hidden="true">●</span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in  →"}
            </button>
          </form>

          <div className="demo-box">
            <div className="demo-title">Demo accounts</div>
            <div className="demo-row">
              <span><strong>Admin</strong> · admin</span>
              <code>admin123</code>
            </div>
            <div className="demo-row">
              <span><strong>Viewer</strong> · viewer</span>
              <code>viewer123</code>
            </div>
          </div>

          <p className="login-footer">Authentication &amp; RBAC demonstration</p>
        </div>
      </section>
    </main>
  );
};

export default Login;
