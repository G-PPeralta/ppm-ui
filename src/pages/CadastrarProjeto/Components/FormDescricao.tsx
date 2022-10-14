import {
  FormControl,
  FormLabel,
  Textarea,
  // useBreakpointValue,
} from "@chakra-ui/react";

import { TextError } from "components/TextError";

function FormDescricao(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel
        fontSize={"12px"}
        fontWeight={"700"}
        color={"#949494"}
        htmlFor="descricao"
      >
        DESCRIÇÃO
      </FormLabel>
      <Textarea
        isRequired
        placeholder="Escreva a descrição do projeto"
        id="descricao"
        name="descricao"
        maxLength={100}
        value={projectsForm.projectsForm.values.descricao}
        onChange={projectsForm.projectsForm.handleChange}
        mt={"-9px"}
        h={"56px"}
        w={"100%"}
        fontSize={"14px"}
        fontWeight={"400"}
      />
      {projectsForm.projectsForm.errors.descricao &&
        projectsForm.projectsForm.touched.descricao && (
          <TextError>{projectsForm.projectsForm.errors.descricao}</TextError>
        )}
    </FormControl>
  );
}

export default FormDescricao;
