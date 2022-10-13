import {
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
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
        style={{ fontSize: "12px", color: "#A7A7A7" }}
        htmlFor="nomeProjeto"
      >
        PROJETO
      </FormLabel>
      <Input
        isRequired
        placeholder="Nome do projeto"
        id="nomeProjeto"
        type="text"
        name="nomeProjeto"
        value={projectsForm.projectsForm.values.nomeProjeto}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: "100%", md: "95%" })}
        style={{ color: "#A7A7A7", fontSize: "14px" }}
      />
      {projectsForm.projectsForm.errors.nomeProjeto &&
        projectsForm.projectsForm.touched.nomeProjeto && (
          <TextError>{projectsForm.projectsForm.errors.nomeProjeto}</TextError>
        )}
    </FormControl>
  );
}

export default FormNomeProjeto;
