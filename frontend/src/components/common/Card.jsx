export default function Card({ title, right, children }) {
  return (
    <div className="card" style={{ padding: 14 }}>
      {(title || right) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <div className="h2">{title}</div>
          <div>{right}</div>
        </div>
      )}
      {children}
    </div>
  );
}
