import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../common/Card";
import { formatVnd } from "@/utils/format";

export default function ForecastChart({ data = [] }) {
  return (
    <Card title="Dự báo doanh thu">
      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis tickFormatter={formatVnd} />
            <Tooltip formatter={(v) => formatVnd(v)} />
            <Line dataKey="revenue" stroke="#16a34a" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
