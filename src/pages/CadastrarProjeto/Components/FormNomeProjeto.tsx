import {
  FormControl,
  FormLabel,
  Input,
  // useBreakpointValue,
} from "@chakra-ui/react";
// import { FormikProps } from 'formik';
// import { RegisterProjectProps } from 'interfaces/Services';

import { TextError } from "components/TextError";

function FormNomeProjeto(projectsForm: any) {
  // useEffect(() => {
  //   console.log(projectsForm.projectsForm);
  // }, [projectsForm]);
  return (
    <FormControl>
      <FormLabel
        fontSize={"12px"}
        fontWeight={"700"}
        color={"#949494"}
        htmlFor="nomeProjeto"
      >
        NOME DO PROJETO
      </FormLabel>
      <Input
        maxLength={80}
        isRequired
        placeholder="Nome do projeto"
        id="nomeProjeto"
        type="text"
        name="nomeProjeto"
        value={projectsForm.projectsForm.values.nomeProjeto}
        onChange={projectsForm.projectsForm.handleChange}
        mt={"-9px"}
        h={"56px"}
        w={"100%"}
        fontSize={"14px"}
        fontWeight={"400"}
      />
      {projectsForm.projectsForm.errors.nomeProjeto &&
        projectsForm.projectsForm.touched.nomeProjeto && (
          <TextError>{projectsForm.projectsForm.errors.nomeProjeto}</TextError>
        )}
    </FormControl>
  );
}

export default FormNomeProjeto;
