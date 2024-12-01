import React from "react";
import {
  ResponsiveContainer,
  Legend,
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { EduCategoria } from "../../../interfaces/Edu";

interface EduEscolasEstadoProps {
  data: EduCategoria;
  topic: string;
}

const EduCharts: React.FC<EduEscolasEstadoProps> = ({ data, topic }) => {
  // Utilizar os dados diretamente sem transformação
  const listaNao: any = [];
  const listaSim: any = [];

  if (data.nao) {
    Object.entries(data.nao).forEach(([key, value]) => {
      listaNao.push({ tipo: key, count: value });
    });
  }

  if (data.sim) {
    Object.entries(data.sim).forEach(([key, value]) => {
      listaSim.push({ tipo: key, count: value });
    });
  }

  return (
    <div className=" flex flex-col bg-neutral-800 p-2 ">
      <h4 className=" text-2xl font-semibold mb-4 ">{topic}</h4>
      <div className="grid-cols-1 lg:grid-cols-2 grid gap-4 lg:p-4 justify-start w-full">
        {/* Distribuição - Bar Chart para "Não" */}

        {listaNao.length > 0 && (
          <div className="bg-neutral-700 p-2 lg:p-4 rounded-lg shadow-lg ">
            <h3 className="text-lg lg:text-2xl border-2 inline py-1 rounded-lg  px-2 font-bold text-white mb-3">
              Não
            </h3>

            <ResponsiveContainer width="100%" height={370}>
              <BarChart
                data={listaNao}
                layout="horizontal"
                barCategoryGap={5}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                  type="category"
                  dataKey="tipo"
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
                <Bar
                  dataKey="count"
                  fill="#FFD100"
                  name={"Quantidade"}
                  label={{ position: "top", fill: "#fff", fontSize: 12 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Distribuição - Bar Chart para "Sim" */}

        {listaSim.length > 0 && (
          <div className="bg-neutral-700 p-2 lg:p-4 rounded-lg shadow-lg ">
            <h3 className="text-lg lg:text-2xl border-2 inline py-1 rounded-lg  px-2 font-bold text-white mb-3">
              Sim
            </h3>

            <ResponsiveContainer width="100%" height={370}>
              <BarChart
                data={listaSim}
                layout="horizontal"
                barCategoryGap={5}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                  type="category"
                  dataKey="tipo"
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
                <Bar
                  dataKey="count"
                  fill="#FFD100"
                  name={"Quantidade"}
                  label={{ position: "top", fill: "#fff", fontSize: 12 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default EduCharts;
