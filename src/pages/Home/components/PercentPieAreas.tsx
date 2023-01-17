//  CRIADO EM: 6/2022
//  AUTOR: Bruno Fracaro, Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Gráfico de pizza percentagem.

import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#FF6663", "#9EC1CF", "#9EE09E"];

export default function PercentPieChart(data: any) {
  return (
    <PieChart width={220} height={300}>
      <Pie
        data={data.data}
        cx={120}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        label
      >
        {data.data.map((entry: any, index: any) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
