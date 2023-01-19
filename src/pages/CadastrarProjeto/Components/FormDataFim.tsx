//  CRIADO EM: 07/2022
//  AUTOR: Eduardo Muchak, Bruno Fracaro
//  DESCRIÇÃO DO ARQUIVO: Input de data final.

import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import { TextError } from "components/TextError";

function FormDataFim(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel
        fontSize={"12px"}
        fontWeight={"700"}
        color={"#949494"}
        htmlFor="dataFim"
      >
        FIM
      </FormLabel>
      <Input
        max="9999-12-31"
        maxLength={1}
        isRequired
        placeholder="dd/mm/aaaa"
        id="dataFim"
        type="date"
        name="dataFim"
        value={projectsForm.projectsForm.values.dataFim}
        onChange={projectsForm.projectsForm.handleChange}
        mt={"-9px"}
        h={"56px"}
        w={"30%"}
        border={"solid 1px #949494"}
        fontSize={"14px"}
        fontWeight={"400"}
      />
      {projectsForm.projectsForm.errors.dataFim &&
        projectsForm.projectsForm.touched.dataFim && (
          <TextError> {projectsForm.projectsForm.errors.dataFim}</TextError>
        )}
    </FormControl>
  );
}

export default FormDataFim;
