//  CRIADO EM: 6/2022
//  AUTOR: Bruno Fracaro, Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Gráfico de barra previsto.

import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

export default function PrevistoNovo({ dataX, dataEntries }: any) {
  return (
    <BarChart
      height={230}
      width={690}
      data={dataX}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barGap={0}
      barCategoryGap={0}
    >
      <XAxis
        dataKey="mes"
        interval={0}
        style={{
          fontSize: "10px",
          fontFamily: "Mulish",
          fontWeight: 400,
          width: "100%",
          color: "#2D2926",
        }}
      />
      <YAxis
        tickFormatter={(tick) =>
          tick
            .toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })
            .substring(3)
        }
        style={{
          fontSize: "0.50rem",
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

      <Bar dataKey="Realizado" stackId="b" fill="#9EC1CF" barSize={20}></Bar>
      <Bar
        dataKey="Previsto"
        stackId="b"
        fill="#FEB144"
        barSize={20}
        radius={[5, 5, 0, 0]}
      />
    </BarChart>
  );
}
