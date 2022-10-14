import {
  FormControl,
  FormLabel,
  Textarea,
  useBreakpointValue,
} from "@chakra-ui/react";

import { TextError } from "components/TextError";

function FormOutrasInformacoes(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel htmlFor="outrasInformacoes">OUTRAS INFORMAÇÕES</FormLabel>
      <Textarea
        isRequired
        placeholder="Adicione outras informações sobre o fornecedor"
        id="outrasInformacoes"
        name="outrasInformacoes"
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

export default FormOutrasInformacoes;
