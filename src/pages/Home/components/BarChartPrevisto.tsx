import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export default function Estatisticas({ data }: any) {
  // console.log(data);

  const dataEntries = [
    { status: "Previsto", Porcentagem: 83 },
    { status: "Realizado", Porcentagem: 67 },
  ];

  return (
    <ResponsiveContainer width={"100%"}>
      <BarChart
        height={250}
        // data={data}
        data={dataEntries}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barGap={0}
        barCategoryGap={0}
      >
        <XAxis dataKey="status" tickLine={false} axisLine={false} />
        <Tooltip />
        <Bar
          dataKey="Previsto"
          stackId="b"
          fill="#FEB144"
          barSize={20}
          radius={[2, 2, 0, 0]}
        />
        <Bar
          dataKey="Realizado"
          stackId="b"
          fill="#FF6663"
          barSize={20}
          radius={[2, 2, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
