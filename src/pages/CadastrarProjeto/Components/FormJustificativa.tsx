//  CRIADO EM: 07/2022
//  AUTOR: Eduardo Muchak, Bruno Fracaro
//  DESCRIÇÃO DO ARQUIVO: Input de justificativa.

import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";

import { TextError } from "components/TextError";

function FormJustificativa(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel
        fontSize={"12px"}
        fontWeight={"700"}
        color={"#949494"}
        htmlFor="justificativa"
      >
        JUSTIFICATIVA
      </FormLabel>
      <Textarea
        isRequired
        placeholder="Escreva a justificativa do projeto"
        id="justificativa"
        name="justificativa"
        value={projectsForm.projectsForm.values.justificativa}
        onChange={projectsForm.projectsForm.handleChange}
        maxLength={100}
        mt={"-9px"}
        h={"56px"}
        w={"100%"}
        fontSize={"14px"}
        fontWeight={"400"}
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
