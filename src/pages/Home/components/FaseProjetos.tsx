import { useEffect, useState } from "react";

import {
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

import { getGates } from "services/get/Dashboard";

interface Data {
  gate: string;
  qtde: number;
  pct: number;
}

export default function NaoPrevistoComponent() {
  const [data, setData] = useState<Data[]>([]);

  const getData = async () => {
    const gates = await getGates();
    const newData: any[] = [];
    for (const gate of gates.data) {
      const newItem = {
        value: Number(gate.qtde),
        name: gate.gate,
        color:
          // eslint-disable-next-line no-nested-ternary
          gate.gate == "A definir"
            ? "#FEB144"
            : gate.gate == "Não Iniciado"
            ? "#FEB144"
            : "#9EE09E",
      };
      newData.push(newItem);
    }
    setData(newData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Flex
      align="center"
      justify="center"
      flex={1}
      h={"370px"}
      py={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
      px={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
      w={"100%"}
      bg={"white"}
      boxShadow={{
        base: "none",
        sm: useColorModeValue("md", "md-dark"),
      }}
      borderRadius={"xl"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Text
        mb={1}
        sx={{
          fontSize: 18,
          fontWeight: "700",
          fontFamily: "Mulish",
          alignSelf: innerWidth >= 428 ? "center" : "flex-start",
        }}
        color="#000000"
      >
        Fase dos Projetos
      </Text>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          fill="#82ca9d"
          label
          nameKey={"name"}
        >
          {data.map((entry: any, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </Flex>
  );
}
