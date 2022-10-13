import {
  FormControl,
  FormLabel,
  Textarea,
  useBreakpointValue,
} from "@chakra-ui/react";

import { TextError } from "components/TextError";

function FormDescricao(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel
        style={{ fontSize: "12px", color: "#A7A7A7" }}
        htmlFor="descricao"
      >
        DESCRIÇÃO
      </FormLabel>
      <Textarea
        isRequired
        placeholder="Aquisição e instalação"
        id="descricao"
        name="descricao"
        maxLength={15}
        value={projectsForm.projectsForm.values.descricao}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: "100%", md: "95%" })}
        style={{ color: "#A7A7A7", fontSize: "14px" }}
      />
      {projectsForm.projectsForm.errors.descricao &&
        projectsForm.projectsForm.touched.descricao && (
          <TextError>{projectsForm.projectsForm.errors.descricao}</TextError>
        )}
    </FormControl>
  );
}

export default FormDescricao;
