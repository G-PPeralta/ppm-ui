import { useEffect, useState } from 'react';

import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { Solicitante } from 'interfaces/Services';

import { TextError } from 'components/TextError';

import { getSolicitante } from 'services/get/Projetos';

function FormSolicitante(projectsForm: any) {
  const [solicitanteState, setSolicitanteState] = useState<Solicitante[]>(
    [] as Solicitante[],
  );

  async function handleGetProjetos() {
    const reqGet = await getSolicitante();

    const dataReq: Solicitante[] = reqGet.data;

    setSolicitanteState(dataReq);
  }

  useEffect(() => {
    handleGetProjetos();
  }, []);

  return (
    <FormControl>
      <FormLabel htmlFor="solicitanteId">SOLICITANTE</FormLabel>
      <Select
        id="solicitanteId"
        name="solicitanteId"
        value={projectsForm.projectsForm.values.solicitanteId}
        onChange={projectsForm.projectsForm.handleChange}
      >
        {solicitanteState.map((solicitante) => (
          <option key={solicitante.id} value={solicitante.id}>
            {solicitante.solicitante}
          </option>
        ))}
      </Select>
      {projectsForm.projectsForm.errors.solicitanteId &&
        projectsForm.projectsForm.touched.solicitanteId && (
          <TextError>
            {projectsForm.projectsForm.errors.solicitanteId}
          </TextError>
        )}
    </FormControl>
  );
}

export default FormSolicitante;
