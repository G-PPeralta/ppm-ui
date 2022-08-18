import { Box, Flex, Text } from '@chakra-ui/react';

function StatusConcluido() {
  return (
    <Flex align={'center'}>
      <Box
        backgroundColor={'#059502'}
        borderRadius={'50%'}
        width={'10px'}
        height={'10px'}
      />
      <Text ml={2}>Concluido</Text>
    </Flex>
  );
}

export default StatusConcluido;
