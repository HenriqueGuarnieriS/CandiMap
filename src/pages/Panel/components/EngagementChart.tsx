import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
} from "recharts";
import { tooltipFormatter } from "../../../utils/functions";
import { MdOutlineTrendingUp, MdOutlineTrendingDown } from "react-icons/md";

const EngagementChart = ({ data }: { data: any[] }) => {
  const dataWithEngagementRate = data.map((entry) => ({
    ...entry,
    engagement_rate: ((entry.avg_likes / entry.followers) * 100).toFixed(2), // Convert to percentage and round
  }));

  // Calculate change for Engagement Rate
  const firstEngagementRate = dataWithEngagementRate[0]?.engagement_rate ?? 0;
  const lastEngagementRate =
    dataWithEngagementRate[dataWithEngagementRate.length - 1]
      ?.engagement_rate ?? 0;
  const engagementChange = lastEngagementRate - firstEngagementRate;
  const engagementChangeText =
    engagementChange >= 0
      ? `${engagementChange.toFixed(2)}%`
      : `${Math.abs(engagementChange).toFixed(2)}%`;

  return (
    <>
      {/* Engagement Rate Chart */}
      <div className="flex items-center justify-between mt-8 mb-4">
        <h3 className="text-2xl font-bold">Taxa de Engajamento (%)</h3>

        <div
          className={`text-xl font-bold flex items-center ${
            engagementChange >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          <span>{engagementChangeText}</span>
          {engagementChange >= 0 ? (
            <MdOutlineTrendingUp className="text-3xl" />
          ) : (
            <MdOutlineTrendingDown className="text-3xl" />
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={dataWithEngagementRate}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="date" stroke="#aaa" tick={{ fill: "#fff" }} />
          <YAxis
            stroke="#aaa"
            tick={{ fill: "#fff" }}
            domain={["auto", "auto"]}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#333", borderRadius: "10px" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#ffa500" }}
            formatter={tooltipFormatter}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="engagement_rate"
            name="Taxa de Engajamento (%)"
            stroke="#ffa500"
            strokeWidth={3}
            dot={{ r: 2, fill: "#ffa500" }}
            activeDot={{ r: 8, stroke: "#fff", fill: "#ffa500" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default EngagementChart;
