import { StackedBarChartProps } from "interfaces/Components";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";

export default function StackedBarChartProjetos({
  sizeW,
  sizeH,
  barW,
  showY,
  data,
  dataEntries,
}: StackedBarChartProps) {
  return (
    <ResponsiveContainer height={260} width={sizeW === 1000 ? sizeW : "70%"}>
      {data.length > 0 ? (
        <BarChart data={data}>
          <XAxis
            dataKey="mes"
            fontSize={10}
            tickLine={false}
            axisLine={false}
          />
          {showY ? (
            <YAxis
              dataKey={dataEntries[0].name}
              tickFormatter={(tick) => tick.toLocaleString().substring(3)}
              style={{
                fontSize: "0.50rem",
                fontFamily: "'Mulish', sans-serif",
                width: "100%",
              }}
            />
          ) : undefined}
          <Tooltip formatter={(value: any) => value.toString()} />
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
              radius={dataEntry.name === "Outros" ? [5, 5, 0, 0] : [0, 0, 0, 0]}
            />
          ))}
        </BarChart>
      ) : (
        <></>
      )}
    </ResponsiveContainer>
  );
}
