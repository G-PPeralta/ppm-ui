import { BarChart, Bar, XAxis, Tooltip } from "recharts";

const data = [
  {
    Previsto: 83,
    Realizado: 67,
  },
];

export default function Estatisticas() {
  return (
    <BarChart
      width={180}
      height={260}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis
        dataKey="date"
        tickLine={false}
        axisLine={false}
        color={"#2D2926"}
        style={{
          fontSize: "16px",
          fontFamily: "Mulish",
          fontWeight: 400,
          width: "100%",
          color: "#2D2926",
        }}
      />

      <Tooltip />

      <Bar dataKey="Previsto" fill={"#FEB144"} />
      <Bar dataKey="Realizado" fill={"#9EC1CF"} />
    </BarChart>
  );
}
