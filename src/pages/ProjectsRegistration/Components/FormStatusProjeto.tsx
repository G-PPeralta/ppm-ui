import { useEffect, useState } from 'react';

import {
  FormControl,
  FormLabel,
  Select,
  useBreakpointValue,
} from '@chakra-ui/react';
import { StatusProjeto } from 'interfaces/Services';

import { TextError } from 'components/TextError';

import { getStatusProjeto } from 'services/get/Projetos';

function FormStatusProjeto(projectsForm: any) {
  const [statusProjetoState, setStatusProjetoState] = useState<StatusProjeto[]>(
    [] as StatusProjeto[],
  );

  async function handleGetProjetos() {
    const reqGet = await getStatusProjeto();

    const dataReq: StatusProjeto[] = reqGet.data;

    setStatusProjetoState(dataReq);
  }

  useEffect(() => {
    handleGetProjetos();
  }, []);

  return (
    <FormControl>
      <FormLabel htmlFor="statusId">STATUS</FormLabel>
      <Select
        id="statusId"
        name="statusId"
        value={projectsForm.projectsForm.values.statusId}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: '100%', md: '100%' })}
      >
        {statusProjetoState.map((status) => (
          <option key={status.id} value={status.id}>
            {status.status}
          </option>
        ))}
      </Select>
      {projectsForm.projectsForm.errors.statusId &&
        projectsForm.projectsForm.touched.statusId && (
          <TextError>{projectsForm.projectsForm.errors.statusId}</TextError>
        )}
    </FormControl>
  );
}

export default FormStatusProjeto;
