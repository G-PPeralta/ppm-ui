// CRIADO EM: 23/09/2022
// AUTOR: GABRIEL PERALTA
// DESCRIÇÃO DO ARQUIVO: COMPONENTE PARA EXIBIR O GRÁFICO DE PIZZA COM A PORCENTAGEM DE PROJETOS POR STATUS

import { Box, Text } from "@chakra-ui/react";
import { PieChart, Pie, Cell } from "recharts";

interface Props {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

export function PercentagePieChartProjetoInfo({ data }: Props) {
  return (
    <Box
      w={60 / 5}
      h={60 / 5}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <PieChart width={60} height={60}>
        <Pie
          startAngle={-270}
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60 / 2 - 5}
          outerRadius={60 / 2}
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={data[index].color} />
          ))}
        </Pie>
      </PieChart>
      <Box
        w={60 / 5}
        h={60 / 5}
        alignItems="center"
        display={"flex"}
        sx={{ position: "absolute" }}
        justifyContent="center"
      >
        <Text sx={{ fontSize: 15, fontWeight: 700 }} color={data[1].color}>
          {data[1].value + "%"}
        </Text>
      </Box>
    </Box>
  );
}
