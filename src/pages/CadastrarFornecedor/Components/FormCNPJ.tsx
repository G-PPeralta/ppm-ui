import {
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";

import { TextError } from "components/TextError";

function FormCNPJ(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel htmlFor="cnpj">CNPJ</FormLabel>
      <Input
        isRequired
        placeholder="00.000.000/0000-00"
        id="cnpj"
        type="text"
        name="cnpj"
        value={projectsForm.projectsForm.values.nomeProjeto}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: "100%", md: "100%" })}
      />
      {projectsForm.projectsForm.errors.nomeProjeto &&
        projectsForm.projectsForm.touched.nomeProjeto && (
          <TextError>{projectsForm.projectsForm.errors.nomeProjeto}</TextError>
        )}
    </FormControl>
  );
}

export default FormCNPJ;
