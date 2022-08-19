import { Flex, Select, Stack } from '@chakra-ui/react';

function SelectExibir() {
  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={3}>
        <Select variant="unstyled" placeholder="Exibir">
          <option value="2">Data Fim</option>
          <option value="1">Data Início</option>
          <option value="3">Status</option>
        </Select>
      </Stack>
    </Flex>
  );
}

export default SelectExibir;
