import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "#1e293b",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>RoleAuth</h2>

      <div style={{ marginBottom: "25px" }}>
        <p>
          <strong>{user?.name}</strong>
        </p>
        <small>{user?.role}</small>
      </div>

      <nav>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <li>
            <Link
              to="/dashboard"
              style={{
                color: isActive("/dashboard") ? "#c084fc" : "#fff",
              }}
            >
              Dashboard
            </Link>
          </li>

          {user?.role === "Admin" && (
            <li>
              <Link
                to="/admin"
                style={{
                  color: isActive("/admin") ? "#c084fc" : "#fff",
                }}
              >
                Admin Panel
              </Link>
            </li>
          )}

          {user?.role === "Viewer" && (
            <li>
              <Link
                to="/viewer"
                style={{
                  color: isActive("/viewer") ? "#c084fc" : "#fff",
                }}
              >
                Viewer Panel
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;