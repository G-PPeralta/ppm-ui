import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

export default function PrevistoNovo({ dataX, dataEntries }: any) {
  // console.log(data);

  // const dataEntries = [
  //   { mes: "Jan", Previsto: 10, Realizado: 2 },
  //   { mes: "Fev", Previsto: 10, Realizado: 2 },
  //   { mes: "Mar", Previsto: 10, Realizado: 2 },
  //   { mes: "Abr", Previsto: 10, Realizado: 2 },
  //   { mes: "Mai", Previsto: 10, Realizado: 2 },
  //   { mes: "Jun", Previsto: 10, Realizado: 2 },
  //   { mes: "Jul", Previsto: 10, Realizado: 2 },
  //   { mes: "Ago", Previsto: 10, Realizado: 2 },
  //   { mes: "Set", Previsto: 10, Realizado: 2 },
  //   { mes: "Out", Previsto: 10, Realizado: 2 },
  //   { mes: "Nov", Previsto: 10, Realizado: 2 },
  //   { mes: "Dez", Previsto: 10, Realizado: 2 },
  // ];

  return (
    <BarChart
      height={230}
      // data={data}
      width={750}
      data={dataX}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barGap={0}
      barCategoryGap={0}
    >
      <XAxis
        dataKey="mes"
        interval={0}
        style={{
          fontSize: "16px",
          fontFamily: "Mulish",
          fontWeight: 400,
          width: "100%",
          color: "#2D2926",
        }}
      />
      <YAxis
        // dataKey={dataEntries[1].name}
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
      <Tooltip
        formatter={(value: any) =>
          value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        }
      />
      <Legend
        color="rgb(153 130 157)"
        layout="vertical"
        verticalAlign="bottom"
        align="right"
        wrapperStyle={{
          marginRight: "-25px",
          fontSize: "16px",
          fontFamily: "Mulish",
          fontWeight: 400,
        }}
      />

      <Bar dataKey="Realizado" stackId="b" fill="#9EC1CF" barSize={20}></Bar>
      <Bar
        dataKey="Previsto"
        stackId="b"
        fill="#FEB144"
        barSize={20}
        radius={[5, 5, 0, 0]}
      />
    </BarChart>
  );
}
