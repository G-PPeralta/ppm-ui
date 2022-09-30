import { IoMdArrowDropdown } from "react-icons/io";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";

// import { useFiltragemCampanha } from "hooks/useFiltragemCampanha";

import { statusProjeto } from "utils/validateDate";

import { postGetInfoCampanha } from "services/get/Infograficos";

import SelectFiltragem from "../../../components/SelectFiltragem";

type Props = {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  listas: any;
  registerForm: any;
};

function FiltrosModal({ refresh, setRefresh, listas, registerForm }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    listaAreaAtuacao,
    listaPocos,
    listaTarefas,
    listaResponsaveis,
    listaSondas,
  } = listas;

  const areaAtuacaoOptions = listaAreaAtuacao.map((area: any) => ({
    value: area.id,
    label: area.tipo,
  }));

  const pocoOptions = listaPocos.map((poco: any) => ({
    value: poco.id,
    label: poco.poco,
  }));

  const tarefaOptions = listaTarefas.map((tarefa: any) => ({
    value: tarefa.id,
    label: tarefa.nom_atividade,
  }));

  const responsavelOptions = listaResponsaveis.map((responsavel: any) => ({
    value: responsavel.id,
    label: responsavel.nome,
  }));

  const sondaOptions = listaSondas.map((sonda: any) => ({
    value: sonda.id_campanha,
    label: sonda.sonda,
  }));

  const statusProjetosOptions = statusProjeto.map((status: any) => ({
    value: status.id,
    label: status.status,
  }));

  const postFiltros = async () => {
    await postGetInfoCampanha(registerForm.values);
  };

  const handleFiltrarCampanhas = () => {
    postFiltros();
    setRefresh(!refresh);
    onClose();
  };

  // const handleRemoverFiltro = async () => {
  //   await registerForm.resetForm();
  //   postFiltros();
  //   setRefresh(!refresh);
  //   onClose();
  // };

  const handleCancelar = () => {
    onClose();
  };

  const getValue = (options: any, index: number) => ({
    value: options?.[index]?.value,
    label: options?.[index]?.label,
  });

  const getValueByOptionId = (options: any, id: number) => {
    const index = options.findIndex((option: any) => option.value === id);
    return getValue(options, index);
  };

  return (
    <>
      <Button
        rightIcon={<IoMdArrowDropdown />}
        textColor={"origem.500"}
        backgroundColor={"transparent"}
        _hover={{
          borderColor: "origem.600",
          backgroundColor: "origem.500",
          textColor: "white",
          transition: "all 0.4s",
        }}
        onClick={onOpen}
      >
        Filtrar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
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
          <ModalBody mt={4}>
            <FormControl>
              <Flex direction={"column"} gap={5}>
                <Flex width={"47%"}>
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"Área"}
                    propName={"area_atuacao_id"}
                    options={areaAtuacaoOptions}
                    required={false}
                    value={getValueByOptionId(
                      areaAtuacaoOptions,
                      registerForm.values.area_atuacao_id
                    )}
                  />
                </Flex>

                <Flex width={"47%"}>
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"Poço"}
                    propName={"poco_id"}
                    options={pocoOptions}
                    required={false}
                    value={getValueByOptionId(
                      pocoOptions,
                      registerForm.values.poco_id
                    )}
                  />
                </Flex>

                <Flex width={"47%"}>
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"Atividade"}
                    propName={"atividade_id"}
                    options={tarefaOptions}
                    required={false}
                    value={getValueByOptionId(
                      tarefaOptions,
                      registerForm.values.atividade_id
                    )}
                  />
                </Flex>

                <Flex width={"47%"}>
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"Responsável"}
                    propName={"responsavel_id"}
                    options={responsavelOptions}
                    required={false}
                    value={getValueByOptionId(
                      responsavelOptions,
                      registerForm.values.responsavel_id
                    )}
                  />
                </Flex>

                <Flex justify={"space-between"} gap={5} flex={1}>
                  <Flex direction={"column"} flex={1}>
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
                      value={registerForm.values.data_inicio}
                    />
                  </Flex>

                  <Flex direction={"column"} flex={1}>
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
                      value={registerForm.values.data_fim}
                    />
                  </Flex>
                </Flex>

                <Flex width={"47%"}>
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"Sonda"}
                    propName={"sonda_id"}
                    options={sondaOptions}
                    required={false}
                    value={getValueByOptionId(
                      sondaOptions,
                      registerForm.values.sonda_id
                    )}
                  />
                </Flex>

                <Flex width={"47%"}>
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"Status"}
                    propName={"status"}
                    options={statusProjetosOptions}
                    required={false}
                    value={getValueByOptionId(
                      statusProjetosOptions,
                      registerForm.values.status
                    )}
                  />
                </Flex>
              </Flex>
            </FormControl>
          </ModalBody>
          <ModalFooter display={"flex"} justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                variant="ghost"
                color="red"
                onClick={() => handleCancelar()}
                _hover={{
                  background: "red.500",
                  transition: "all 0.4s",
                  color: "white",
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="ghost"
                color={"origem.500"}
                onClick={() => registerForm.resetForm()}
                _hover={{
                  background: "origem.500",
                  transition: "all 0.4s",
                  color: "white",
                }}
              >
                Remover Filtros
              </Button>
              <Button
                background="origem.500"
                variant="primary"
                color="white"
                onClick={() => handleFiltrarCampanhas()}
                _hover={{
                  background: "origem.600",
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
