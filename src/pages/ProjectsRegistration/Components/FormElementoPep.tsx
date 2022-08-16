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
        value={projectsForm.projectsForm.values.elementoPep}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: '100%', md: '100%' })}
      />
      {projectsForm.projectsForm.errors.elementoPep &&
        projectsForm.projectsForm.touched.elementoPep && (
          <TextError>{projectsForm.projectsForm.errors.elementoPep}</TextError>
        )}
    </FormControl>
  );
}

export default FormElementoPep;
