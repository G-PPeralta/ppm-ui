import { Box, Flex, Text } from '@chakra-ui/react';

function StatusNaoIniciado() {
  return (
    <Flex align={'center'}>
      <Box
        backgroundColor={'#FFB400'}
        borderRadius={'50%'}
        width={'10px'}
        height={'10px'}
      />
      <Text ml={2}>Não Iniciado</Text>
    </Flex>
  );
}

export default StatusNaoIniciado;
