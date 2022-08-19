import { Box, Flex, Text } from '@chakra-ui/react';

function StatusAtrasado() {
  return (
    <Flex align={'center'}>
      <Box
        backgroundColor={'#F40606'}
        borderRadius={'50%'}
        width={'10px'}
        height={'10px'}
      />
      <Text ml={2}>Atrasado</Text>
    </Flex>
  );
}

export default StatusAtrasado;
