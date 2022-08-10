import {
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
} from '@chakra-ui/react';

import { TextError } from 'components/TextError';

function FormInvoice(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel htmlFor="numeroInvoice">INVOICE</FormLabel>
      <Input
        isRequired
        placeholder="Número do invoice"
        id="numeroInvoice"
        type="text"
        name="numeroInvoice"
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

export default FormInvoice;
