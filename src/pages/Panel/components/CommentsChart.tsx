import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { formatCompact, tooltipFormatter } from "../../../utils/functions";
import { MdOutlineTrendingDown, MdOutlineTrendingUp } from "react-icons/md";

const CommentsChart = ({ data }: { data: any[] }) => {
  // Função para calcular média simples
  const simpleAverage = (data: any[], field: string) => {
    const sum = data.reduce((acc, entry) => acc + (entry[field] ?? 0), 0);
    return sum / data.length;
  };

  // Média simples dos últimos 30 dias
  const avgComments30Days = simpleAverage(data, "avg_comments");

  // Variação entre o primeiro e último dia
  const firstComments = data[0]?.avg_comments ?? 0;
  const lastComments = data[data.length - 1]?.avg_comments ?? 0;

  // Variação Percentual
  const percentChange = ((lastComments - firstComments) / firstComments) * 100;
  const percentChangeText =
    percentChange >= 0
      ? `${percentChange.toFixed(2)}%`
      : `${Math.abs(percentChange).toFixed(2)}%`;

  return (
    <>
      {/* Average Comments Chart */}
      <div className="flex items-center justify-between mt-8 mb-4">
        <h3 className="text-2xl font-bold">Média de Comentários</h3>
        {/* <span
          className={`text-xl font-bold ${
            avgComments30Days >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {avgCommentsText}
        </span> */}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="date" stroke="#aaa" tick={{ fill: "#fff" }} />
          <YAxis
            stroke="#aaa"
            tick={{ fill: "#fff" }}
            tickFormatter={formatCompact}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#333", borderRadius: "10px" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#ff0000" }}
            formatter={tooltipFormatter}
          />
          <Legend verticalAlign="top" height={36} />
          {/* Linha de referência para a média simples */}
          <ReferenceLine
            y={avgComments30Days}
            label={`Média: ${avgComments30Days.toLocaleString("pt-BR")}`}
            stroke="#ff0000"
            strokeDasharray="3 3"
          />
          <Line
            type="monotone"
            dataKey="avg_comments"
            name="Média de Comentários"
            stroke="#ff0000"
            strokeWidth={3}
            activeDot={{ r: 8, stroke: "#fff", fill: "#ff0000" }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex gap-2  justify-center w-full items-center ">
        <div
          className={`text-center  flex text-2xl gap-1 ${
            percentChange >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          <span>{percentChangeText}</span>
          {percentChange >= 0 ? (
            <MdOutlineTrendingUp className="text-4xl" />
          ) : (
            <MdOutlineTrendingDown className="text-4xl" />
          )}
        </div>
      </div>
    </>
  );
};

export default CommentsChart;
