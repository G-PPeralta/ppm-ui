import { Flex, Text } from '@chakra-ui/react';

type Atividade = {
  atividade: string;
  data: string;
  porcentagemFeita: string;
};

type Props = {
  atividade: Atividade;
};

function CardACT({ atividade }: Props) {
  return (
    <Flex
      direction={'column'}
      align={'right'}
      justify={'right'}
      backgroundColor={'#0047BB'}
      px={4}
      py={2}
      borderRadius={4}
      w={'100%'}
    >
      <Flex direction={'column'}>
        <Text
          display={'flex'}
          align={'center'}
          fontSize={'lg'}
          color={'white'}
          fontWeight={'bold'}
        >
          {atividade.atividade}
        </Text>
      </Flex>
      <Text
        align={'center'}
        fontSize={'sm'}
        color={'white'}
        fontWeight={'normal'}
      >
        {atividade.data}
      </Text>
      <Text
        align={'center'}
        fontSize={'sm'}
        color={'white'}
        fontWeight={'normal'}
      >
        {atividade.porcentagemFeita}
      </Text>
    </Flex>
  );
}

export default CardACT;
