import Card from "../common/Card";

export default function EmptyChart({ title = "Chưa có dữ liệu" }) {
  return (
    <Card title={title}>
      <div
        style={{
          height: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--muted)",
          border: "1px dashed var(--border)",
          borderRadius: 12,
        }}
      >
        Không có dữ liệu để hiển thị
      </div>
    </Card>
  );
}
