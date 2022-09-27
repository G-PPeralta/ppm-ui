// import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

// import { Box, Text } from "@chakra-ui/react";

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
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60 / 2 - 5}
          outerRadius={60 / 2}
        >
          {data.map((entry, index) => (
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
        {/* {upDown ? (
          <AiOutlineCaretUp color="#93E01B" size={10} />
        ) : (
          <AiOutlineCaretDown color="#F94144" size={10} />
        )} */}
        <Text sx={{ fontSize: 15, fontWeight: 700 }} color={data[1].color}>
          {data[1].value + "%"}
        </Text>
      </Box>
    </Box>
  );
}
