import { Flex, Heading, Text } from '@chakra-ui/react';

function CardPIR() {
  return (
    <Flex direction={'row'} gap={4}>
      <Flex align={'center'} justify={'center'}>
        <Heading as="h3" size="md" textAlign={'center'}>
          Atual
        </Heading>
      </Flex>
      <Flex
        direction={'column'}
        align={'center'}
        justify={'center'}
        backgroundColor={'#0047BB'}
        px={6}
        py={2}
        borderRadius={4}
      >
        <Text fontSize={'lg'} color={'white'} fontWeight={'bold'}>
          PIR 001
        </Text>
        <Text fontSize={'md'} color={'white'} fontWeight={'semi-bold'}>
          12/04/2022
        </Text>
        <Text fontSize={'md'} color={'white'} fontWeight={'semi-bold'}>
          50%
        </Text>
      </Flex>
    </Flex>
  );
}

export default CardPIR;
