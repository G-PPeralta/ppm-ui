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
import { LocalProjeto } from 'interfaces/Services';

import { TextError } from 'components/TextError';

import { getLocalProjeto } from 'services/get/Projetos';
import { postNovoLocalProjeto } from 'services/post/AdicionarOpcaoSelect';

function FormLocal(projectsForm: any) {
  const [localProjetoState, setLocalProjetoState] = useState<LocalProjeto[]>(
    [] as LocalProjeto[],
  );
  const [loading, setLoading] = useState(true);
  const [novoLocalProjeto, setLocalProjeto] = useState('');

  async function handleGetProjetos() {
    const reqGet = await getLocalProjeto();

    const dataReq: LocalProjeto[] = reqGet.data;

    const outro: LocalProjeto = {
      id: dataReq.length + 2,
      local: 'Outro',
      deletado: false,
    };

    const polosComOutrosAoFinalArray: LocalProjeto[] = [...dataReq, outro];

    setLocalProjetoState(polosComOutrosAoFinalArray);
    setLoading(false);
  }

  function handleNovoPolo() {
    if (novoLocalProjeto !== '') {
      const novoPoloAdicionado: LocalProjeto = {
        id: localProjetoState.length + 1,
        local: novoLocalProjeto,
        deletado: false,
      };

      const polosSemOpcaoOutros = localProjetoState.filter(
        (local: LocalProjeto) => local.local !== 'Outro',
      );

      const poloComNovaOpcao: LocalProjeto[] = [
        ...polosSemOpcaoOutros,
        novoPoloAdicionado,
      ];

      const outro: LocalProjeto = {
        id: poloComNovaOpcao.length + 2,
        local: 'Outro',
        deletado: false,
      };

      const novoPoloState = [...poloComNovaOpcao, outro];

      setLocalProjetoState(novoPoloState);
      setLocalProjeto('');

      projectsForm.projectsForm.values.poloId = novoPoloAdicionado.id;

      postNovoLocalProjeto(novoPoloAdicionado);
    }
  }

  useEffect(() => {
    handleGetProjetos();
  }, []);

  return (
    <FormControl>
      {loading ? (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Ring speed={2} lineWeight={5} color="blue" size={24} />
        </Box>
      ) : (
        <>
          <FormLabel htmlFor="localId">LOCAL</FormLabel>
          {Number(projectsForm.projectsForm.values.localId) ===
          localProjetoState[localProjetoState.length - 1].id ? (
            <>
              <Flex alignItems={'center'}>
                <Input
                  isRequired
                  placeholder="Adicione o local"
                  id="addPolo"
                  type="text"
                  name="addPolo"
                  value={novoLocalProjeto}
                  onChange={(e) => setLocalProjeto(e.target.value)}
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
                  onClick={handleNovoPolo}
                />
              </Flex>
            </>
          ) : (
            <Select
              id="localId"
              name="localId"
              value={projectsForm.projectsForm.values.localId}
              onChange={projectsForm.projectsForm.handleChange}
              w={'95%'}
            >
              {localProjetoState.map((local) => (
                <option key={local.id} value={local.id}>
                  {local.local}
                </option>
              ))}
            </Select>
          )}
        </>
      )}
      {projectsForm.projectsForm.errors.localId &&
        projectsForm.projectsForm.touched.localId && (
          <TextError>{projectsForm.projectsForm.errors.localId}</TextError>
        )}
    </FormControl>
  );
}

export default FormLocal;
