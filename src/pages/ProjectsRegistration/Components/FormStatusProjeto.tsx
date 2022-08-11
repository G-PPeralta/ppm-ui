import { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select,
} from '@chakra-ui/react';
import { Ring } from '@uiball/loaders';
import { StatusProjeto } from 'interfaces/Services';

import { TextError } from 'components/TextError';

import { getStatusProjeto } from 'services/get/Projetos';
import { postNovoStatusProjeto } from 'services/post/AdicionarOpcaoSelect';

function FormStatusProjeto(projectsForm: any) {
  const [statusProjetoState, setStatusProjetoState] = useState<StatusProjeto[]>(
    [] as StatusProjeto[],
  );

  // async function handleGetProjetos() {
  //   const reqGet = await getStatusProjeto();

  //   const dataReq: StatusProjeto[] = reqGet.data;

  //   setStatusProjetoState(dataReq);
  // }

  const [loading, setLoading] = useState(true);
  const [novaOpcao, setNovaOpcao] = useState('');

  async function handleGetProjetos() {
    const reqGet = await getStatusProjeto();

    const dataReq: StatusProjeto[] = reqGet.data;

    const outro: StatusProjeto = {
      id: dataReq.length + 2,
      status: 'Outro',
      deletado: false,
    };

    const comOutrosAoFinalArray: StatusProjeto[] = [...dataReq, outro];

    setStatusProjetoState(comOutrosAoFinalArray);
    setLoading(false);
  }

  function handleNovo() {
    if (novaOpcao !== '') {
      const novoAdicionado: StatusProjeto = {
        id: statusProjetoState.length + 1,
        status: novaOpcao,
        deletado: false,
      };

      const semOpcaoOutros = statusProjetoState.filter(
        (status: StatusProjeto) => status.status !== 'Outro',
      );

      const comNovaOpcao: StatusProjeto[] = [...semOpcaoOutros, novoAdicionado];

      const outro: StatusProjeto = {
        id: comNovaOpcao.length + 2,
        status: 'Outro',
        deletado: false,
      };

      const novoState = [...comNovaOpcao, outro];

      setStatusProjetoState(novoState);
      setNovaOpcao('');

      projectsForm.projectsForm.values.poloId = novoAdicionado.id;

      postNovoStatusProjeto(novoAdicionado);
    }
  }

  useEffect(() => {
    handleGetProjetos();
  }, []);

  return (
    <FormControl>
      {/* <FormLabel htmlFor="statusId">STATUS</FormLabel>
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
       */}
      {loading ? (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Ring speed={2} lineWeight={5} color="blue" size={24} />
        </Box>
      ) : (
        <>
          <FormLabel htmlFor="statusId">POLO</FormLabel>
          {Number(projectsForm.projectsForm.values.statusId) ===
          statusProjetoState[statusProjetoState.length - 1].id ? (
            <>
              <Flex alignItems={'center'}>
                <Input
                  isRequired
                  placeholder="Adicione o status"
                  id="add"
                  type="text"
                  name="add"
                  value={novaOpcao}
                  onChange={(e) => setNovaOpcao(e.target.value)}
                  mr={2}
                />
                <IconButton
                  aria-label="Plus sign"
                  icon={<BsPlusLg />}
                  background="origem.300"
                  variant="secondary"
                  color="white"
                  mr={2}
                  isRound={true}
                  size="sm"
                  onClick={handleNovo}
                />
              </Flex>
            </>
          ) : (
            <Select
              id="statusId"
              name="statusId"
              value={projectsForm.projectsForm.values.statusId}
              onChange={projectsForm.projectsForm.handleChange}
              w={'95%'}
            >
              {statusProjetoState.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.status}
                </option>
              ))}
            </Select>
          )}
        </>
      )}
      {projectsForm.projectsForm.errors.statusId &&
        projectsForm.projectsForm.touched.statusId && (
          <TextError>{projectsForm.projectsForm.errors.statusId}</TextError>
        )}
    </FormControl>
  );
}

export default FormStatusProjeto;
