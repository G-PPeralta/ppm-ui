import { useEffect, useState } from 'react';

import {
  FormControl,
  FormLabel,
  Select,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Gate } from 'interfaces/Services';

import { TextError } from 'components/TextError';

import { getGate } from 'services/get/Projetos';

function FormGate(projectsForm: any) {
  const [gateState, setGateState] = useState<Gate[]>([] as Gate[]);

  async function handleGetProjetos() {
    const reqGet = await getGate();

    const dataReq: Gate[] = reqGet.data;

    setGateState(dataReq);
  }

  useEffect(() => {
    handleGetProjetos();
  }, []);

  return (
    <FormControl>
      <FormLabel htmlFor="gateId">GATE</FormLabel>
      <Select
        id="gateId"
        name="gateId"
        value={projectsForm.projectsForm.values.gateId}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: '100%', md: '95%' })}
      >
        {gateState.map((gate) => (
          <option key={gate.id} value={gate.id}>
            {gate.gate}
          </option>
        ))}
      </Select>
      {projectsForm.projectsForm.errors.gateId &&
        projectsForm.projectsForm.touched.gateId && (
          <TextError>{projectsForm.projectsForm.errors.gateId}</TextError>
        )}
    </FormControl>
  );
}

export default FormGate;
