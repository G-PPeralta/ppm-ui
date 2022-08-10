import { useEffect, useState } from 'react';

import {
  FormControl,
  FormLabel,
  Select,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Divisao } from 'interfaces/Services';

import { TextError } from 'components/TextError';

import { getDivisao } from 'services/get/Projetos';

function FormDivisao(projectsForm: any) {
  const [divisaoState, setDivisaoState] = useState<Divisao[]>([] as Divisao[]);

  async function handleGetProjetos() {
    const reqGet = await getDivisao();

    const dataReq: Divisao[] = reqGet.data;

    setDivisaoState(dataReq);
  }

  useEffect(() => {
    handleGetProjetos();
  }, []);

  return (
    <FormControl>
      <FormLabel htmlFor="divisaoId">DIVISÃO</FormLabel>
      <Select
        id="divisaoId"
        name="divisaoId"
        value={projectsForm.projectsForm.values.divisaoId}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: '100%', md: '95%' })}
      >
        {divisaoState.map((divisao) => (
          <option key={divisao.id} value={divisao.id}>
            {divisao.divisao}
          </option>
        ))}
      </Select>
      {projectsForm.projectsForm.errors.divisaoId &&
        projectsForm.projectsForm.touched.divisaoId && (
          <TextError>{projectsForm.projectsForm.errors.divisaoId}</TextError>
        )}
    </FormControl>
  );
}

export default FormDivisao;
