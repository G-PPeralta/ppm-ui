import Select from "react-select";

import { Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { ListaPoco } from "interfaces/CadastrosModaisInfograficos";

import { RequiredField } from "components/RequiredField/RequiredField";
import { TextError } from "components/TextError";

import { useCadastroIntervencao } from "hooks/useCadastroIntervencao";

function SelectFiltragemPocos({ registerForm }: any) {
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
          <FormLabel>POÇO</FormLabel>
        </Flex>
        <Select
          id="poco_id"
          name="poco_id"
          placeholder="Selecione"
          onChange={(event, name) => handleChange(event, name)}
          options={options}
          isSearchable
        />
        {registerForm.errors.poco_id && (
          <TextError>{registerForm.errors.poco_id}</TextError>
        )}
      </FormControl>
    </>
  );
}

export default SelectFiltragemPocos;
