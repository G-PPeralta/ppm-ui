import { Flex, Text } from '@chakra-ui/react';

import CardPIR from './CardPIR';

function ColumnSPT() {
  const arrayOfCards = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Flex direction={'column'} align={'center'} justify={'center'}>
      <Text fontSize={'2xl'} fontWeight={'bold'} mb={6}>
        SPT - 112
      </Text>
      <Flex direction={'column'} gap={10}>
        {arrayOfCards.map((_card) => (
          <CardPIR />
        ))}
      </Flex>
    </Flex>
  );
}

export default ColumnSPT;
