import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";

function Stat({ title, value, tone = "info", hint }) {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div className="p">{title}</div>
          <div style={{ fontSize: 26, fontWeight: 900, marginTop: 6 }}>
            {value}
          </div>
          <div className="p" style={{ marginTop: 6 }}>
            {hint}
          </div>
        </div>
        <Badge tone={tone}>{tone.toUpperCase()}</Badge>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="grid" style={{ gridTemplateColumns: "repeat(12, 1fr)" }}>
      <div style={{ gridColumn: "span 12" }}>
        <div className="h1">Dashboard</div>
        <div className="p">Tổng quan vận hành & cảnh báo quan trọng.</div>
      </div>

      <div style={{ gridColumn: "span 3" }}>
        <Stat
          title="Doanh thu hôm nay"
          value="12,450,000đ"
          tone="info"
          hint="So với hôm qua +8%"
        />
      </div>
      <div style={{ gridColumn: "span 3" }}>
        <Stat
          title="Đơn hàng"
          value="48"
          tone="success"
          hint="Tỷ lệ hoàn tất 96%"
        />
      </div>
      <div style={{ gridColumn: "span 3" }}>
        <Stat
          title="Sắp hết hạn"
          value="7 lô"
          tone="warning"
          hint="<= 30 ngày"
        />
      </div>
      <div style={{ gridColumn: "span 3" }}>
        <Stat
          title="Thiếu tồn kho"
          value="5 SP"
          tone="danger"
          hint="Dưới min stock"
        />
      </div>

      <div style={{ gridColumn: "span 8" }}>
        <Card
          title="Doanh thu 7 ngày gần nhất"
          right={<Badge tone="info">Revenue</Badge>}
        >
          <div className="p">
            Bạn có thể gắn chart (Chart.js/Recharts) vào đây.
          </div>
          <div
            style={{
              height: 220,
              borderRadius: 14,
              border: "1px dashed var(--border)",
              marginTop: 10,
              display: "grid",
              placeItems: "center",
              color: "var(--muted)",
            }}
          >
            Chart Placeholder
          </div>
        </Card>
      </div>

      <div style={{ gridColumn: "span 4" }}>
        <Card
          title="Cảnh báo nhanh"
          right={<Badge tone="warning">Alerts</Badge>}
        >
          <ul style={{ margin: 0, paddingLeft: 18, color: "var(--muted)" }}>
            <li>Amoxicillin – lô BAT-2024-001 còn 12 ngày</li>
            <li>Metformin 850mg tồn kho dưới mức tối thiểu</li>
            <li>Sản phẩm bán chậm: Vitamin C 1000mg</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
