import { useState, useEffect } from 'react';
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
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { TipoResponsavel } from 'interfaces/Services';

import { TextError } from 'components/TextError';

import { getTipoResponsavel } from 'services/get/Projetos';

export function RegisterResponsibleModal(projectsForm: any) {
  const [numeroDeResponsaveis, setNumeroDeResponsaveis] = useState([
    {
      nomeResponsavel: '',
      tipoResponsavel: 1,
    },
  ]);
  const [tipoResponsavel, setTipoResponsavel] = useState<TipoResponsavel[]>(
    [] as TipoResponsavel[],
  );
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function addResponsible() {
    setNumeroDeResponsaveis([
      ...numeroDeResponsaveis,
      {
        nomeResponsavel: '',
        tipoResponsavel: 1,
      },
    ]);
  }

  function handleChange(event: any, index: number): void {
    setNumeroDeResponsaveis([
      ...numeroDeResponsaveis.slice(0, index),
      {
        ...numeroDeResponsaveis[index],
        [event.target.name]: event.target.value,
      },
      ...numeroDeResponsaveis.slice(index + 1),
    ]);
  }

  function saveResponsible() {
    projectsForm.projectsForm.setFieldValue(
      'responsavel',
      numeroDeResponsaveis.filter((item) => item.nomeResponsavel !== ''),
    );
    onClose();
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
              {numeroDeResponsaveis.map((responsavel: any, index: number) => (
                <Flex align="end" mb={3} key={index}>
                  <FormControl>
                    <FormLabel htmlFor="nomeResponsavel">NOME</FormLabel>
                    <Input
                      isRequired
                      placeholder="Nome do responsável"
                      type="text"
                      id="nomeResponsavel"
                      name="nomeResponsavel"
                      value={responsavel.nomeResponsavel}
                      onChange={(event) => handleChange(event, index)}
                      width="95%"
                    />
                    {projectsForm.projectsForm.errors.responsavel &&
                      projectsForm.projectsForm.touched.responsavel && (
                        <TextError>
                          {projectsForm.projectsForm.errors.responsavel}
                        </TextError>
                      )}
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="tipoResponsavel">TIPO</FormLabel>
                    {!loading && (
                      <Select
                        id="tipoResponsavel"
                        name="tipoResponsavel"
                        value={responsavel.tipoResponsavel}
                        onChange={(event) => handleChange(event, index)}
                        width="95%"
                      >
                        {tipoResponsavel.map((tipo) => (
                          <option key={tipo.id} value={tipo.id}>
                            {tipo.tipo_responsavel}
                          </option>
                        ))}
                      </Select>
                    )}
                    {projectsForm.projectsForm.errors.tipoResponsavel &&
                      projectsForm.projectsForm.touched.tipoResponsavel && (
                        <TextError>
                          {projectsForm.projectsForm.errors.tipoResponsavel}
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
                onClick={() => saveResponsible()}
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
