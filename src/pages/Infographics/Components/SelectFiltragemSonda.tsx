import Select from "react-select";

import { FormControl, FormLabel } from "@chakra-ui/react";

import { useCadastroIntervencao } from "hooks/useCadastroIntervencao";

function SelectFiltragemSondas({ intervencaoForm }: any) {
  const { listaSondas } = useCadastroIntervencao();

  const options = listaSondas.map((sonda: any) => ({
    value: sonda.id_campanha,
    label: sonda.sonda,
  }));

  const handleChange = ({ value }: any, { name }: any) => {
    intervencaoForm.setFieldValue(name, value);
  };

  return (
    <>
      <FormControl>
        <FormLabel>SONDA</FormLabel>
        <Select
          id="id_campanha"
          name="id_campanha"
          placeholder="Selecione"
          onChange={(event, name) => handleChange(event, name)}
          options={options}
          isSearchable
        />
      </FormControl>
    </>
  );
}

export default SelectFiltragemSondas;
