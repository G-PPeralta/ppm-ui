import Select from "react-select";

import { Flex, FormControl, FormLabel } from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

import { useCadastroCampanha } from "hooks/useCadastroCampanha";

function SelectFiltragemSondas({ form, nomeChave, nomeLabel }: any) {
  const { listaSondas } = useCadastroCampanha();

  const idOptions = listaSondas.map((sonda: any) => ({
    value: sonda.id,
    label: sonda.nom_sonda,
  }));

  const nameOptions = listaSondas.map((sonda: any) => ({
    value: sonda.nom_sonda,
    label: sonda.nom_sonda,
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
