//  CRIADO EM: 07/2022
//  AUTOR: Eduardo Muchak, Bruno Fracaro
//  DESCRIÇÃO DO ARQUIVO: Input de elemento pep.

import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import { TextError } from "components/TextError";

function FormElementoPep(projectsForm: any) {
  return (
    <FormControl>
      <FormLabel
        htmlFor="elemento_pep"
        fontSize={"12px"}
        fontWeight={"700"}
        color={"#949494"}
      >
        ELEMENTO PEP
      </FormLabel>
      <Input
        maxLength={30}
        isRequired
        placeholder="Elemento PEP"
        id="elemento_pep"
        type="text"
        name="elemento_pep"
        value={projectsForm.projectsForm.values.elemento_pep}
        onChange={projectsForm.projectsForm.handleChange}
        mt={"-9px"}
        h={"56px"}
        w={"50%"}
        border={"solid 1px #949494"}
        fontSize={"14px"}
        fontWeight={"400"}
      />
      {projectsForm.projectsForm.errors.elemento_pep &&
        projectsForm.projectsForm.touched.elemento_pep && (
          <TextError>{projectsForm.projectsForm.errors.elemento_pep}</TextError>
        )}
    </FormControl>
  );
}

export default FormElementoPep;
