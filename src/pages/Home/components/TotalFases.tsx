import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export default function TotalFases({ data }: any) {
  // console.log(data);

  const dataEntries = [
    { mes: "Jan", Iniciado: 10, Finalizado: 2, Cancelado: 3, Outros: 5 },
    { mes: "Fev", Iniciado: 10, Finalizado: 2, Cancelado: 3, Outros: 5 },
    { mes: "Mar", Iniciado: 10, Finalizado: 2, Cancelado: 3, Outros: 5 },
    { mes: "Abr", Iniciado: 10, Finalizado: 2, Cancelado: 3, Outros: 5 },
    { mes: "Mai", Iniciado: 10, Finalizado: 2, Cancelado: 3, Outros: 5 },
    { mes: "Jun", Iniciado: 10, Finalizado: 2, Cancelado: 3, Outros: 5 },
    { mes: "Jul", Iniciado: 10, Finalizado: 2, Cancelado: 3, Outros: 5 },
    { mes: "Ago", Iniciado: 10, Finalizado: 2, Cancelado: 3, Outros: 5 },
    { mes: "Set", Iniciado: 10, Finalizado: 2, Cancelado: 3, Outros: 5 },
    { mes: "Out", Iniciado: 10, Finalizado: 2, Cancelado: 3, Outros: 5 },
    { mes: "Nov", Iniciado: 10, Finalizado: 2, Cancelado: 3, Outros: 5 },
    { mes: "Dez", Iniciado: 10, Finalizado: 2, Cancelado: 3, Outros: 5 },
  ];

  return (
    <ResponsiveContainer width="100%">
      <BarChart
        height={700}
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
        <XAxis dataKey="mes" />
        <Tooltip />
        <Bar dataKey="Outros" stackId="b" fill="#FEB144" barSize={20} />
        <Bar dataKey="Cancelado" stackId="b" fill="#FF6663" barSize={20} />
        <Bar dataKey="Finalizado" stackId="b" fill="#9EC1CF" barSize={20} />
        <Bar
          dataKey="Iniciado"
          stackId="b"
          fill="#9EE09E"
          barSize={20}
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
