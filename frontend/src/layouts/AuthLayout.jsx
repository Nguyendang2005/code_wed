import { Outlet } from "react-router-dom";
import "../styles/theme.css";

export default function AuthLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 18,
      }}
    >
      <div
        className="card"
        style={{ width: 420, maxWidth: "92vw", padding: 18 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 14,
              background:
                "linear-gradient(135deg, var(--primary), var(--primary-2))",
            }}
          />
          <div>
            <div className="h1">Smart Pharmacy</div>
            <div className="p">Hệ thống nhà thuốc thông minh</div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
