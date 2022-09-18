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
      <FormLabel htmlFor="comentarios">COMENTÁRIOS</FormLabel>
      <Textarea
        isRequired
        placeholder="Adicione comentários sobre o projeto"
        id="comentarios"
        name="comentarios"
        value={projectsForm.projectsForm.values.comentarios}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: "100%", md: "100%" })}
      />
      {projectsForm.projectsForm.errors.comentarios &&
        projectsForm.projectsForm.touched.comentarios && (
          <TextError>{projectsForm.projectsForm.errors.comentarios}</TextError>
        )}
    </FormControl>
  );
}

export default FormComentarios;
