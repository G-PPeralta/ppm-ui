import { IoMdArrowDropdown } from "react-icons/io";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useFiltragemCampanha } from "hooks/useFiltragemCampanha";

import SelectFiltragem from "./SelectFiltragem";

function FiltrosModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    registerForm,
    listaAreaAtuacao,
    listaPocos,
    listaTarefas,
    listaResponsaveis,
    listaSondas,
  } = useFiltragemCampanha();

  const areaAtuacaoOptions = listaAreaAtuacao.map((area) => ({
    value: area.id,
    label: area.tipo,
  }));

  const pocoOptions = listaPocos.map((poco) => ({
    value: poco.id,
    label: poco.poco,
  }));

  const tarefaOptions = listaTarefas.map((tarefa) => ({
    value: tarefa.id,
    label: tarefa.nom_atividade,
  }));

  const responsavelOptions = listaResponsaveis.map((responsavel) => ({
    value: responsavel.id,
    label: responsavel.nome,
  }));

  const sondaOptions = listaSondas.map((sonda) => ({
    value: sonda.id_campanha,
    label: sonda.sonda,
  }));

  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={<IoMdArrowDropdown />}
        colorScheme="blue"
        variant="ghost"
      >
        Filtrar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            borderTopRadius={7}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"1em"}
          >
            Filtros
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody mt={4}>
            <FormControl>
              <Flex direction={"column"} gap={5}>
                <SelectFiltragem
                  registerForm={registerForm}
                  nomeSelect={"Área"}
                  propName={"area_atuacao_id"}
                  options={areaAtuacaoOptions}
                  required={false}
                />

                <SelectFiltragem
                  registerForm={registerForm}
                  nomeSelect={"Poço"}
                  propName={"poco_id"}
                  options={pocoOptions}
                  required={false}
                />

                <SelectFiltragem
                  registerForm={registerForm}
                  nomeSelect={"Atividade"}
                  propName={"atividade_id"}
                  options={tarefaOptions}
                  required={false}
                />

                <SelectFiltragem
                  registerForm={registerForm}
                  nomeSelect={"Responsável"}
                  propName={"responsavel_id"}
                  options={responsavelOptions}
                  required={false}
                />

                <Flex justify={"space-between"} gap={5}>
                  <Flex direction={"column"} grow={1}>
                    <FormLabel htmlFor="data_inicio">Data Inicio</FormLabel>
                    <Input
                      isRequired
                      placeholder="dd/mm/aaaa"
                      id="data_inicio"
                      type="date"
                      name="data_inicio"
                      w={useBreakpointValue({ base: "100%", md: "100%" })}
                      onChange={(e) => {
                        registerForm.setFieldValue(
                          "data_inicio",
                          e.target.value
                        );
                      }}
                    />
                  </Flex>

                  <Flex direction={"column"} grow={1}>
                    <FormLabel htmlFor="data_fim">Data Fim</FormLabel>
                    <Input
                      isRequired
                      placeholder="dd/mm/aaaa"
                      id="data_fim"
                      type="date"
                      name="data_fim"
                      w={useBreakpointValue({ base: "100%", md: "100%" })}
                      onChange={(e) => {
                        registerForm.setFieldValue("data_fim", e.target.value);
                      }}
                    />
                  </Flex>
                </Flex>

                <SelectFiltragem
                  registerForm={registerForm}
                  nomeSelect={"Sonda"}
                  propName={"sonda_id"}
                  options={sondaOptions}
                  required={false}
                />

                <SelectFiltragem
                  registerForm={registerForm}
                  nomeSelect={"Status"}
                  propName={"status"}
                  options={sondaOptions}
                  required={false}
                />
              </Flex>
            </FormControl>
          </ModalBody>
          <ModalFooter display={"flex"} justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                variant="ghost"
                color="red"
                onClick={() => onClose()}
                _hover={{
                  background: "red.500",
                  transition: "all 0.4s",
                  color: "white",
                }}
              >
                Remover Filtros
              </Button>
              <Button
                background="origem.300"
                variant="primary"
                color="white"
                onClick={() => onClose()}
                _hover={{
                  background: "origem.500",
                  transition: "all 0.4s",
                }}
              >
                Filtrar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FiltrosModal;
