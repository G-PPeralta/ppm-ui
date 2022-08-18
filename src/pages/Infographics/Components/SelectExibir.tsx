import { Flex, Select, Stack } from '@chakra-ui/react';

function SelectExibir() {
  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={3}>
        <Select variant="unstyled" placeholder="Exibir">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Select>
      </Stack>
    </Flex>
  );
}

export default SelectExibir;
