import Select from "react-select";

import { Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { ListaPoco } from "interfaces/CadastrosModaisInfograficos";

import { RequiredField } from "components/RequiredField/RequiredField";
import { TextError } from "components/TextError";

import { useCadastroIntervencao } from "hooks/useCadastroIntervencao";

function SelectFiltragemPocos({ intervencaoForm }: any) {
  const { listaPocos } = useCadastroIntervencao();

  const options = listaPocos.map((poco: ListaPoco) => ({
    value: poco.poco,
    label: poco.poco,
  }));

  const handleChange = ({ value }: any, { name }: any) => {
    intervencaoForm.setFieldValue(name, value);
  };

  return (
    <>
      <FormControl>
        <Flex gap={1}>
          <RequiredField />
          <FormLabel>POÇO</FormLabel>
        </Flex>
        <Select
          id="nom_atividade"
          name="nom_atividade"
          placeholder="Selecione"
          onChange={(event, name) => handleChange(event, name)}
          options={options}
          isSearchable
        />
        {intervencaoForm.errors.nom_atividade && (
          <TextError>{intervencaoForm.errors.nom_atividade}</TextError>
        )}
      </FormControl>
    </>
  );
}

export default SelectFiltragemPocos;
