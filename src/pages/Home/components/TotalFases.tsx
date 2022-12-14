import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export default function TotalFases() {
  const dataEntries = [
    { mes: "Jan", iniciado: 10, finalizado: 2, cancelado: 3, outros: 5 },
    { mes: "Fev", iniciado: 10, finalizado: 2, cancelado: 3, outros: 5 },
    { mes: "Mar", iniciado: 10, finalizado: 2, cancelado: 3, outros: 5 },
    { mes: "Abr", iniciado: 10, finalizado: 2, cancelado: 3, outros: 5 },
    { mes: "Mai", iniciado: 10, finalizado: 2, cancelado: 3, outros: 5 },
    { mes: "Jun", iniciado: 10, finalizado: 2, cancelado: 3, outros: 5 },
    { mes: "Jul", iniciado: 10, finalizado: 2, cancelado: 3, outros: 5 },
    { mes: "Ago", iniciado: 10, finalizado: 2, cancelado: 3, outros: 5 },
    { mes: "Set", iniciado: 10, finalizado: 2, cancelado: 3, outros: 5 },
    { mes: "Out", iniciado: 10, finalizado: 2, cancelado: 3, outros: 5 },
    { mes: "Nov", iniciado: 10, finalizado: 2, cancelado: 3, outros: 5 },
    { mes: "Dez", iniciado: 10, finalizado: 2, cancelado: 3, outros: 5 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
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
        <XAxis dataKey="mes" />
        <Tooltip />
        <Bar dataKey="outros" stackId="b" fill="#FEB144" barSize={20} />
        <Bar dataKey="cancelado" stackId="b" fill="#FF6663" barSize={20} />
        <Bar dataKey="finalizado" stackId="b" fill="#9EC1CF" barSize={20} />
        <Bar
          dataKey="iniciado"
          stackId="b"
          fill="#9EE09E"
          barSize={20}
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
