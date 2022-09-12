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
  // console.log('atividade', atividade);

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
      // _hover={{
      //   backgroundColor: '#EB3323',
      //   transition: 'all 0.4s',
      //   cursor: 'pointer',
      // }}
    >
      <Flex direction={'column'}>
        <Text
          display={'flex'}
          align={'center'}
          fontSize={'lg'}
          color={'white'}
          fontWeight={'bold'}
          // flexBasis={'basis'}
        >
          {atividade.atividade}
        </Text>
      </Flex>
      <Text
        align={'center'}
        fontSize={'sm'}
        color={'white'}
        fontWeight={'normal'}
        // flexGrow={'grow'}
      >
        {atividade.data}
      </Text>
      <Text
        align={'center'}
        fontSize={'sm'}
        color={'white'}
        fontWeight={'normal'}
        // flexGrow={'grow'}
      >
        {atividade.porcentagemFeita}
      </Text>
    </Flex>
  );
}

export default CardACT;

// Remover barra de rolagem ok
// Fonte da data e porcentagem ok
// Quebrar linha
// Tamanho do card diferencia em função do tamanho do texto
// Finalizar
