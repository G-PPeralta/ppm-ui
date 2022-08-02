import { useEffect, useState } from 'react';

import {
  FormControl,
  FormLabel,
  Select,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Demanda } from 'interfaces/Services';

import { TextError } from 'components/TextError';

import { getDemanda } from 'services/get/Projetos';

function FormDemanda(projectsForm: any) {
  const [demandaState, setDemandaState] = useState<Demanda[]>([] as Demanda[]);

  async function handleGetProjetos() {
    const reqGet = await getDemanda();

    const dataReq: Demanda[] = reqGet.data;

    setDemandaState(dataReq);
  }

  useEffect(() => {
    handleGetProjetos();
  }, []);

  return (
    <FormControl>
      <FormLabel htmlFor="demandaId">DEMANDA</FormLabel>
      <Select
        id="demandaId"
        name="demandaId"
        value={projectsForm.projectsForm.values.demandaId}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: '100%', md: '100%' })}
      >
        {demandaState.map((demanda) => (
          <option key={demanda.id} value={demanda.id}>
            {demanda.demanda}
          </option>
        ))}
      </Select>
      {projectsForm.projectsForm.errors.demandaId &&
        projectsForm.projectsForm.touched.demandaId && (
          <TextError>{projectsForm.projectsForm.errors.demandaId}</TextError>
        )}
    </FormControl>
  );
}

export default FormDemanda;
