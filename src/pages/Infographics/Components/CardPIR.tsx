import { Flex, Heading, Text } from '@chakra-ui/react';

type Card = {
  nome: string;
  data: string;
  porcentagem: string;
};

type Props = {
  card: Card;
  index: number;
};

function CardPIR({ card, index }: Props) {
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
      >
        <Text fontSize={'lg'} color={'white'} fontWeight={'bold'}>
          {card.nome}
        </Text>
        <Text fontSize={'md'} color={'white'} fontWeight={'semi-bold'}>
          {card.data}
        </Text>
        <Text fontSize={'md'} color={'white'} fontWeight={'semi-bold'}>
          {card.porcentagem}
        </Text>
      </Flex>
    </Flex>
  );
}

export default CardPIR;
