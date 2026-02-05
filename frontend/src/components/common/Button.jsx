export default function Button({ variant = "primary", children, ...props }) {
  const style = {
    primary: {
      background: "linear-gradient(135deg, var(--primary), var(--primary-2))",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.25)",
    },
    ghost: {
      background: "#fff",
      color: "var(--text)",
      border: "1px solid var(--border)",
    },
    danger: {
      background: "linear-gradient(135deg, var(--danger), #fb7185)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.25)",
    },
  }[variant];

  return (
    <button
      {...props}
      style={{
        padding: "10px 14px",
        borderRadius: 12,
        cursor: "pointer",
        fontWeight: 700,
        boxShadow: "0 10px 20px rgba(15,23,42,0.06)",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
