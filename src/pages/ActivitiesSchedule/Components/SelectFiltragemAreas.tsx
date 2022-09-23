import Select from "react-select";

import { Flex, FormControl, FormLabel } from "@chakra-ui/react";
// import { ListaPoco } from "interfaces/CadastrosModaisInfograficos";

import { RequiredField } from "components/RequiredField/RequiredField";
import { TextError } from "components/TextError";

import { useCadastroAtividade } from "hooks/useCadastroAtividade";

function SelectFiltragemAreas({ registerForm }: any) {
  const { listaAreas } = useCadastroAtividade();

  const options = listaAreas.map((area: any) => ({
    value: area.id,
    label: area.nom_area,
  }));

  const handleChange = ({ value }: any, { name }: any) => {
    registerForm.setFieldValue(name, value);
  };

  return (
    <>
      <FormControl>
        <Flex gap={1}>
          <RequiredField />
          <FormLabel>ÁREA</FormLabel>
        </Flex>
        <Select
          id="id_area"
          name="id_area"
          placeholder="Selecione"
          onChange={(event, name) => handleChange(event, name)}
          options={options}
          isSearchable
        />
        {registerForm.errors.nom_area && (
          <TextError>{registerForm.errors.nom_area}</TextError>
        )}
      </FormControl>
    </>
  );
}

export default SelectFiltragemAreas;
