import {
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
} from '@chakra-ui/react';

import { TextError } from 'components/TextError';

import formatCellphone from 'utils/formatCellphone';

function FormTelefone(projectsForm: any) {
  return (
    <>
      <FormControl>
        <FormLabel htmlFor="telephone">TELEFONE</FormLabel>
        <Input
          isRequired
          placeholder="(00)00000-0000"
          id="telephone"
          type="text"
          name="telephone"
          maxLength={15}
          value={formatCellphone(projectsForm.projectsForm.values.nomeProjeto)}
          onChange={projectsForm.projectsForm.handleChange}
          w={useBreakpointValue({ base: '100%', md: '100%' })}
        />
        {projectsForm.projectsForm.errors.nomeProjeto &&
          projectsForm.projectsForm.touched.nomeProjeto && (
            <TextError>
              {projectsForm.projectsForm.errors.nomeProjeto}
            </TextError>
          )}
      </FormControl>
    </>
  );
}

export default FormTelefone;
