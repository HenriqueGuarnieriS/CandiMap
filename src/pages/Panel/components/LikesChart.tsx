import { MdOutlineTrendingUp, MdOutlineTrendingDown } from "react-icons/md";
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

const LikesChart = ({ data }: { data: any[] }) => {
  // Função para calcular média ponderada, dando mais peso aos dias recentes
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

  // Média ponderada dos últimos 30 dias
  const avgLikes30Days = weightedAverage(data, "avg_likes");

  // Variação entre o primeiro e último dia
  const firstLikes = data[0]?.avg_likes ?? 0;
  const lastLikes = data[data.length - 1]?.avg_likes ?? 0;
  const likesChange = lastLikes - firstLikes;
  const likesChangeText =
    likesChange >= 0
      ? `${likesChange.toLocaleString("pt-BR")}`
      : `${Math.abs(likesChange).toLocaleString("pt-BR")}`;

  // Variação Percentual
  const percentChange = ((lastLikes - firstLikes) / firstLikes) * 100;
  const percentChangeText =
    percentChange >= 0
      ? `${percentChange.toFixed(2)}%`
      : `${Math.abs(percentChange).toFixed(2)}%`;

  return (
    <>
      {/* Average Likes Chart */}
      <div className="flex items-center justify-between mt-8 mb-4">
        <h3 className="text-2xl font-bold">Média de Likes</h3>
        <div
          className={`text-xl font-bold flex items-center ${
            likesChange >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          <span>{likesChangeText}</span>
          {likesChange >= 0 ? (
            <MdOutlineTrendingUp className="text-3xl" />
          ) : (
            <MdOutlineTrendingDown className="text-3xl" />
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data} // Usar diretamente os dados recebidos
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="date" stroke="#aaa" tick={{ fill: "#fff" }} />
          <YAxis
            stroke="#aaa"
            tick={{ fill: "#fff" }}
            domain={["dataMin - 50", "dataMax + 50"]}
            tickFormatter={(value) => value.toLocaleString("pt-BR")}
          />
          <Tooltip
            content={({ payload, label }) => {
              if (!payload || !payload.length) return null;
              const { value } = payload[0];
              return (
                <div
                  style={{
                    backgroundColor: "#333",
                    padding: "10px",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                >
                  <p>{`Data: ${label}`}</p>
                  <p>{`Média de Likes: ${Number(value).toLocaleString(
                    "pt-BR"
                  )}`}</p>
                </div>
              );
            }}
          />

          <Legend verticalAlign="top" height={36} />
          <ReferenceLine
            y={avgLikes30Days}
            label={`Média: ${avgLikes30Days.toLocaleString("pt-BR")}`}
            stroke="#61dafb"
            strokeDasharray="3 3"
          />
          <Line
            type="monotone" // Linha suavizada (spline)
            dataKey="avg_likes"
            name="Média de Likes"
            stroke="#61dafb"
            strokeWidth={3}
            dot={{ r: 3, fill: "#61dafb" }}
            activeDot={{ r: 8, stroke: "#fff", fill: "#61dafb" }}
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

export default LikesChart;
