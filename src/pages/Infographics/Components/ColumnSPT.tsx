import { Flex, Text } from '@chakra-ui/react';

import CardPIR from './CardPIR';

type Poco = {
  poco: string;
  inicio_planejado: string;
};

type Column = {
  sonda: string;
  pocos: Poco[];
};

type Props = {
  column: Column;
};

function ColumnSPT({ column }: Props) {
  return (
    <Flex direction={'column'} align={'center'} justify={'center'}>
      <Text fontSize={'2xl'} fontWeight={'bold'} mb={6} mt={3}>
        {column.sonda}
      </Text>
      <Flex direction={'column'} gap={10} align={'center'} justify={'center'}>
        {column.pocos.map((poco, index) => (
          <CardPIR poco={poco} index={index} key={index} />
        ))}
      </Flex>
    </Flex>
  );
}

export default ColumnSPT;
