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

import { TextError } from 'components/TextError';

import { useProjects } from 'hooks/useProjects';

export function RegisterResponsibleModal() {
  const [numberOfResponsibles, setNumberOfResponsibles] = useState([1]);
  const { projectsForm } = useProjects();

  useEffect(() => {
    console.log(projectsForm.values.modalResponsible);
  }, [projectsForm.values]);

  function addResponsible() {
    setNumberOfResponsibles([
      ...numberOfResponsibles,
      numberOfResponsibles.length + 1,
    ]);
  }
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              {numberOfResponsibles.map((responsible, index) => (
                <Flex align="end" mb={3} key={responsible}>
                  <FormControl>
                    <FormLabel htmlFor="name">NOME</FormLabel>
                    <Input
                      isRequired
                      placeholder="Nome do responsável"
                      id="name"
                      type="text"
                      name="name"
                      value={projectsForm.values.modalResponsible}
                      onChange={projectsForm.handleChange}
                      width="95%"
                    />
                    {projectsForm.errors.modalResponsible &&
                      projectsForm.touched.modalResponsible && (
                        <TextError>
                          {projectsForm.errors.modalResponsible}
                        </TextError>
                      )}
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="responsible">TIPO</FormLabel>
                    <Select
                      id="responsibleId"
                      name="responsible"
                      value={projectsForm.values.modalType}
                      onChange={() => {
                        projectsForm.setFieldValue(
                          'modalType',
                          projectsForm.values.modalType[index],
                        );
                      }}
                      width="95%"
                    >
                      <option value="1">Tipo A</option>
                      <option value="2">Tipo B</option>
                      <option value="3">Tipo C</option>
                    </Select>
                    {projectsForm.errors.modalType &&
                      projectsForm.touched.modalType && (
                        <TextError>{projectsForm.errors.modalType}</TextError>
                      )}
                  </FormControl>
                  <IconButton
                    aria-label="Plus sign"
                    icon={<BsPlusLg />}
                    // onClick={onOpen}
                    background="origem.300"
                    variant="primary"
                    color="white"
                    mr={2}
                    mb={1}
                    isRound={true}
                    size="sm"
                    _hover={{
                      background: 'origem.500',
                      transition: 'all 0.4s',
                    }}
                  />
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
