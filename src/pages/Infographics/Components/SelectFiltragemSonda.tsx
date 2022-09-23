import Select from "react-select";

import { Flex, FormControl, FormLabel } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

import { useCadastroIntervencao } from "hooks/useCadastroIntervencao";

function SelectFiltragemSondas({ form, nomeChave, nomeLabel }: any) {
  const { listaSondas } = useCadastroIntervencao();

  const idOptions = listaSondas.map((sonda: any) => ({
    value: sonda.id_campanha,
    label: sonda.sonda,
  }));

  const nameOptions = listaSondas.map((sonda: any) => ({
    value: sonda.sonda,
    label: sonda.sonda,
  }));

  const handleChange = ({ value }: any, { name }: any) => {
    form.setFieldValue(name, value);
  };

  return (
    <>
      <FormControl>
        {nomeLabel === "SONDA" ? (
          <Flex gap={1}>
            <RequiredField />
            <FormLabel>SONDA</FormLabel>
          </Flex>
        ) : (
          <Flex gap={1}>
            <RequiredField />
            <FormLabel>NOME</FormLabel>
          </Flex>
        )}
        <Select
          id={nomeChave}
          name={nomeChave}
          placeholder="Selecione"
          onChange={(event, name) => handleChange(event, name)}
          options={nomeChave === "nom_campanha" ? nameOptions : idOptions}
          isSearchable
        />
      </FormControl>
    </>
  );
}

export default SelectFiltragemSondas;
