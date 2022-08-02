import {
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
} from '@chakra-ui/react';

import { TextError } from 'components/TextError';

function FormDataFimReal(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel htmlFor="dataFimReal">FIM REAL</FormLabel>
      <Input
        isRequired
        placeholder="dd/mm/aaaa"
        id="dataFimReal"
        type="date"
        name="dataFimReal"
        value={projectsForm.projectsForm.values.dataFimReal}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: '100%', md: '100%' })}
      />
      {projectsForm.projectsForm.errors.dataFimReal &&
        projectsForm.projectsForm.touched.dataFimReal && (
          <TextError> {projectsForm.projectsForm.errors.dataFimReal}</TextError>
        )}
    </FormControl>
  );
}

export default FormDataFimReal;
