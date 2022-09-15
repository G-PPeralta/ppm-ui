import Select from 'react-select';

import { FormControl, FormLabel } from '@chakra-ui/react';
import { ListaPoco } from 'interfaces/CadastrosModaisInfograficos';

import { useCadastroIntervencao } from 'hooks/useCadastroIntervencao';

function SelectFiltragemPocos({ intervencaoForm }: any) {
  const { listaPocos } = useCadastroIntervencao();

  const options = listaPocos.map((poco: ListaPoco) => ({
    value: poco.id,
    label: poco.poco,
  }));

  const handleChange = ({ value }: any, { name }: any) => {
    intervencaoForm.setFieldValue(name, value);
  };

  return (
    <>
      <FormControl>
        <FormLabel>POÇO</FormLabel>
        <Select
          id="poco"
          name="poco"
          placeholder="Selecione"
          onChange={(event, name) => handleChange(event, name)}
          options={options}
          isSearchable
        />
      </FormControl>
    </>
  );
}

export default SelectFiltragemPocos;
