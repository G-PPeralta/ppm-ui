import { useEffect, useState } from 'react';

import {
  FormControl,
  FormLabel,
  Select,
  useBreakpointValue,
} from '@chakra-ui/react';
import { TipoProjeto } from 'interfaces/Services';

import { TextError } from 'components/TextError';

import { getTipoProjeto } from 'services/get/Projetos';

function FormTipoProjeto(projectsForm: any) {
  const [tipoProjetoState, setTipoProjetoState] = useState<TipoProjeto[]>(
    [] as TipoProjeto[],
  );

  async function handleGetProjetos() {
    const reqGet = await getTipoProjeto();

    const dataReq: TipoProjeto[] = reqGet.data;

    setTipoProjetoState(dataReq);
  }

  useEffect(() => {
    handleGetProjetos();
  }, []);

  return (
    <FormControl>
      <FormLabel htmlFor="tipoProjetoId">TIPO</FormLabel>
      <Select
        id="tipoProjetoId"
        name="tipoProjetoId"
        value={projectsForm.projectsForm.values.tipoProjetoId}
        onChange={projectsForm.projectsForm.handleChange}
        w={useBreakpointValue({ base: '100%', md: '100%' })}
      >
        {tipoProjetoState.map((tipo) => (
          <option key={tipo.id} value={tipo.id}>
            {tipo.tipo}
          </option>
        ))}
      </Select>
      {projectsForm.projectsForm.errors.tipoProjetoId &&
        projectsForm.projectsForm.touched.tipoProjetoId && (
          <TextError>
            {projectsForm.projectsForm.errors.tipoProjetoId}
          </TextError>
        )}
    </FormControl>
  );
}

export default FormTipoProjeto;
