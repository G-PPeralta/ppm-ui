import { StackedBarChartProps } from "interfaces/Components";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";

export default function StackedBarChart({
  sizeW,
  sizeH,
  barW,
  showY,
  data,
  dataEntries,
}: StackedBarChartProps) {
  return (
    <ResponsiveContainer height={"100%"} width={"100%"}>
      <BarChart data={data}>
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
