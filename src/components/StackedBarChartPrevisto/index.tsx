import { StackedBarChartProps } from "interfaces/Components";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";

export default function StackedBarChartPrevisto({
  sizeW,
  sizeH,
  barW,
  showY,
  data,
  dataEntries,
}: StackedBarChartProps) {
  return (
    <ResponsiveContainer
      height={"100%"}
      width={sizeW === 1000 ? sizeW : "100%"}
    >
      {data.length > 0 ? (
        <BarChart data={data}>
          <XAxis dataKey="mes" fontSize={10} />
          {showY ? (
            <YAxis
              dataKey={dataEntries[0].name}
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
                fontFamily: "'Mulish', sans-serif",
                width: "100%",
              }}
            />
          ) : undefined}
          <Tooltip
            formatter={(value: any) =>
              value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            }
          />
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
      ) : (
        <></>
      )}
    </ResponsiveContainer>
  );
}
