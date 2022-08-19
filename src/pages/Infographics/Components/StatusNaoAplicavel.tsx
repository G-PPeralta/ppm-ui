import { Box, Flex, Text } from '@chakra-ui/react';

function StatusNaoAplicavel() {
  return (
    <Flex align={'center'}>
      <Box
        backgroundColor={'#F4DD06'}
        borderRadius={'50%'}
        width={'10px'}
        height={'10px'}
      />
      <Text ml={2}>Não Aplicável</Text>
    </Flex>
  );
}

export default StatusNaoAplicavel;
