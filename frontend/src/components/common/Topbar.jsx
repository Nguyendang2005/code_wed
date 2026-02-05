import Button from "./Button";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const onLogout = async () => {
    await logout();
    nav("/login");
  };

  const name = user?.name || "User";
  const email = user?.email || "—";

  return (
    <header className="topbar">
      <input
        className="input search"
        placeholder="Tìm sản phẩm, đơn hàng, khách hàng..."
      />
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div className="userChip">
          <div className="avatar">{name.slice(0, 2).toUpperCase()}</div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 900, fontSize: 13 }}>{name}</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>{email}</div>
          </div>
        </div>
        <Button variant="ghost" onClick={onLogout}>
          Đăng xuất
        </Button>
      </div>
    </header>
  );
}
