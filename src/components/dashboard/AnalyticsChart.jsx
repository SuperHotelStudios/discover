import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function AnalyticsChart({
  title,

  data,
}) {
  return (
    <div className="glass-card p-4">
      <h4 className="mb-4">{title}</h4>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#7c5cff"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
