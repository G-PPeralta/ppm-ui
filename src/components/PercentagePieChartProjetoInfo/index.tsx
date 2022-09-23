// import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

// import { Box, Text } from "@chakra-ui/react";
import { ProjetoProgresso } from "interfaces/Services";
import { PieChart, Pie } from "recharts";

interface Props {
  // size: number;
  // upDown: boolean;
  data: ProjetoProgresso[];
}

export function PercentagePieChartProjetoInfo({ data }: Props) {
  return (
    <>
      <PieChart width={2} height={2}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={2}
          outerRadius={2}
        />
      </PieChart>
    </>
  );
}
