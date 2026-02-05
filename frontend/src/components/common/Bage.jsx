const map = {
  success: {
    bg: "rgba(22,163,74,0.10)",
    bd: "rgba(22,163,74,0.25)",
    tx: "var(--success)",
  },
  warning: {
    bg: "rgba(245,158,11,0.12)",
    bd: "rgba(245,158,11,0.25)",
    tx: "var(--warning)",
  },
  danger: {
    bg: "rgba(239,68,68,0.10)",
    bd: "rgba(239,68,68,0.25)",
    tx: "var(--danger)",
  },
  info: {
    bg: "rgba(37,99,235,0.10)",
    bd: "rgba(37,99,235,0.22)",
    tx: "var(--primary-2)",
  },
  neutral: {
    bg: "rgba(148,163,184,0.14)",
    bd: "rgba(148,163,184,0.28)",
    tx: "#334155",
  },
};

export default function Badge({ tone = "neutral", children }) {
  const s = map[tone] ?? map.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 800,
        color: s.tx,
        border: `1px solid ${s.bd}`,
        background: s.bg,
      }}
    >
      {children}
    </span>
  );
}
