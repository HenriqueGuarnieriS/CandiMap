import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { PartidoInterface } from "../../../interfaces/Partidos";

const COLORS = [
  "#D6D6D6",
  "#FFD100",
  "#FFEE32",
  "#333533",
  "#FF8042",
  "#202020",
];

interface PartidoCardProps {
  data: PartidoInterface;
}

const InfoCharts: React.FC<PartidoCardProps> = ({ data }) => {
  // Sort and get top 5 for instrução
  const topInstrucao = [...data.instrucao].sort((a, b) => b.count - a.count);
  const topRaca = [...data.raca].sort((a, b) => b.count - a.count);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 justify-start">
      {/* Gênero - Pie Chart */}
      <div className="bg-neutral-700 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-white mb-4">
          Distribuição por Gênero
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.genero}
              dataKey="count"
              nameKey="tipo"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              labelLine={false}
              isAnimationActive={false}
            >
              {data.genero.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-neutral-700 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-white mb-4">Idade média</h3>
        <div className=" flex flex-center justify-center items-center text-6xl font-bold pb-24 w-full h-full">
          <h3>{data.media_idade.toFixed(0)} anos</h3>
        </div>
      </div>
      {/* Raça - Vertical Bar Chart */}
      <div className="bg-neutral-700 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-white mb-4">
          Distribuição por Raça
        </h3>
        <ResponsiveContainer width="100%" height={370}>
          <BarChart
            data={topRaca}
            layout="vertical"
            barCategoryGap={5}
            margin={{ top: 5, right: 10, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis type="number" stroke="#aaa" tick={{ fill: "#fff" }} />
            <YAxis
              type="category"
              dataKey="tipo"
              stroke="#aaa"
              tick={{ fill: "#fff", fontSize: 13 }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", borderRadius: "10px" }}
              labelStyle={{ color: "#fff" }}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="count" fill="#FFD100" name={"Raça"} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Instrução - Vertical Bar Chart */}
      <div className="bg-neutral-700 p-4 rounded-lg shadow-lg ">
        <h3 className="text-xl font-bold text-white mb-4">
          Nível de Instrução
        </h3>
        <ResponsiveContainer width="100%" height={370}>
          <BarChart
            data={topInstrucao}
            layout="vertical"
            barCategoryGap={5}
            margin={{ top: 5, right: 10, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis type="number" stroke="#aaa" tick={{ fill: "#fff" }} />
            <YAxis
              type="category"
              dataKey="tipo"
              stroke="#aaa"
              tick={{ fill: "#fff", fontSize: 13 }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", borderRadius: "10px" }}
              labelStyle={{ color: "#fff" }}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="count" fill="#FFD100" name={"Instrução"} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InfoCharts;
