import {
  FormControl,
  FormLabel,
  Textarea,
  useBreakpointValue,
} from "@chakra-ui/react";

import { TextError } from "components/TextError";

function FormJustificativa(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel
        style={{ fontSize: "12px", color: "#A7A7A7" }}
        htmlFor="justificativa"
      >
        JUSTIFICATIVA
      </FormLabel>
      <Textarea
        isRequired
        placeholder="Sistema necessário para medição e entrega de gás."
        id="justificativa"
        name="justificativa"
        value={projectsForm.projectsForm.values.justificativa}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: "100%", md: "100%" })}
        style={{ color: "#A7A7A7", fontSize: "14px" }}
      />
      {projectsForm.projectsForm.errors.justificativa &&
        projectsForm.projectsForm.touched.justificativa && (
          <TextError>
            {projectsForm.projectsForm.errors.justificativa}
          </TextError>
        )}
    </FormControl>
  );
}

export default FormJustificativa;
