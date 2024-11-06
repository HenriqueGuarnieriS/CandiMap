import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Tooltip,
} from "recharts";
import { formatCompact, tooltipFormatter } from "../../../utils/functions";

const PartidoEstadoChart = ({
  data,
  orientation = "horizontal",
}: {
  data: any[];
  orientation?: "horizontal" | "vertical";
}) => {
  return (
    <>
      <div className="flex items-center justify-between  "></div>

      <ResponsiveContainer width={"100%"} height={500}>
        <BarChart
          data={data}
          layout={orientation === "horizontal" ? "horizontal" : "vertical"}
          margin={{ top: 20, right: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          {orientation === "horizontal" ? (
            <XAxis
              dataKey="sigla_uf"
              stroke="#aaa"
              tick={{ fill: "#fff" }}
              interval={0}
              angle={-45}
              dy={9}
            />
          ) : (
            <YAxis
              dataKey="sigla_uf"
              stroke="#aaa"
              tick={{ fill: "#fff" }}
              type="category"
            />
          )}
          {orientation === "horizontal" ? (
            <YAxis
              stroke="#aaa"
              tick={{ fill: "#fff" }}
              tickFormatter={formatCompact}
            />
          ) : (
            <XAxis
              type="number"
              stroke="#aaa"
              tick={{ fill: "#fff" }}
              tickFormatter={formatCompact}
            />
          )}
          <Tooltip
            contentStyle={{ backgroundColor: "#333", borderRadius: "10px" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#ffdd57" }}
            formatter={tooltipFormatter}
          />
          <Legend verticalAlign="top" height={36} />

          <Bar dataKey="total_eleitos" name="Total Eleitos" fill="#ffdd57" />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4"></div>
    </>
  );
};

export default PartidoEstadoChart;
