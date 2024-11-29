import React from "react";
import {
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface EduEscolasEstadoProps {
  data: { Quarter: string; Value: number }[];
}

const EcoCharts: React.FC<EduEscolasEstadoProps> = ({ data }) => {
  // Utilizar os dados diretamente sem transformação
  const minValue = Math.min(...data.map((item) => item.Value));
  return (
    <div className="flex flex-col bg-neutral-800 p-2">
      <h4 className="text-2xl font-semibold">
        Produtividade por hora efetivamente trabalhada (em R$ de 2021) -
        Acumulado em 4 trimestres. Sem Ajuste Sazonal
      </h4>
      <div className="grid-cols-1 grid gap-4 p-4 justify-start w-full">
        <div className="bg-neutral-700 p-4 rounded-lg shadow-lg">
          <ResponsiveContainer width="100%" height={370}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis
                type="category"
                dataKey="Quarter"
                stroke="#aaa"
                tick={{ fill: "#fff" }}
              />
              <YAxis
                type="number"
                domain={[minValue, "auto"]}
                stroke="#aaa"
                tick={{ fill: "#fff", fontSize: 13 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#333",
                  borderRadius: "10px",
                }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                strokeWidth={3}
                type="monotone"
                dataKey="Value"
                stroke="#FFD100"
                name={"Quantidade"}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EcoCharts;
