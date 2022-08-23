import { Box, Flex, Text } from '@chakra-ui/react';

type Props = {
  status: string;
  color: string;
};

function StatusProjeto({ status, color }: Props) {
  return (
    <Flex align={'center'}>
      <Box
        backgroundColor={color}
        borderRadius={'50%'}
        width={'10px'}
        height={'10px'}
      />
      <Text ml={2}>{status}</Text>
    </Flex>
  );
}

export default StatusProjeto;
