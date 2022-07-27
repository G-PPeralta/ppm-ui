import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai';

import { Box, Text } from '@chakra-ui/react';
import { PieChart, Pie, Cell } from 'recharts';

interface Props {
  size: number;
  upDown: boolean;
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

export default function PieChartComponent({ size, upDown, data }: Props) {
  return (
    <Box
      w={size / 5}
      h={size / 5}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={size / 2 - 5}
          outerRadius={size / 2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
      <Box
        w={size / 5}
        h={size / 5}
        alignItems="center"
        display={'flex'}
        sx={{ position: 'absolute' }}
        justifyContent="center"
      >
        {upDown ? (
          <AiOutlineCaretUp color="#93E01B" size={10} />
        ) : (
          <AiOutlineCaretDown color="#F94144" size={10} />
        )}
        <Text sx={{ fontSize: 15 }} color={data[1].color}>
          30%
        </Text>
      </Box>
    </Box>
  );
}
