import { BarChart, Bar, XAxis, Tooltip, Legend } from "recharts";

const data = [
  {
    name: "Jan",
    Realizado: 4000,
    Previsto: 2400,
    amt: 2400,
  },
  {
    name: "Fev",
    Realizado: 3000,
    Previsto: 1398,
  },
  {
    name: "Mar",
    Realizado: 2000,
    Previsto: 9800,
  },
  {
    name: "Abr",
    Realizado: 2780,
    Previsto: 3908,
  },
  {
    name: "Mai",
    Realizado: 1890,
    Previsto: 4800,
  },
  {
    name: "Jun",
    Realizado: 2390,
    Previsto: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    Realizado: 3490,
    Previsto: 4300,
  },
];

export default function BarChartGraphic() {
  return (
    <BarChart
      width={460}
      height={240}
      data={data}
      barSize={10}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis
        tickLine={false}
        axisLine={false}
        color={"#2D2926"}
        dataKey="name"
        style={{
          fontSize: "16px",
          fontFamily: "Mulish",
          fontWeight: 400,
          width: "100%",
          color: "#2D2926",
        }}
      />

      <Tooltip />
      <Legend
        color="rgb(153 130 157)"
        layout="vertical"
        verticalAlign="middle"
        align="right"
        wrapperStyle={{
          marginRight: "-25px",
          fontSize: "16px",
          fontFamily: "Mulish",
          fontWeight: 400,
        }}
      />

      <Bar dataKey="Previsto" fill="#FEB144" />
      <Bar dataKey="Realizado" fill="#9EE09E" />
    </BarChart>
  );
}
