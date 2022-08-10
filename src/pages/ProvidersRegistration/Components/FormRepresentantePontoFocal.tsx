import {
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
} from '@chakra-ui/react';

import { TextError } from 'components/TextError';

function FormRepresentantePontoFocal(projectsForm: any) {
  return (
    <FormControl>
      {window.innerWidth > 900 ? (
        <FormLabel htmlFor="representantePontoFocal">
          REPRESENTANTE/PONTO FOCAL
        </FormLabel>
      ) : (
        <FormLabel htmlFor="representantePontoFocal">REPRESENTANTE</FormLabel>
      )}
      <Input
        isRequired
        placeholder="Nome do representante"
        id="representantePontoFocal"
        type="text"
        name="representantePontoFocal"
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

export default FormRepresentantePontoFocal;
