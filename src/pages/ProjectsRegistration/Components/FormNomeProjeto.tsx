import { useEffect } from 'react';

import {
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
} from '@chakra-ui/react';
// import { FormikProps } from 'formik';
// import { RegisterProjectProps } from 'interfaces/Services';

import { TextError } from 'components/TextError';

function FormNomeProjeto(projectsForm: any) {
  useEffect(() => {
    console.log(projectsForm.projectsForm.values);
  }, [projectsForm]);
  return (
    <FormControl>
      <FormLabel htmlFor="nomeProjeto">PROJETO</FormLabel>
      <Input
        isRequired
        placeholder="Nome do projeto"
        id="nomeProjeto"
        type="text"
        name="nomeProjeto"
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

export default FormNomeProjeto;
