import {
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
} from '@chakra-ui/react';

import { TextError } from 'components/TextError';

function FormNumeroContrato(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel htmlFor="numeroContrato">NÚMERO DO CONTRATO</FormLabel>
      <Input
        isRequired
        placeholder="Número do contrato"
        id="numeroContrato"
        type="text"
        name="numeroContrato"
        value={projectsForm.projectsForm.values.nomeProjeto}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: '100%', md: '100%' })}
      />
      {projectsForm.projectsForm.errors.nomeProjeto &&
        projectsForm.projectsForm.touched.nomeProjeto && (
          <TextError>{projectsForm.projectsForm.errors.nomeProjeto}</TextError>
        )}
    </FormControl>
  );
}

export default FormNumeroContrato;
