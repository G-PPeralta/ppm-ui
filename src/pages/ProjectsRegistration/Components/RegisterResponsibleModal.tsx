import { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Input,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { TipoResponsavel } from 'interfaces/Services';

import { TextError } from 'components/TextError';

import { useProjects } from 'hooks/useProjects';

import { getTipoResponsavel } from 'services/get/Projetos';

export function RegisterResponsibleModal() {
  const [numberOfResponsibles, setNumberOfResponsibles] = useState([1]);
  const [tipoResponsavel, setTipoResponsavel] = useState<TipoResponsavel[]>(
    [] as TipoResponsavel[],
  );
  const [loading, setLoading] = useState(true);
  const { projectsForm } = useProjects();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log(projectsForm.values.nomeResponsavel);
  }, [projectsForm.values]);

  function addResponsible() {
    setNumberOfResponsibles([
      ...numberOfResponsibles,
      numberOfResponsibles.length + 1,
    ]);
  }

  async function handleGetTipoResponsavel() {
    const { data } = await getTipoResponsavel();
    const dataReqTipoResponsavel: TipoResponsavel[] = data;
    if (!dataReqTipoResponsavel) {
      return null;
    }
    setTipoResponsavel(dataReqTipoResponsavel);
    setLoading(false);
  }

  useEffect(() => {
    handleGetTipoResponsavel();
  }, []);

  return (
    <>
      <Flex align="center">
        <IconButton
          aria-label="Plus sign"
          icon={<BsPlusLg />}
          onClick={onOpen}
          background="origem.300"
          variant="primary"
          color="white"
          mr={2}
          isRound={true}
          size="sm"
          _hover={{
            background: 'origem.500',
            transition: 'all 0.4s',
          }}
        />
        <h2>CADASTRAR RESPONSÁVEL </h2>
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>CADASTRAR RESPONSÁVEL</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {numberOfResponsibles.map((responsible) => (
                <Flex align="end" mb={3} key={responsible}>
                  <FormControl>
                    <FormLabel htmlFor="nomeResponsavel">NOME</FormLabel>
                    <Input
                      isRequired
                      placeholder="Nome do responsável"
                      id="nomeResponsavel"
                      type="text"
                      name="nomeResponsavel"
                      value={projectsForm.values.nomeResponsavel}
                      onChange={projectsForm.handleChange}
                      width="95%"
                    />
                    {projectsForm.errors.nomeResponsavel &&
                      projectsForm.touched.nomeResponsavel && (
                        <TextError>
                          {projectsForm.errors.nomeResponsavel}
                        </TextError>
                      )}
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="tipoResponsavel">TIPO</FormLabel>
                    {!loading && (
                      <Select
                        id="tipoResponsavel"
                        name="tipoResponsavel"
                        value={projectsForm.values.tipoResponsavel}
                        onChange={projectsForm.handleChange}
                        width="95%"
                      >
                        {tipoResponsavel.map((tipo) => (
                          <option key={tipo.id}>{tipo.tipo_responsavel}</option>
                        ))}
                      </Select>
                    )}
                    {projectsForm.errors.tipoResponsavel &&
                      projectsForm.touched.tipoResponsavel && (
                        <TextError>
                          {projectsForm.errors.tipoResponsavel}
                        </TextError>
                      )}
                  </FormControl>
                </Flex>
              ))}
              <Flex
                flexDirection={useBreakpointValue({
                  base: 'column',
                  md: 'row',
                })}
              >
                <Button
                  onClick={addResponsible}
                  background="origem.300"
                  variant="primary"
                  color="white"
                  mb={1}
                  size="sm"
                  _hover={{
                    background: 'origem.500',
                    transition: 'all 0.4s',
                  }}
                >
                  Adicionar Outro Responsável
                </Button>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                background="origem.300"
                variant="primary"
                color="white"
                onClick={onClose}
                _hover={{
                  background: 'origem.500',
                  transition: 'all 0.4s',
                }}
              >
                Salvar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
}
