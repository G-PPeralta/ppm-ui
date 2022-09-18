import Select from "react-select";

import { FormControl, FormLabel } from "@chakra-ui/react";
import { ListaSonda } from "interfaces/CadastrosModaisInfograficos";

import { useCadastroIntervencao } from "hooks/useCadastroIntervencao";

function SelectFiltragemSondas({ intervencaoForm }: any) {
  const { listaSondas } = useCadastroIntervencao();

  const options = listaSondas.map((sonda: ListaSonda) => ({
    value: sonda.id,
    label: sonda.nome,
  }));

  const handleChange = ({ value }: any, { name }: any) => {
    intervencaoForm.setFieldValue(name, value);
  };

  return (
    <>
      <FormControl>
        <FormLabel>SONDA</FormLabel>
        <Select
          id="sonda"
          name="sonda"
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
