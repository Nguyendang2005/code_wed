import { useState } from "react";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("manager@smartpharmacy.com");
  const [password, setPassword] = useState("123456");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      nav("/dashboard");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
      <div className="h2">Đăng nhập</div>
      <div className="p">Truy cập hệ thống quản lý nhà thuốc.</div>

      {err && (
        <div
          className="card"
          style={{
            padding: 10,
            borderColor: "rgba(239,68,68,0.25)",
            background: "rgba(239,68,68,0.06)",
          }}
        >
          <div style={{ color: "var(--danger)", fontWeight: 800 }}>{err}</div>
        </div>
      )}

      <div style={{ marginTop: 8 }}>
        <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 6 }}>
          Email
        </div>
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 6 }}>
          Mật khẩu
        </div>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 8, display: "flex", gap: 10 }}>
        <Button style={{ flex: 1 }}>Đăng nhập</Button>
        <Button
          variant="ghost"
          type="button"
          onClick={() => {
            setEmail("staff@smartpharmacy.com");
            setPassword("123456");
          }}
        >
          Staff demo
        </Button>
      </div>
    </form>
  );
}
