import {
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
} from '@chakra-ui/react';

import { TextError } from 'components/TextError';

function FormNomeFornecedor(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel htmlFor="nomeProjeto">NOME DO FORNECEDOR</FormLabel>
      <Input
        isRequired
        placeholder="Nome do projeto"
        id="nomeProjeto"
        type="text"
        name="nomeProjeto"
        value={projectsForm.projectsForm.values.nomeProjeto}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: '100%', md: '95%' })}
      />
      {projectsForm.projectsForm.errors.nomeProjeto &&
        projectsForm.projectsForm.touched.nomeProjeto && (
          <TextError>{projectsForm.projectsForm.errors.nomeProjeto}</TextError>
        )}
    </FormControl>
  );
}

export default FormNomeFornecedor;
