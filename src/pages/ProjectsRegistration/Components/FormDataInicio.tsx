import {
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
} from '@chakra-ui/react';

import { TextError } from 'components/TextError';

function FormDataInicio(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel htmlFor="dataInicio">INÍCIO</FormLabel>
      <Input
        isRequired
        placeholder="dd/mm/aaaa"
        id="dataInicio"
        type="date"
        name="dataInicio"
        value={projectsForm.projectsForm.values.dataInicio}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: '100%', md: '95%' })}
      />
      {projectsForm.projectsForm.errors.dataInicio &&
        projectsForm.projectsForm.touched.dataInicio && (
          <TextError>{projectsForm.projectsForm.errors.dataInicio}</TextError>
        )}
    </FormControl>
  );
}

export default FormDataInicio;
