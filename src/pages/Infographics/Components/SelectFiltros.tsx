import { Flex, Select, Stack } from '@chakra-ui/react';

function SelectFiltros() {
  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={3}>
        <Select variant="unstyled" placeholder="Filtros">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Select>
      </Stack>
    </Flex>
  );
}

export default SelectFiltros;
