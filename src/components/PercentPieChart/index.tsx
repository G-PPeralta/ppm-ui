import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai';

import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { PieChart, Pie, Cell } from 'recharts';

const data01 = [
  {
    name: 'Undone',
    value: 70,
    color: '#9fed9f',
  },
  {
    name: 'Done',
    value: 30,
    color: '#428542',
  },
];

export default function PieChartComponent() {
  const upDown = false;

  return (
    <Flex
      w={useBreakpointValue({ base: '100%', md: 'auto' })}
      align="center"
      justify="center"
      bg={useBreakpointValue({ base: 'white', sm: '#EDF2F7' })}
    >
      <PieChart width={730} height={250}>
        <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
        >
          {data01.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
      <Box alignItems="center" display={'flex'} sx={{ position: 'absolute' }}>
        {upDown ? (
          <AiOutlineCaretUp color="#93E01B" size={20} />
        ) : (
          <AiOutlineCaretDown color="#F94144" size={20} />
        )}
        <Text sx={{ fontSize: 30 }} color={data01[1].color}>
          30%
        </Text>
      </Box>
    </Flex>
  );
}
