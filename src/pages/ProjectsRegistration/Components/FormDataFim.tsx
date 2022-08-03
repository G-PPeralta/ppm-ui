import {
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
} from '@chakra-ui/react';

import { TextError } from 'components/TextError';

function FormDataFim(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel htmlFor="dataFim">FIM</FormLabel>
      <Input
        isRequired
        placeholder="dd/mm/aaaa"
        id="dataFim"
        type="date"
        name="dataFim"
        value={projectsForm.projectsForm.values.dataFim}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: '100%', md: '90%' })}
      />
      {projectsForm.projectsForm.errors.dataFim &&
        projectsForm.projectsForm.touched.dataFim && (
          <TextError> {projectsForm.projectsForm.errors.dataFim}</TextError>
        )}
    </FormControl>
  );
}

export default FormDataFim;
