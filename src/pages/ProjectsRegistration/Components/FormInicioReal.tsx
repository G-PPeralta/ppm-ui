import {
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";

import { TextError } from "components/TextError";

function FormDataInicioReal(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel htmlFor="dataInicioReal">INÍCIO REAL</FormLabel>
      <Input
        isRequired
        placeholder="dd/mm/aaaa"
        id="dataInicioReal"
        type="date"
        name="dataInicioReal"
        value={projectsForm.projectsForm.values.dataInicioReal}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: "100%", md: "95%" })}
      />
      {projectsForm.projectsForm.errors.dataInicioReal &&
        projectsForm.projectsForm.touched.dataInicioReal && (
          <TextError>
            {projectsForm.projectsForm.errors.dataInicioReal}
          </TextError>
        )}
    </FormControl>
  );
}

export default FormDataInicioReal;
