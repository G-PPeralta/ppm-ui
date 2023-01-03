import { BarChart, Bar, XAxis, Tooltip, LabelList } from "recharts";

import { PrevistoChartFormated } from "./PrevistoxRealizado";

interface EstatisticasProps {
  info: PrevistoChartFormated;
}

export default function Estatisticas(props: EstatisticasProps) {
  const data = [
    {
      Previsto: Number(props.info.totalPrevisto),
      Realizado: Number(props.info.totalRealizado),
      PrevistoM: Number(props.info.totalPrevisto)
        .toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 0,
        })
        .substring(3),
      RealizadoM: Number(props.info.totalRealizado)
        .toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 0,
        })
        .substring(3),
    },
  ];
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

      <Tooltip
        formatter={(value: any) =>
          value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        }
      />

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
