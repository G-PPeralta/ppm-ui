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
import { Polo } from 'interfaces/Services';

import { TextError } from 'components/TextError';

import { getPolo } from 'services/get/Projetos';
import { postNovoPolo } from 'services/post/AdicionarOpcaoSelect';

function FormPolo(projectsForm: any) {
  const [poloState, setPoloState] = useState<Polo[]>([] as Polo[]);
  const [loading, setLoading] = useState(true);
  const [novoPolo, setNovoPolo] = useState('');

  async function handleGetProjetos() {
    const reqGet = await getPolo();

    const dataReq: Polo[] = reqGet.data;

    const outro: Polo = {
      id: dataReq.length + 2,
      polo: 'Outro',
      deletado: false,
    };

    const polosComOutrosAoFinalArray: Polo[] = [...dataReq, outro];

    setPoloState(polosComOutrosAoFinalArray);
    setLoading(false);
  }

  function handleNovoPolo() {
    if (novoPolo !== '') {
      const novoPoloAdicionado: Polo = {
        id: poloState.length + 1,
        polo: novoPolo,
        deletado: false,
      };

      const polosSemOpcaoOutros = poloState.filter(
        (polo: Polo) => polo.polo !== 'Outro',
      );

      const poloComNovaOpcao: Polo[] = [
        ...polosSemOpcaoOutros,
        novoPoloAdicionado,
      ];

      const outro: Polo = {
        id: poloComNovaOpcao.length + 2,
        polo: 'Outro',
        deletado: false,
      };

      const novoPoloState = [...poloComNovaOpcao, outro];

      setPoloState(novoPoloState);
      setNovoPolo('');

      projectsForm.projectsForm.values.poloId = novoPoloAdicionado.id;

      postNovoPolo(novoPoloAdicionado);
    }
  }

  useEffect(() => {
    handleGetProjetos();
  }, []);

  // console.log(poloState);

  return (
    <FormControl>
      {loading ? (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Ring speed={2} lineWeight={5} color="blue" size={24} />
        </Box>
      ) : (
        <>
          <FormLabel htmlFor="poloId">POLO</FormLabel>
          {Number(projectsForm.projectsForm.values.poloId) ===
          poloState[poloState.length - 1].id ? (
            <>
              <Flex alignItems={'center'}>
                <Input
                  isRequired
                  placeholder="Adicione o polo"
                  id="addPolo"
                  type="text"
                  name="addPolo"
                  value={novoPolo}
                  onChange={(e) => setNovoPolo(e.target.value)}
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
              id="poloId"
              name="poloId"
              value={projectsForm.projectsForm.values.poloId}
              onChange={projectsForm.projectsForm.handleChange}
              w={'95%'}
            >
              {poloState.map((polo) => (
                <option key={polo.id} value={polo.id}>
                  {polo.polo}
                </option>
              ))}
            </Select>
          )}
        </>
      )}

      {projectsForm.projectsForm.errors.poloId &&
        projectsForm.projectsForm.touched.poloId && (
          <TextError>{projectsForm.projectsForm.errors.poloId}</TextError>
        )}
    </FormControl>
  );
}

export default FormPolo;
