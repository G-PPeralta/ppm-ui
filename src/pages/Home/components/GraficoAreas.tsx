import React from "react";

import { BarChart, Bar, XAxis, Tooltip, Legend } from "recharts";

const data2 = [
  {
    data: "Jan/23",
    OPE: 2,
    Reservatórios: 1,
    Teste: 1,
  },
];

export function AreasDemandantesGrafico(data: any) {
  return (
    <BarChart
      width={300}
      height={300}
      data={data.data || data2}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis
        dataKey="data"
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

      <Bar dataKey="OPE" stackId="a" fill="#FF6663" barSize={20} />
      <Bar dataKey="Reservatórios" stackId="a" fill="#9EC1CF" barSize={20} />
      <Bar
        dataKey="Teste"
        stackId="a"
        fill="#9EE09E"
        barSize={20}
        radius={[5, 5, 0, 0]}
      />
    </BarChart>
  );
}
