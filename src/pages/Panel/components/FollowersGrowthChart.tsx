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
import { MdOutlineTrendingUp, MdOutlineTrendingDown } from "react-icons/md";

const FollowersGrowthChart = ({ data }: { data: any[] }) => {
  // Função para calcular a variação de seguidores entre dias consecutivos
  const calculateDotSize = (entry: any, index: number, data: any[]) => {
    if (index === 0) return 2; // Para o primeiro ponto, o tamanho será fixo
    const previousFollowers = data[index - 1]?.followers ?? 0;
    const followersDifference = Math.abs(entry.followers - previousFollowers);
    return Math.min(Math.max(followersDifference / 500, 2), 10); // Ajusta o tamanho do ponto com base na variação
  };

  // Calculate change for Followers
  const firstFollowers = data[0]?.followers ?? 0;
  const lastFollowers = data[data.length - 1]?.followers ?? 0;
  const followerChange = lastFollowers - firstFollowers;
  const followerChangeText =
    followerChange >= 0
      ? `${followerChange.toLocaleString("pt-BR")}`
      : `${Math.abs(followerChange).toLocaleString("pt-BR")}`;

  // Variação Percentual
  const percentChange =
    ((lastFollowers - firstFollowers) / firstFollowers) * 100;
  const percentChangeText =
    percentChange >= 0
      ? `${percentChange.toFixed(2)}%`
      : `${Math.abs(percentChange).toFixed(2)}%`;

  // Média ponderada dos últimos 30 dias
  const weightedAverage = (data: any[], field: string) => {
    let totalWeight = 0;
    let weightedSum = 0;
    const totalDays = data.length;
    data.forEach((entry, index) => {
      const weight = totalDays - index; // Mais peso para os dias recentes
      weightedSum += (entry[field] ?? 0) * weight;
      totalWeight += weight;
    });
    return weightedSum / totalWeight;
  };
  const avgFollowers30Days = weightedAverage(data, "followers");

  return (
    <>
      {/* Followers Growth Chart */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold">Followers</h3>

        <div
          className={`text-xl font-bold flex items-center ${
            followerChange >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          <span>{followerChangeText}</span>
          {followerChange >= 0 ? (
            <MdOutlineTrendingUp className="text-3xl" />
          ) : (
            <MdOutlineTrendingDown className="text-3xl" />
          )}
        </div>
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
            domain={["dataMin - 100", "dataMax + 100"]}
            tickFormatter={formatCompact}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#333", borderRadius: "10px" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#ffdd57" }}
            formatter={tooltipFormatter}
          />
          <Legend verticalAlign="top" height={36} />

          {/* Reference Line for Average Followers */}
          <ReferenceLine
            y={avgFollowers30Days}
            label={`Média: ${avgFollowers30Days.toLocaleString("pt-BR")}`}
            stroke="#ffdd57"
            strokeDasharray="3 3"
          />

          <Line
            type="monotone"
            dataKey="followers"
            name="Followers"
            stroke="#ffdd57"
            strokeWidth={3}
            dot={{ r: 3, fill: "#ffdd57" }}
            activeDot={{ r: 8, stroke: "#fff", fill: "#ffdd57" }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Mudança de Seguidores */}

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

export default FollowersGrowthChart;
