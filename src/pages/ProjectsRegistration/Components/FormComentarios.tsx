import {
  FormControl,
  FormLabel,
  Textarea,
  useBreakpointValue,
} from "@chakra-ui/react";

import { TextError } from "components/TextError";

function FormComentarios(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel
        htmlFor="comentarios"
        style={{ fontSize: "12px", color: "#A7A7A7" }}
      >
        COMENTÁRIOS
      </FormLabel>
      <Textarea
        isRequired
        placeholder="Adicione comentários sobre o projeto"
        id="comentarios"
        name="comentarios"
        value={projectsForm.projectsForm.values.comentarios}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: "100%", md: "100%" })}
        style={{ color: "#A7A7A7", fontSize: "14px" }}
      />
      {projectsForm.projectsForm.errors.comentarios &&
        projectsForm.projectsForm.touched.comentarios && (
          <TextError>{projectsForm.projectsForm.errors.comentarios}</TextError>
        )}
    </FormControl>
  );
}

export default FormComentarios;
