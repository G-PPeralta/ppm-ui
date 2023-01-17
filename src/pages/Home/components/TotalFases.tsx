//  CRIADO EM: 6/2022
//  AUTOR: Bruno Fracaro, Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Barras por fases.

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export default function TotalFases({ data }: any) {
  return (
    <ResponsiveContainer width="100%">
      <BarChart
        height={700}
        data={data}
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
            fontSize: "16px",
            fontFamily: "Mulish",
            fontWeight: 400,
            width: "100%",
            color: "#2D2926",
          }}
        />
        <Tooltip />
        <Bar dataKey="Outros" stackId="b" fill="#FEB144" barSize={20} />
        <Bar dataKey="Cancelado" stackId="b" fill="#FF6663" barSize={20} />
        <Bar dataKey="Finalizado" stackId="b" fill="#9EC1CF" barSize={20} />
        <Bar
          dataKey="Iniciado"
          stackId="b"
          fill="#9EE09E"
          barSize={20}
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
