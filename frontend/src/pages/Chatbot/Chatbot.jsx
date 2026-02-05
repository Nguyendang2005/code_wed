import { useEffect, useMemo, useRef, useState } from "react";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Xin chào! Bạn muốn xem doanh thu, tồn kho hay cảnh báo hết hạn?",
      ts: Date.now(),
    },
  ]);

  const scrollRef = useRef(null);

  // Auto scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  const quick = useMemo(
    () => [
      "Doanh thu 7 ngày gần nhất?",
      "Có lô nào sắp hết hạn không?",
      "Sản phẩm nào dưới min stock?",
      "Gợi ý nhập hàng cho tuần tới",
    ],
    [],
  );

  const replyRule = (q) => {
    const t = String(q || "").toLowerCase();

    if (t.includes("doanh thu"))
      return "Doanh thu 7 ngày gần nhất đang tăng ~8%. Bạn muốn xem theo ngày hay theo tháng?";

    if (t.includes("hết hạn") || t.includes("expiry"))
      return "Có 7 lô sắp hết hạn (<= 30 ngày). Gợi ý: ưu tiên bán/khuyến mãi các lô này.";

    if (t.includes("min stock") || t.includes("dưới") || t.includes("thiếu"))
      return "Có 5 sản phẩm dưới mức tồn kho tối thiểu. Bạn muốn xem danh sách chi tiết không?";

    if (t.includes("nhập") || t.includes("reorder") || t.includes("đặt hàng"))
      return "Gợi ý nhập hàng: tăng tồn kho nhóm thuốc cảm cúm 15%, Metformin 850mg thêm 60 box.";

    return "Mình có thể hỗ trợ: doanh thu, tồn kho, cảnh báo hết hạn, gợi ý nhập hàng. Bạn hỏi lại rõ hơn nhé.";
  };

  const addMessage = (role, text) => {
    setMessages((prev) => [...prev, { role, text, ts: Date.now() }]);
  };

  const send = async (text) => {
    const content = String(text || "").trim();
    if (!content || sending) return;

    setSending(true);
    addMessage("user", content);
    setInput("");

    // giả lập “đang trả lời” 1 chút cho tự nhiên
    const answer = replyRule(content);
    setTimeout(() => {
      addMessage("bot", answer);
      setSending(false);
    }, 250);
  };

  const onKeyDown = (e) => {
    // Enter gửi, Shift+Enter xuống dòng
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "bot",
        text: "Mình đã xoá cuộc trò chuyện. Bạn muốn xem doanh thu, tồn kho hay cảnh báo hết hạn?",
        ts: Date.now(),
      },
    ]);
    setInput("");
  };

  const Bubble = ({ role, text }) => {
    const isUser = role === "user";
    return (
      <div
        style={{
          justifySelf: isUser ? "end" : "start",
          maxWidth: "82%",
        }}
      >
        <div
          style={{
            padding: "10px 12px",
            borderRadius: 14,
            border: "1px solid var(--border)",
            background: isUser
              ? "linear-gradient(135deg, rgba(14,165,164,0.16), rgba(37,99,235,0.12))"
              : "#fff",
            fontWeight: 700,
            fontSize: 14,
            color: "#0f172a",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {text}
        </div>
      </div>
    );
  };

  return (
    <div className="grid">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div>
          <div className="h1">Chatbot tư vấn</div>
          <div className="p">
            Truy vấn nhanh về doanh thu, tồn kho, lô sắp hết hạn và gợi ý nhập
            hàng.
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Badge tone="info">Smart Assistant</Badge>
          <Button variant="ghost" onClick={clearChat}>
            Xoá chat
          </Button>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "repeat(12,1fr)" }}>
        {/* Chat area */}
        <div style={{ gridColumn: "span 8" }}>
          <Card
            title="Hội thoại"
            right={<Badge tone="neutral">{messages.length} msgs</Badge>}
          >
            <div
              ref={scrollRef}
              style={{
                height: 380,
                overflow: "auto",
                display: "grid",
                gap: 10,
                padding: 10,
                borderRadius: 14,
                border: "1px solid var(--border)",
                background: "linear-gradient(#fbfdff,#f7fbff)",
              }}
            >
              {messages.map((m) => (
                <Bubble key={m.ts + m.role} role={m.role} text={m.text} />
              ))}

              {sending && (
                <div style={{ justifySelf: "start", maxWidth: "60%" }}>
                  <div
                    style={{
                      padding: "10px 12px",
                      borderRadius: 14,
                      border: "1px solid var(--border)",
                      background: "#fff",
                      fontWeight: 700,
                      fontSize: 14,
                      color: "var(--muted)",
                    }}
                  >
                    Đang trả lời…
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <textarea
                className="input"
                rows={1}
                placeholder="Nhập câu hỏi… (Enter để gửi, Shift+Enter xuống dòng)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                style={{ resize: "none" }}
              />
              <Button
                onClick={() => send(input)}
                disabled={!input.trim() || sending}
                style={{
                  opacity: !input.trim() || sending ? 0.6 : 1,
                  cursor: !input.trim() || sending ? "not-allowed" : "pointer",
                }}
              >
                Gửi
              </Button>
            </div>

            <div className="p" style={{ marginTop: 10 }}>
              Gợi ý: hỏi theo kiểu <b>“doanh thu tuần này”</b>,{" "}
              <b>“lô sắp hết hạn”</b>, <b>“sản phẩm thiếu tồn kho”</b>.
            </div>
          </Card>
        </div>

        {/* Quick questions */}
        <div style={{ gridColumn: "span 4" }}>
          <Card title="Gợi ý câu hỏi" right={<Badge tone="info">Quick</Badge>}>
            <div style={{ display: "grid", gap: 10 }}>
              {quick.map((q) => (
                <Button
                  key={q}
                  variant="ghost"
                  onClick={() => send(q)}
                  disabled={sending}
                  style={{
                    textAlign: "left",
                    opacity: sending ? 0.7 : 1,
                  }}
                >
                  {q}
                </Button>
              ))}
            </div>
          </Card>

          <div className="card" style={{ padding: 12, marginTop: 14 }}>
            <div className="h2">Mở rộng “AI thật”</div>
            <div className="p" style={{ marginTop: 6 }}>
              Sau này bạn có thể thay <b>replyRule()</b> bằng API:
              <br />
              <b>POST /api/ai/chat</b> để trả lời theo dữ liệu DB.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
