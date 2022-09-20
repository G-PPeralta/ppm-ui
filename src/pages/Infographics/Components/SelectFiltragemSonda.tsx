import Select from "react-select";

import { FormControl, FormLabel } from "@chakra-ui/react";

import { useCadastroIntervencao } from "hooks/useCadastroIntervencao";

function SelectFiltragemSondas({ form, nomeChave }: any) {
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
        {nomeChave === "id_campanha" ? (
          <FormLabel>SONDA</FormLabel>
        ) : (
          <FormLabel>NOME CAMPANHA/SONDA</FormLabel>
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
