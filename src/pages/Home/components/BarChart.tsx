//  CRIADO EM: 6/2022
//  AUTOR: Bruno Fracaro, Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Componente genérico para bar charts.

import { BarChart, Bar, XAxis, Tooltip, Legend } from "recharts";

export default function BarChartGraphic({ data }: any) {
  const mesSemAno = data.map((m: any) => ({
    ...m,
    mes: m.mes.substring(0, 3),
  }));

  return (
    <BarChart
      width={460}
      height={240}
      data={mesSemAno}
      barSize={10}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis
        interval={0}
        tickLine={false}
        axisLine={false}
        color={"#2D2926"}
        dataKey="mes"
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
