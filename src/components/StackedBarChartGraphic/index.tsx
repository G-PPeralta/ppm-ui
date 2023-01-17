// CRIADO EM: 09/10/2022
// AUTOR: GEOVANA AUGUSTA
// DESCRIÇÃO DO ARQUIVO: COMPONENTE PARA EXIBIR GRÁFICO DE BARRAS

import { StackedBarChartProps } from "interfaces/Components";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";

import style from "./StackedBarChart.module.scss";

export default function StackedBarChartGraphic({
  sizeW,
  sizeH,
  barW,
  showY,
  data,
  dataEntries,
}: StackedBarChartProps) {
  return (
    <ResponsiveContainer width={sizeW} height={sizeH}>
      {data.length > 0 ? (
        <BarChart data={data} className={style.chart}>
          <XAxis dataKey="key" fontSize={10} />
          {showY ? <YAxis /> : undefined}
          <Tooltip isAnimationActive={false} />
          {dataEntries.map((dataEntry, index) => (
            <Bar
              key={index}
              dataKey={dataEntry.name}
              stackId="a"
              fill={dataEntry.color}
              legendType="circle"
              isAnimationActive={true}
              animationDuration={1300}
              barSize={barW}
              label={{
                position: "top",
                fill: "origem.500",
                fontSize: 10,
                fontWeight: 700,
              }}
            />
          ))}
        </BarChart>
      ) : (
        <></>
      )}
    </ResponsiveContainer>
  );
}
