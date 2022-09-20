import {
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";

import { TextError } from "components/TextError";

function FormElementoPep(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel htmlFor="elemento_pep">ELEMENTO PEP</FormLabel>
      <Input
        isRequired
        placeholder="Elemento PEP"
        id="elemento_pep"
        type="text"
        name="elemento_pep"
        value={projectsForm.projectsForm.values.elemento_pep}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: "100%", md: "100%" })}
      />
      {projectsForm.projectsForm.errors.elemento_pep &&
        projectsForm.projectsForm.touched.elemento_pep && (
          <TextError>{projectsForm.projectsForm.errors.elemento_pep}</TextError>
        )}
    </FormControl>
  );
}

export default FormElementoPep;
