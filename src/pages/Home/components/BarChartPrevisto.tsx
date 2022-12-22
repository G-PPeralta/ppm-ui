import { BarChart, Bar, XAxis, Tooltip, LabelList } from "recharts";

const data = [
  {
    Previsto: 80000000,
    Realizado: 75000000,
    PrevistoM: (80000000)
      .toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 0,
      })
      .substring(3),
    RealizadoM: (75000000)
      .toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 0,
      })
      .substring(3),
  },
];

export default function Estatisticas() {
  return (
    <BarChart
      width={160}
      height={240}
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

      <Bar dataKey="Previsto" fill={"#FEB144"}>
        {" "}
        <LabelList
          dataKey="PrevistoM"
          position="center"
          angle={270}
          offset={25}
          style={{
            textAnchor: "end",
            fontSize: "80%",
            fill: "white",
          }}
        />
      </Bar>
      <Bar dataKey="Realizado" fill={"#9EC1CF"}>
        {" "}
        <LabelList
          dataKey="RealizadoM"
          position="center"
          angle={270}
          offset={25}
          style={{
            textAnchor: "end",
            fontSize: "80%",
            fill: "white",
          }}
        />
      </Bar>
    </BarChart>
  );
}
