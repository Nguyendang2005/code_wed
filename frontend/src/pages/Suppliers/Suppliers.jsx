import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";

export default function Suppliers() {
  const rows = [
    {
      name: "PharmaGlobal Inc.",
      phone: "0901 222 333",
      delivery: 98,
      trend: "stable",
      main: "Amoxicillin 500mg",
    },
    {
      name: "MediSupply Co.",
      phone: "0902 888 111",
      delivery: 92,
      trend: "down",
      main: "Metformin 850mg",
    },
    {
      name: "HealthCorp Ltd.",
      phone: "0903 444 555",
      delivery: 95,
      trend: "up",
      main: "Ibuprofen 400mg",
    },
  ];

  const toneTrend = (t) =>
    t === "up" ? "success" : t === "down" ? "danger" : "neutral";

  return (
    <div className="grid">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div className="h1">Nhà cung cấp</div>
          <div className="p">
            Quản lý thông tin NCC, chất lượng giao hàng và xu hướng giá.
          </div>
        </div>
        <Button>+ Thêm nhà cung cấp</Button>
      </div>

      <Card
        title="Danh sách nhà cung cấp"
        right={<Badge tone="info">{rows.length} NCC</Badge>}
      >
        <table className="table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Liên hệ</th>
              <th>Delivery</th>
              <th>Trend</th>
              <th>Sản phẩm chính</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 900 }}>{r.name}</td>
                <td style={{ color: "var(--muted)" }}>{r.phone}</td>
                <td>
                  <Badge tone={r.delivery >= 95 ? "success" : "warning"}>
                    {r.delivery}%
                  </Badge>
                </td>
                <td>
                  <Badge tone={toneTrend(r.trend)}>
                    {r.trend.toUpperCase()}
                  </Badge>
                </td>
                <td style={{ color: "var(--muted)" }}>{r.main}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
