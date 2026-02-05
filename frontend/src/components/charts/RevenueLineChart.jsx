import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../common/Card";
import { formatVnd } from "@/utils/format";

export default function RevenueLineChart({ data = [] }) {
  return (
    <Card title="Doanh thu 7 ngày gần nhất">
      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={formatVnd} />
            <Tooltip formatter={(v) => formatVnd(v)} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#0ea5a4"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
