import { useEffect, useState } from 'react';

import {
  FormControl,
  FormLabel,
  Select,
  useBreakpointValue,
} from '@chakra-ui/react';
import { LocalProjeto } from 'interfaces/Services';

import { TextError } from 'components/TextError';

import { getLocalProjeto } from 'services/get/Projetos';

function FormLocal(projectsForm: any) {
  const [localProjetoState, setLocalProjetoState] = useState<LocalProjeto[]>(
    [] as LocalProjeto[],
  );

  async function handleGetProjetos() {
    const reqGet = await getLocalProjeto();

    const dataReq: LocalProjeto[] = reqGet.data;

    setLocalProjetoState(dataReq);
  }

  useEffect(() => {
    handleGetProjetos();
  }, []);

  return (
    <FormControl>
      <FormLabel htmlFor="localId">LOCAL</FormLabel>
      <Select
        id="localId"
        name="localId"
        value={projectsForm.projectsForm.values.localId}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: '100%', md: '95%' })}
      >
        {localProjetoState.map((local) => (
          <option key={local.id} value={local.id}>
            {local.local}
          </option>
        ))}
      </Select>
      {projectsForm.projectsForm.errors.localId &&
        projectsForm.projectsForm.touched.localId && (
          <TextError>{projectsForm.projectsForm.errors.localId}</TextError>
        )}
    </FormControl>
  );
}

export default FormLocal;
