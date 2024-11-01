import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { tooltipFormatter } from "../../../utils/functions";

const PartidoEstadoPieChart = ({ data }: { data: any[] }) => {
  const colors = [
    "#ffdd57",
    "#4caf50",
    "#2196f3",
    "#f44336",
    "#9c27b0",
    "#ff9800",
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        {/* <h3 className="text-2xl font-bold">Eleitores por Estado - Doughnut Chart</h3> */}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Tooltip
            contentStyle={{ backgroundColor: "#333", borderRadius: "10px" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#ffdd57" }}
            formatter={tooltipFormatter}
          />
          <Legend verticalAlign="top" height={36} />

          <Pie
            data={data}
            dataKey="total_eleitos"
            nameKey="sigla_uf"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4"></div>
    </>
  );
};

export default PartidoEstadoPieChart;
