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
  Box,
  Text,
} from '@chakra-ui/react';
import { TipoResponsavel } from 'interfaces/Services';

import { TextError } from 'components/TextError';

import { getTipoResponsavel } from 'services/get/Projetos';

export function AdicionarCoordenadorModal(projectsForm: any) {
  const [numeroDeCoordenadores, setNumeroDeCoordenadores] = useState([
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

  function addCoordenador() {
    setNumeroDeCoordenadores([
      ...numeroDeCoordenadores,
      {
        nomeResponsavel: '',
        tipoResponsavel: 1,
      },
    ]);
  }

  function handleChange(event: any, index: number): void {
    setNumeroDeCoordenadores([
      ...numeroDeCoordenadores.slice(0, index),
      {
        ...numeroDeCoordenadores[index],
        [event.target.name]: event.target.value,
      },
      ...numeroDeCoordenadores.slice(index + 1),
    ]);
  }

  function saveResponsible() {
    projectsForm.projectsForm.setFieldValue(
      'responsavel',
      numeroDeCoordenadores.filter((item) => item.nomeResponsavel !== ''),
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
    <Flex>
      <Box
        display={'flex'}
        alignItems={'center'}
        border="2px"
        padding={2}
        borderRadius={6}
        borderColor={'origem.300'}
        onClick={onOpen}
        _hover={{
          background: '#f5f5f5',
          transition: 'all 0.4s',
          color: 'origem.300',
          cursor: 'pointer',
          borderColor: 'origem.500',
        }}
      >
        <IconButton
          aria-label="Plus sign"
          icon={<BsPlusLg />}
          background="origem.300"
          variant="secondary"
          color="white"
          mr={2}
          isRound={true}
          size="sm"
        />
        <Text
          fontSize={useBreakpointValue({ base: 'sm', md: 'sm' })}
          fontWeight={'bold'}
          color={'origem.500'}
        >
          ADICIONAR COORDENADOR
        </Text>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ADICIONAR COORDENADOR</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {numeroDeCoordenadores.map((responsavel: any, index: number) => (
              <Flex align="end" mb={3} key={index}>
                <FormControl>
                  <FormLabel htmlFor="nomeCoordenador">NOME</FormLabel>
                  <Input
                    isRequired
                    placeholder="Nome do coordenador"
                    type="text"
                    id="nomeCoordenador"
                    name="nomeCoordenador"
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
                  <FormLabel htmlFor="tipoCoordenador">TIPO</FormLabel>
                  {!loading && (
                    <Select
                      id="tipoCoordenador"
                      name="tipoCoordenador"
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
                onClick={addCoordenador}
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
                ADICIONAR OUTRA PESSOA COORDENADORA
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
              SALVAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
