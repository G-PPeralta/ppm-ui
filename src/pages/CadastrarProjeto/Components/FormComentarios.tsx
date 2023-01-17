//  CRIADO EM: 07/2022
//  AUTOR: Eduardo Muchak, Bruno Fracaro
//  DESCRIÇÃO DO ARQUIVO: Input de comentários.

import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";

import { TextError } from "components/TextError";

function FormComentarios(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel
        htmlFor="comentarios"
        fontSize={"12px"}
        fontWeight={"700"}
        color={"#949494"}
      >
        COMENTÁRIOS
      </FormLabel>
      <Textarea
        isRequired
        placeholder="Escreva um comentário"
        id="comentarios"
        name="comentarios"
        value={projectsForm.projectsForm.values.comentarios}
        onChange={projectsForm.projectsForm.handleChange}
        maxLength={100}
        mt={"-9px"}
        h={"56px"}
        w={"100%"}
        fontSize={"14px"}
        fontWeight={"400"}
      />
      {projectsForm.projectsForm.errors.comentarios &&
        projectsForm.projectsForm.touched.comentarios && (
          <TextError>{projectsForm.projectsForm.errors.comentarios}</TextError>
        )}
    </FormControl>
  );
}

export default FormComentarios;
