import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";

export default function Inventory() {
  const batches = [
    {
      product: "Amoxicillin 500mg",
      batch: "BAT-2024-001",
      expiry: "2025-12-31",
      stock: 120,
      min: 60,
      storage: "Cool & Dry",
    },
    {
      product: "Metformin 850mg",
      batch: "BAT-2024-018",
      expiry: "2026-05-15",
      stock: 45,
      min: 80,
      storage: "Room temp",
    },
    {
      product: "Vitamin C 1000mg",
      batch: "BAT-2025-002",
      expiry: "2026-02-20",
      stock: 18,
      min: 30,
      storage: "Dry",
    },
  ];

  const daysLeft = (dateStr) => {
    const today = new Date();
    const d = new Date(dateStr + "T00:00:00");
    return Math.ceil((d - today) / (1000 * 60 * 60 * 24));
  };

  const toneExpiry = (d) =>
    d <= 30 ? "warning" : d <= 7 ? "danger" : "success";
  const toneStock = (s, m) =>
    s < m ? "danger" : s < m * 1.2 ? "warning" : "success";

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
          <div className="h1">Kho & Lô hàng</div>
          <div className="p">
            Theo dõi tồn kho theo lô, hạn dùng và cảnh báo sớm.
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="ghost">Nhập hàng</Button>
          <Button>+ Thêm lô</Button>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "repeat(12,1fr)" }}>
        <div style={{ gridColumn: "span 6" }}>
          <Card
            title="Cảnh báo hết hạn (<= 30 ngày)"
            right={<Badge tone="warning">Expiry</Badge>}
          >
            <div className="p">
              Gợi ý: ưu tiên bán/khuyến mãi các lô sắp hết hạn.
            </div>
          </Card>
        </div>
        <div style={{ gridColumn: "span 6" }}>
          <Card
            title="Cảnh báo thiếu tồn kho"
            right={<Badge tone="danger">Stock</Badge>}
          >
            <div className="p">
              Gợi ý: nhập thêm các sản phẩm dưới mức min stock.
            </div>
          </Card>
        </div>
      </div>

      <Card
        title="Danh sách lô hàng"
        right={<Badge tone="info">{batches.length} lô</Badge>}
      >
        <table className="table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Mã lô</th>
              <th>Hạn dùng</th>
              <th>Days left</th>
              <th>Tồn kho</th>
              <th>Bảo quản</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((b, i) => {
              const d = daysLeft(b.expiry);
              return (
                <tr key={i}>
                  <td style={{ fontWeight: 900 }}>{b.product}</td>
                  <td style={{ color: "var(--muted)" }}>{b.batch}</td>
                  <td>{b.expiry}</td>
                  <td>
                    <Badge
                      tone={d <= 7 ? "danger" : d <= 30 ? "warning" : "success"}
                    >
                      {d} ngày
                    </Badge>
                  </td>
                  <td>
                    <Badge tone={toneStock(b.stock, b.min)}>
                      {b.stock} / min {b.min}
                    </Badge>
                  </td>
                  <td style={{ color: "var(--muted)" }}>{b.storage}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
