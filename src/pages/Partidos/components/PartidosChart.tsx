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

const PartidoEstadoChart = ({ data }: { data: any[] }) => {
  return (
    <>
      <div className="flex items-center justify-between  ">
        {/* <h3 className="text-2xl font-bold">Eleitores por Estado</h3> */}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
            dataKey="sigla_uf"
            stroke="#aaa"
            tick={{ fill: "#fff" }}
            interval={0}
            angle={-45}
            dy={9}
          />
          <YAxis
            stroke="#aaa"
            tick={{ fill: "#fff" }}
            tickFormatter={formatCompact}
          />
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
