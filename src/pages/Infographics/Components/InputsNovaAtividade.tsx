import {
  Flex,
  FormControl,
  FormLabel,
  Select,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';

import { useCadastroProjetoTipo } from 'hooks/useCadastroProjetoTipo';

function InputsNovaAtividade({ index }: any) {
  const { registerForm } = useCadastroProjetoTipo();

  return (
    <Stack>
      <FormLabel>ATIVIDADE</FormLabel>
      <Flex
        flexDirection={useBreakpointValue({
          base: 'column',
          md: 'row',
        })}
        gap={5}
      >
        <FormControl>
          <FormLabel>BASE</FormLabel>
          <Select
            id={registerForm.values.atividades[index].base}
            name={registerForm.values.atividades[index].base}
            placeholder="Selecione"
            value={registerForm.values.atividades[index].base}
            onChange={registerForm.handleChange}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>TAREFA</FormLabel>
          <Select
            id="tarefa"
            name="tarefa"
            placeholder="Selecione"
            value={registerForm.values.atividades[index].tarefa}
            onChange={registerForm.handleChange}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>PRECEDENTES</FormLabel>
          <Select
            id="precedente"
            name="precedente"
            placeholder="Selecione"
            value={registerForm.values.atividades[index].precedente}
            onChange={registerForm.handleChange}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>DIAS</FormLabel>
          <Select
            id="dias"
            name="dias"
            placeholder="Selecione"
            value={registerForm.values.atividades[index].dias}
            onChange={registerForm.handleChange}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </FormControl>
      </Flex>
    </Stack>
  );
}

export default InputsNovaAtividade;
