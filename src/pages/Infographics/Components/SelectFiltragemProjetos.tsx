import Select from 'react-select';

import { FormControl, FormLabel } from '@chakra-ui/react';
import { ListaSonda } from 'interfaces/CadastrosModaisInfograficos';

import { useCadastroIntervencao } from 'hooks/useCadastroIntervencao';

function SelectFiltragemProjetos({ intervencaoForm }: any) {
  const { listaProjetosTipo } = useCadastroIntervencao();

  const options = listaProjetosTipo.map((projeto: ListaSonda) => ({
    value: projeto.id,
    label: projeto.nome,
  }));

  const handleChange = (event: any, { name }: any) => {
    // event.value = id do projeto
    // event.label = nome do projeto
    intervencaoForm.setFieldValue(name, event.value);
  };

  return (
    <>
      <FormControl>
        <FormLabel>PROJETO TIPO</FormLabel>
        <Select
          id="projetoId"
          name="projetoId"
          placeholder="Selecione"
          onChange={(event, name) => handleChange(event, name)}
          options={options}
          isSearchable
        />
      </FormControl>
    </>
  );
}

export default SelectFiltragemProjetos;
