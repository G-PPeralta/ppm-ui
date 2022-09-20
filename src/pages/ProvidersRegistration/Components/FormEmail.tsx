import {
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";

import { TextError } from "components/TextError";

function FormEmail(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel htmlFor="email">EMAIL</FormLabel>
      <Input
        isRequired
        placeholder="email@email.com"
        id="email"
        type="text"
        name="email"
        value={projectsForm.projectsForm.values.nomeProjeto}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: "100%", md: "95%" })}
      />
      {projectsForm.projectsForm.errors.nomeProjeto &&
        projectsForm.projectsForm.touched.nomeProjeto && (
          <TextError>{projectsForm.projectsForm.errors.nomeProjeto}</TextError>
        )}
    </FormControl>
  );
}

export default FormEmail;
