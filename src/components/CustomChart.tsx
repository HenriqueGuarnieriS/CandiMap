import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomChart = ({ data }: { data: any[] }) => {
  console.log(data);
  return (
    <div className="text-white">
      {/* Gráfico de Followers */}
      <h3 className="text-2xl font-bold text-center mb-4">Followers Growth</h3>

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
            domain={["dataMin - 50", "dataMax + 50"]}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#333", borderRadius: "10px" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#ffdd57" }}
          />

          <Legend verticalAlign="top" height={36} />

          <Line
            type="monotone"
            dataKey="followers"
            name="Followers"
            stroke="#ffdd57"
            strokeWidth={3}
            dot={{ r: 2, fill: "#ffdd57" }}
            activeDot={{ r: 8, stroke: "#fff", fill: "#ffdd57" }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Gráfico de Avg Likes */}
      <h3 className="text-2xl font-bold text-center mt-8 mb-4">
        Average Likes
      </h3>

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
            domain={["dataMin - 50", "dataMax + 50"]}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#333", borderRadius: "10px" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#61dafb" }}
          />

          <Legend verticalAlign="top" height={36} />

          <Line
            type="monotone"
            dataKey="avg_likes"
            name="Avg Likes"
            stroke="#61dafb"
            strokeWidth={3}
            dot={{ r: 2, fill: "#61dafb" }}
            activeDot={{ r: 8, stroke: "#fff", fill: "#61dafb" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomChart;
