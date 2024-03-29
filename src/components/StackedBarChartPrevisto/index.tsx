import { StackedBarChartProps } from "interfaces/Components";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  Legend,
} from "recharts";

export default function StackedBarChartPrevisto({
  sizeW,
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
          <XAxis dataKey="mes" />
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
                fontFamily: "Mulish",
                fontWeight: 400,
                width: "100%",
                color: "#2D2926",
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
              isAnimationActive={true}
              animationDuration={1300}
              barSize={barW}
              radius={
                dataEntry.name === "Previsto" ? [5, 5, 0, 0] : [0, 0, 0, 0]
              }
            />
          ))}
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
        </BarChart>
      ) : (
        <></>
      )}
    </ResponsiveContainer>
  );
}
