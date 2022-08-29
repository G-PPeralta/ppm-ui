import { Flex, Text } from '@chakra-ui/react';

import CardPIR from './CardPIR';

type Column = {
  nome: string;
};

type Props = {
  column: Column;
};

function ColumnSPT({ column }: Props) {
  const infoCards = [
    {
      nome: 'PIR 001',
      data: '12/04/2022',
      porcentagem: `${Math.floor(Math.random() * 100)}%`,
    },
    {
      nome: 'PIR 002',
      data: '12/04/2022',
      porcentagem: `${Math.floor(Math.random() * 100)}%`,
    },
    {
      nome: 'PIR 003',
      data: '12/04/2022',
      porcentagem: `${Math.floor(Math.random() * 100)}%`,
    },
    {
      nome: 'PIR 004',
      data: '12/04/2022',
      porcentagem: `${Math.floor(Math.random() * 100)}%`,
    },
    {
      nome: 'PIR 005',
      data: '12/04/2022',
      porcentagem: `${Math.floor(Math.random() * 100)}%`,
    },
    {
      nome: 'PIR 006',
      data: '12/04/2022',
      porcentagem: `${Math.floor(Math.random() * 100)}%`,
    },
    {
      nome: 'PIR 007',
      data: '12/04/2022',
      porcentagem: `${Math.floor(Math.random() * 100)}%`,
    },
    {
      nome: 'PIR 008',
      data: '12/04/2022',
      porcentagem: `${Math.floor(Math.random() * 100)}%`,
    },
    // {
    //   nome: 'PIR 009',
    //   data: '12/04/2022',
    //   porcentagem: `${Math.floor(Math.random() * 100)}%`,
    // },
  ];

  return (
    <Flex direction={'column'}>
      <Text fontSize={'2xl'} fontWeight={'bold'} mb={6} mt={3}>
        {column.nome}
      </Text>
      <Flex direction={'column'} gap={10} align={'center'} justify={'center'}>
        {infoCards.map((card, index) => (
          <CardPIR card={card} index={index} />
        ))}
      </Flex>
    </Flex>
  );
}

export default ColumnSPT;
