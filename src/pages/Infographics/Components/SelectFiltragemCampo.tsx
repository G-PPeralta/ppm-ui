import Select from "react-select";

import { Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { ListaPoco } from "interfaces/CadastrosModaisInfograficos";

import { RequiredField } from "components/RequiredField/RequiredField";
import { TextError } from "components/TextError";

import { useCadastroIntervencao } from "hooks/useCadastroIntervencao";

function SelectFiltragemCampo({ registerForm }: any) {
  const { listaPocos } = useCadastroIntervencao();

  const options = listaPocos.map((poco: ListaPoco) => ({
    value: poco.poco,
    label: poco.poco,
  }));

  const handleChange = ({ value }: any, { name }: any) => {
    registerForm.setFieldValue(name, value);
  };

  return (
    <>
      <FormControl>
        <Flex gap={1}>
          <RequiredField />
          <FormLabel>CAMPO</FormLabel>
        </Flex>
        <Select
          id="campo_id"
          name="campo_id"
          placeholder="Selecione"
          onChange={(event, name) => handleChange(event, name)}
          options={options}
          isSearchable
        />
        {registerForm.errors.campo_id && (
          <TextError>{registerForm.errors.campo_id}</TextError>
        )}
      </FormControl>
    </>
  );
}

export default SelectFiltragemCampo;
