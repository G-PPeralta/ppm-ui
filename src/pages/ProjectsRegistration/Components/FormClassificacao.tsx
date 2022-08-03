import { useEffect, useState } from 'react';

import {
  FormControl,
  FormLabel,
  Select,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Classificacao } from 'interfaces/Services';

import { TextError } from 'components/TextError';

import { getClassificacao } from 'services/get/Projetos';

function FormClassificacao(projectsForm: any) {
  const [classificacaoState, setClassificacaoState] = useState<Classificacao[]>(
    [] as Classificacao[],
  );

  async function handleGetProjetos() {
    const reqGetClassificacao = await getClassificacao();

    const dataReqClassificacao: Classificacao[] = reqGetClassificacao.data;

    setClassificacaoState(dataReqClassificacao);
  }

  useEffect(() => {
    handleGetProjetos();
  }, []);

  return (
    <FormControl>
      <FormLabel htmlFor="classificacaoId">CLASSIFICAÇÃO</FormLabel>
      <Select
        id="classificacaoId"
        name="classificacaoId"
        value={projectsForm.projectsForm.values.classificacaoId}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: '100%', md: '95%' })}
      >
        {classificacaoState.map((classificacao) => (
          <option key={classificacao.id} value={classificacao.id}>
            {classificacao.classificacao}
          </option>
        ))}
      </Select>
      {projectsForm.projectsForm.errors.classificacaoId &&
        projectsForm.projectsForm.touched.classificacaoId && (
          <TextError>
            {projectsForm.projectsForm.errors.classificacaoId}
          </TextError>
        )}
    </FormControl>
  );
}

export default FormClassificacao;
