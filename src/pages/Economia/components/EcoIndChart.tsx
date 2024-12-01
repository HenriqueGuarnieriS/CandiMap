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
import { Indicador } from "../../../interfaces/Eco";

interface SerieData {
  period: string;
  ipca?: number;
  inpc?: number;
  ipca15?: number;
}

// Função para transformar os dados para o formato esperado pelo gráfico
const transformData = (data: any[]): SerieData[] => {
  const result: { [period: string]: SerieData } = {};

  data.forEach((indicator) => {
    const variavel = indicator.variavel;
    const seriesData = indicator.resultados[0].series[0].serie;

    Object.keys(seriesData).forEach((period) => {
      if (!result[period]) {
        result[period] = { period };
      }
      if (variavel === "IPCA - Variação mensal") {
        result[period].ipca = parseFloat(seriesData[period]);
      } else if (variavel === "INPC - Variação mensal") {
        result[period].inpc = parseFloat(seriesData[period]);
      } else if (variavel === "IPCA15 - Variação mensal") {
        result[period].ipca15 = parseFloat(seriesData[period]);
      }
    });
  });

  return Object.values(result).sort((a, b) => a.period.localeCompare(b.period));
};

interface EduEscolasEstadoProps {
  data: Indicador[];
}

const EcoIndChart: React.FC<EduEscolasEstadoProps> = ({ data }) => {
  // Utilizar os dados diretamente sem transformação
  // const minValue = Math.min(...data.map((item) => item.Value));
  const chartData = transformData(data);
  console.log(chartData);
  return (
    <div className="flex flex-col bg-neutral-800 p-2">
      <h4 className=" text-sm lg:text-2xl font-semibold mb-3">
        Indicadores de Variação Mensal - Brasil
      </h4>
      <div className="grid-cols-1 grid gap-4   lg:p-4 justify-start w-full">
        <div className="bg-neutral-700  p-1 lg:p-4 rounded-lg shadow-lg">
          <ResponsiveContainer width="100%" height={370}>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis
                type="category"
                dataKey="period"
                stroke="#aaa"
                tick={{ fill: "#fff" }}
              />
              <YAxis
                type="number"
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
                dataKey="ipca"
                stroke="#FFD100"
                name="IPCA"
                dot={false}
              />
              <Line
                strokeWidth={3}
                type="monotone"
                dataKey="inpc"
                stroke="#00C49F"
                name="INPC"
                dot={false}
              />
              <Line
                strokeWidth={3}
                type="monotone"
                dataKey="ipca15"
                stroke="#FF8042"
                name="IPCA15"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EcoIndChart;
