import { Box, Flex, Text } from '@chakra-ui/react';

function StatusEmAndamento() {
  return (
    <Flex align={'center'}>
      <Box
        backgroundColor={'#0047BB'}
        borderRadius={'50%'}
        width={'10px'}
        height={'10px'}
      />
      <Text ml={2}>Em Andamento</Text>
    </Flex>
  );
}

export default StatusEmAndamento;
