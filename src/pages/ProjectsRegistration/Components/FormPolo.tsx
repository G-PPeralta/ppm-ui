import { useEffect, useState } from 'react';

import {
  FormControl,
  FormLabel,
  Select,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Polo } from 'interfaces/Services';

import { TextError } from 'components/TextError';

import { getPolo } from 'services/get/Projetos';

function FormPolo(projectsForm: any) {
  const [poloState, setPoloState] = useState<Polo[]>([] as Polo[]);

  async function handleGetProjetos() {
    const reqGet = await getPolo();

    const dataReq: Polo[] = reqGet.data;

    setPoloState(dataReq);
  }

  useEffect(() => {
    handleGetProjetos();
  }, []);

  return (
    <FormControl>
      <FormLabel htmlFor="poloId">POLO</FormLabel>
      <Select
        id="poloId"
        name="poloId"
        value={projectsForm.projectsForm.values.poloId}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: '100%', md: '95%' })}
      >
        {poloState.map((polo) => (
          <option key={polo.id} value={polo.id}>
            {polo.polo}
          </option>
        ))}
      </Select>
      {projectsForm.projectsForm.errors.poloId &&
        projectsForm.projectsForm.touched.poloId && (
          <TextError>{projectsForm.projectsForm.errors.poloId}</TextError>
        )}
    </FormControl>
  );
}

export default FormPolo;
