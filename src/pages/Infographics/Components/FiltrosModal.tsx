import { BiSearch } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiFilterOffFill } from "react-icons/ri";

import {
  Button,
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Input,
  useBreakpointValue,
  Text,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  AreaAtuacao,
  Pocos,
  Tarefas,
} from "interfaces/CadastrosModaisInfograficos";
import { Operacao } from "interfaces/Estatisticas";
import { Sonda, Status } from "interfaces/Infograficos";
import { Responsavel } from "interfaces/Services";

import { handleCancelar } from "utils/handleCadastro";
import { statusProjeto } from "utils/validateDate";

import { postGetInfoCampanha } from "services/get/Infograficos";

import SelectFiltragem from "../../../components/SelectFiltragem";

type Props = {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  listas: {
    listaAreaAtuacao: AreaAtuacao[];
    listaResponsaveis: Responsavel[];
    listaOperacao: Operacao[];
    listaSondas: Sonda[];
    listaTarefas: Tarefas[];
    listaPocos: Pocos[];
  };
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

  const areaAtuacaoOptions = listaAreaAtuacao.map((area: AreaAtuacao) => ({
    value: area.id,
    label: area.tipo,
  }));

  const pocoOptions = listaPocos.map((poco: any) => ({
    value: poco.id,
    label: poco.poco,
  }));

  const tarefaOptions = listaTarefas.map((tarefa: Tarefas) => ({
    value: tarefa.id,
    label: tarefa.nom_atividade,
  }));

  const responsavelOptions = listaResponsaveis.map(
    (responsavel: Responsavel) => ({
      value: responsavel.id,
      label: responsavel.nome,
    })
  );

  const sondaOptions = listaSondas.map((sonda: Sonda) => ({
    value: sonda.id_campanha,
    label: sonda.sonda,
  }));

  const statusProjetosOptions = statusProjeto.map((status: Status) => ({
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
        h={"56px"}
        fontSize={"18px"}
        fontWeight={"700"}
        borderRadius={"8px"}
        fontFamily={"Mulish"}
        background={"white"}
        color={"origem.500"}
        onClick={onOpen}
        _hover={{
          background: "origem.500",
          transition: "all 0.4s",
          color: "white",
        }}
      >
        Filtrar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            borderTopRadius={7}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
            fontWeight={"700"}
            fontFamily={"Mulish"}
          >
            Filtros
          </ModalHeader>
          <ModalCloseButton
            color={"white"}
            onClick={() => handleCancelar(registerForm, onClose)}
          />
          <ModalBody mt={4}>
            <FormControl>
              <Flex direction={"column"} gap={5}>
                <Flex width={"47%"}>
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"ÁREA"}
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
                    nomeSelect={"POÇO"}
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
                    nomeSelect={"ATIVIDADE"}
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
                    nomeSelect={"RESPONSÁVEL"}
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
                    <Text
                      fontWeight={"bold"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      DATA INÍCIO
                    </Text>
                    <Input
                      h={"56px"}
                      _placeholder={{ color: "#949494" }}
                      fontSize={"14px"}
                      fontWeight={"400"}
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
                      value={registerForm.values.data_inicio || new Date()}
                      defaultValue={"dd/mm/aaaa"}
                    />
                  </Flex>

                  <Flex direction={"column"} flex={1}>
                    <Text
                      fontWeight={"bold"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      DATA FIM
                    </Text>{" "}
                    <Input
                      h={"56px"}
                      fontSize={"14px"}
                      fontWeight={"400"}
                      isRequired
                      placeholder="dd/mm/aaaa"
                      id="data_fim"
                      type="date"
                      name="data_fim"
                      w={useBreakpointValue({ base: "100%", md: "100%" })}
                      onChange={(e) => {
                        registerForm.setFieldValue("data_fim", e.target.value);
                      }}
                      value={registerForm.values.data_fim || new Date()}
                    />
                  </Flex>
                </Flex>

                <Flex width={"47%"}>
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"SONDA"}
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
                    nomeSelect={"STATUS"}
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
            <Flex gap={3}>
              <Button
                variant="ghost"
                color="red.500"
                onClick={() => registerForm.resetForm()}
                _hover={{
                  background: "red.600",
                  transition: "all 0.4s",
                  color: "white",
                }}
                w={"208px"}
                h={"56px"}
                fontSize={"18px"}
                fontWeight={"700"}
                borderRadius={"8px"}
                fontFamily={"Mulish"}
                rightIcon={<RiFilterOffFill />}
              >
                Remover Filtros
              </Button>
              <Button
                background={"origem.500"}
                variant="primary"
                color="white"
                onClick={() => handleFiltrarCampanhas()}
                _hover={{
                  background: "origem.600",
                  transition: "all 0.4s",
                }}
                w={"208px"}
                h={"56px"}
                fontSize={"18px"}
                fontWeight={"700"}
                borderRadius={"8px"}
                fontFamily={"Mulish"}
              >
                <Flex mx={12} gap={3}>
                  <Text
                    fontSize={"18px"}
                    fontWeight={"700"}
                    fontFamily={"Mulish"}
                  >
                    Filtrar
                  </Text>
                  <BiSearch size={20} />
                </Flex>
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FiltrosModal;
