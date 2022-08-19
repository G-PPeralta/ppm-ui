import { Flex, Select, Stack } from '@chakra-ui/react';

function SelectFiltros() {
  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={3}>
        <Select variant="unstyled" placeholder="Filtros">
          <option value="1">Área</option>
          <option value="2">Atividade</option>
          <option value="6">Data</option>
          <option value="3">Poço</option>
          <option value="4">Sonda</option>
          <option value="5">Status</option>
        </Select>
      </Stack>
    </Flex>
  );
}

export default SelectFiltros;
