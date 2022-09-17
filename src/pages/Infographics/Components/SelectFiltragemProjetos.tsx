import { useEffect } from 'react';
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

  useEffect(() => {
    if (intervencaoForm.values.tipoProjetoId) {
      const projeto = listaProjetosTipo.find(
        (projeto: any) => projeto.id === intervencaoForm.values.tipoProjetoId,
      );

      let contador = 0;

      if (projeto) {
        const listaAtividades = projeto.atividades.map((projeto: any) => ({
          ordem: (contador += 1),
          atividadeId: projeto.atividade.id,
          responsavel: '',
        }));
        intervencaoForm.setFieldValue('atividades', listaAtividades);
      }
    }
  }, [intervencaoForm.values.tipoProjetoId]);

  return (
    <>
      <FormControl>
        <FormLabel>PROJETO TIPO</FormLabel>
        <Select
          id="tipoProjetoId"
          name="tipoProjetoId"
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
