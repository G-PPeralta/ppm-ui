// CRIADO EM: 25/07/2022
// AUTOR: BRUNO FRACARO
// DESCRIÇÃO DO ARQUIVO: COMPONENTE DE GRAFICO DE PIZZA COM PORCENTAGEM

import { PieChart, Pie, Cell } from "recharts";
interface Props {
  size: number;
  data: {
    name: string;
    value: number | string;
    color: string;
  }[];
}

export default function PieChartComponent({ size, data }: Props) {
  return (
    <PieChart width={size} height={size}>
      {data && (
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={size / 2 - 20}
          outerRadius={size / 2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      )}
    </PieChart>
  );
}
