import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";

export default function Customers() {
  const customers = [
    {
      name: "Nguyen Van A",
      phone: "0909000001",
      orders: 12,
      spent: 3200000,
      segment: "loyal",
      last: "2026-02-05",
    },
    {
      name: "Tran Thi B",
      phone: "0909000002",
      orders: 3,
      spent: 520000,
      segment: "normal",
      last: "2026-01-28",
    },
    {
      name: "Le Van C",
      phone: "0909000003",
      orders: 1,
      spent: 98000,
      segment: "inactive",
      last: "2025-12-10",
    },
  ];

  const segmentTone = (s) => {
    if (s === "loyal") return "success";
    if (s === "inactive") return "warning";
    return "info";
  };

  const segmentLabel = (s) => {
    if (s === "loyal") return "THÂN THIẾT";
    if (s === "inactive") return "LÂU KHÔNG QUAY LẠI";
    return "THƯỜNG";
  };

  const formatVnd = (n) => n.toLocaleString("vi-VN") + "đ";

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
          <div className="h1">Khách hàng</div>
          <div className="p">
            Phân khúc khách hàng, theo dõi lịch sử mua và tổng chi tiêu.
          </div>
        </div>
        <Button>+ Thêm khách</Button>
      </div>

      <Card
        title="Danh sách khách hàng"
        right={<Badge tone="info">{customers.length} KH</Badge>}
      >
        <table className="table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>SĐT</th>
              <th>Đơn</th>
              <th>Tổng chi</th>
              <th>Phân khúc</th>
              <th>Lần cuối</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 900 }}>{c.name}</td>
                <td style={{ color: "var(--muted)" }}>{c.phone}</td>
                <td>{c.orders}</td>
                <td style={{ fontWeight: 900 }}>{formatVnd(c.spent)}</td>
                <td>
                  <Badge tone={segmentTone(c.segment)}>
                    {segmentLabel(c.segment)}
                  </Badge>
                </td>
                <td>{c.last}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <Button variant="ghost">Tạo ưu đãi</Button>
          <Button variant="ghost">Gửi nhắc mua lại</Button>
        </div>
      </Card>
    </div>
  );
}
