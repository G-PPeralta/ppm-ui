import { useEffect } from 'react';

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

  useEffect(() => {
    // console.log(registerForm.values.atividades[index]);
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    const list: any = [...registerForm.values.atividades];
    list[index][name] = value;
    registerForm.setFieldValue(`atividades.${name}`, list);
    // console.log('Teste');
  };

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
          <FormLabel htmlFor="atividades[0].base">BASE</FormLabel>
          <Select
            id="atividades[0].base"
            name="atividades[0].base"
            placeholder="Selecione"
            value={registerForm.values.atividades[index].base}
            onChange={(event) => handleChange(event)}
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
