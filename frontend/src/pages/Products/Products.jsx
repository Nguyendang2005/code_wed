import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";

export default function Products() {
  const rows = [
    {
      name: "Amoxicillin 500mg",
      category: "Antibiotic",
      stock: 120,
      status: "active",
    },
    {
      name: "Metformin 850mg",
      category: "Antidiabetic",
      stock: 45,
      status: "low",
    },
  ];

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
          <div className="h1">Sản phẩm</div>
          <div className="p">Quản lý danh mục thuốc & thực phẩm chức năng.</div>
        </div>
        <Button>+ Thêm sản phẩm</Button>
      </div>

      <Card
        title="Danh sách sản phẩm"
        right={<Badge tone="info">{rows.length} items</Badge>}
      >
        <table className="table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Danh mục</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 900 }}>{r.name}</td>
                <td style={{ color: "var(--muted)" }}>{r.category}</td>
                <td>{r.stock}</td>
                <td>
                  {r.status === "active" && <Badge tone="success">OK</Badge>}
                  {r.status === "low" && <Badge tone="warning">LOW</Badge>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
