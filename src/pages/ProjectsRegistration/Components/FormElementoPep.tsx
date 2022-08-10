import {
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
} from '@chakra-ui/react';

import { TextError } from 'components/TextError';

function FormElementoPep(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel htmlFor="elementoPep">ELEMENTO PEP</FormLabel>
      <Input
        isRequired
        placeholder="Elemento PEP"
        id="elementoPep"
        type="text"
        name="elementoPep"
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

export default FormElementoPep;
