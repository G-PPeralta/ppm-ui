import { Flex, Heading, Text } from '@chakra-ui/react';

import { formatDate } from 'utils/formatDate';

type Poco = {
  poco: string;
  inicio_planejado: string;
};

type Props = {
  poco: Poco;
  index: number;
};

function CardPIR({ poco, index }: Props) {
  // console.log('CARD', poco);
  const dataInicioFormatada = formatDate(new Date(poco.inicio_planejado));

  // const dataInicio = '2022-08-25';
  // const dataFim = '2022-08-31';
  // const diferencaMilisegundos =
  //   Number(new Date(dataFim)) - Number(new Date(dataInicio));
  // const diferencaDias = diferencaMilisegundos / (1000 * 60 * 60 * 24);

  // console.log('Quantidade dias:', diferencaDias);

  return (
    <Flex direction={'row'} gap={4}>
      <Flex align={'center'} justify={'center'}>
        <Heading as="h3" size="md" textAlign={'center'} width={'50px'}>
          {index === 0 ? 'Atual' : `${index + 1}º`}
        </Heading>
      </Flex>
      <Flex
        direction={'column'}
        align={'center'}
        justify={'center'}
        backgroundColor={'#0047BB'}
        px={4}
        py={2}
        borderRadius={4}
        _hover={{
          backgroundColor: '#EB3323',
          transition: 'all 0.4s',
          cursor: 'pointer',
        }}
      >
        <Text fontSize={'lg'} color={'white'} fontWeight={'bold'}>
          {poco.poco}
        </Text>
        <Text fontSize={'md'} color={'white'} fontWeight={'semi-bold'}>
          {dataInicioFormatada}
        </Text>
        {/* <Text fontSize={'md'} color={'white'} fontWeight={'semi-bold'}>
          {card.porcentagem}
        </Text> */}
      </Flex>
    </Flex>
  );
}

export default CardPIR;
