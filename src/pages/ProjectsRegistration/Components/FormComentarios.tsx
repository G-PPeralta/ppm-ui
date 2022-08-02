import {
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
} from '@chakra-ui/react';

import { TextError } from 'components/TextError';

function FormComentarios(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel htmlFor="comentarios">COMENTÁRIOS</FormLabel>
      <Input
        isRequired
        placeholder=""
        id="comentarios"
        type="comentarios"
        name="comentarios"
        value={projectsForm.projectsForm.values.comentarios}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: '100%', md: '100%' })}
      />
      {projectsForm.projectsForm.errors.comentarios &&
        projectsForm.projectsForm.touched.comentarios && (
          <TextError>{projectsForm.projectsForm.errors.comentarios}</TextError>
        )}
    </FormControl>
  );
}

export default FormComentarios;
