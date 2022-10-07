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

export default function StackedBarChart({
  sizeW,
  sizeH,
  barW,
  showY,
  data,
  dataEntries,
}: StackedBarChartProps) {
  return (
    <ResponsiveContainer width={sizeW} height={sizeH}>
      <BarChart data={data} className={style.chart}>
        <XAxis dataKey="month" fontSize={10} />
        {showY ? <YAxis dataKey={dataEntries[0].name} /> : undefined}
        <Tooltip />
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
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
