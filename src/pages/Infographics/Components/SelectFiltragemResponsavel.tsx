import Select from "react-select";

import { Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { Responsavel } from "interfaces/CadastrosModaisInfograficos";

import { RequiredField } from "components/RequiredField/RequiredField";
import { TextError } from "components/TextError";

import { useCadastroAtividade } from "hooks/useCadastroAtividade";

function SelectFiltragemResponsavel({ registerForm }: any) {
  const { listaResponsaveis } = useCadastroAtividade();

  const options = listaResponsaveis.map((responsavel: Responsavel) => ({
    value: responsavel.id,
    label: responsavel.nome,
  }));

  const handleChange = ({ value }: any, { name }: any) => {
    registerForm.setFieldValue(name, value);
  };

  return (
    <>
      <FormControl>
        <Flex gap={1}>
          <RequiredField />
          <FormLabel htmlFor="responsavel_id">RESPONSAVEL</FormLabel>
        </Flex>
        <Select
          id="responsavel_id"
          name="responsavel_id"
          placeholder="Selecione"
          onChange={(event, name) => handleChange(event, name)}
          options={options}
          isSearchable
        />
        {registerForm.errors.responsavel && (
          <TextError>{registerForm.errors.responsavel}</TextError>
        )}
      </FormControl>
    </>
  );
}

export default SelectFiltragemResponsavel;
