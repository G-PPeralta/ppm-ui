import { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';

import {
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select,
} from '@chakra-ui/react';
import { Polo } from 'interfaces/Services';

import { TextError } from 'components/TextError';

import { getPolo } from 'services/get/Projetos';

function FormPolo(projectsForm: any) {
  const [poloState, setPoloState] = useState<Polo[]>([] as Polo[]);
  const [loading, setLoading] = useState(true);
  const [novoPolo, setNovoPolo] = useState('');

  async function handleGetProjetos() {
    const reqGet = await getPolo();

    const dataReq: Polo[] = reqGet.data;

    const outro: Polo = {
      id: dataReq.length + 1,
      polo: 'Outro',
      deletado: false,
    };

    const testeComOutro: Polo[] = [...dataReq, outro];

    setPoloState(testeComOutro);
    setLoading(false);
  }

  function handleNovoPolo() {
    if (novoPolo !== '') {
      const novo: Polo = {
        id: poloState.length + 1,
        polo: novoPolo,
        deletado: false,
      };

      const testeComNovo: Polo[] = [novo, ...poloState];

      setPoloState(testeComNovo);
      setNovoPolo('');

      projectsForm.projectsForm.values.poloId = novo.id;
    }
  }

  useEffect(() => {
    handleGetProjetos();
  }, []);

  return (
    <FormControl>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <>
          <FormLabel htmlFor="poloId">POLO</FormLabel>
          {Number(projectsForm.projectsForm.values.poloId) ===
          poloState[poloState.length - 1].id ? (
            <>
              <Flex alignItems={'center'}>
                <Input
                  isRequired
                  placeholder="Novo Polo"
                  id="nomeProjeto"
                  type="text"
                  name="nomeProjeto"
                  value={novoPolo}
                  onChange={(e) => setNovoPolo(e.target.value)}
                  w={'90%'}
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
