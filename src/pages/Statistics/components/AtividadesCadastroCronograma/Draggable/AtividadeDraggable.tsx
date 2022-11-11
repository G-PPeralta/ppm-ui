import { useEffect, useId, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiTrash } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

import {
  Box,
  Flex,
  IconButton,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import {
  AreaAtuacao,
  Responsavel,
} from "interfaces/CadastrosModaisInfograficos";
import { Operacao } from "interfaces/Estatisticas";

import { RequiredField } from "components/RequiredField/RequiredField";

import { getDuracaoHorasAdicionarAtividade } from "services/get/Estatisticas";

import SelectFiltragem from "../../../../../components/SelectFiltragem";
import { ModalFiltrarAtividade } from "../ModalFiltrarAtividade";
import DateTimePicker from "./DateTimePicker";

interface Props {
  registerForm: FormikProps<any>;
  index: number;
  listas: {
    listaAreaAtuacao: AreaAtuacao[];
    listaResponsaveis: Responsavel[];
    listaOperacao: Operacao[];
  };
}

interface OpcoesFiltro {
  duracao?: number;
  operacao?: number;
  dataInicio?: string;
}

function AtividadesDraggable({ index, registerForm, listas }: Props) {
  const innerwidth = window.innerWidth;

  const { listaOperacao } = listas;

  const id = useId();
  const [draggableId, setDraggableId] = useState<any>(id);
  const [, setDuracao] = useState<number>();
  const [, setOperacao] = useState<number>();
  const [, setDataInicio] = useState<string>();
  const [, setOpcoesFiltro] = useState<OpcoesFiltro>();
  const [operacaoId, setOperacaoId] = useState();

  const initAdd = {
    area_id: 0,
    operacao_id: 0,
    responsavel_id: 0,
    data_inicio: "",
    duracao: 0,
  };

  const remove = (index: number) => {
    const newList = registerForm.values.atividades;

    newList.splice(index, 1);

    if (newList.length === 0) {
      registerForm.setFieldValue("atividades", [initAdd]);
    } else {
      registerForm.setFieldValue("atividades", [...newList]);
    }
  };

  function filterData(data: OpcoesFiltro) {
    registerForm.setFieldValue(
      `atividades[${index}].data_inicio`,
      data.dataInicio
    );

    // registerForm.setFieldValue(`atividades[${index}].duracao`, data.duracao);
  }

  const MediaHorasPorOperacao = async (id: number) => {
    const horasDuracao = await getDuracaoHorasAdicionarAtividade(id);
    registerForm.setFieldValue(
      `atividades[${index}].duracao`,
      horasDuracao.data.hrs_media
    );
  };

  const optionsOperacao = listaOperacao.map((operacao: Operacao) => ({
    value: operacao.id,
    label: operacao.nom_operacao,
  }));
  const getValue = (options: any, i: number, chave: string) => {
    const index = options
      .map(({ value }: any) => value)
      .indexOf(registerForm?.values?.atividades?.[i][chave]);

    const idOperacao = options?.[index]?.value;
    setOperacaoId(idOperacao);

    return {
      value: options?.[index]?.value,
      label: options?.[index]?.label,
    };
  };

  useEffect(() => {
    const now = Date.now();
    const newId = draggableId + "-" + now.toLocaleString();
    setDraggableId(newId);
  }, []);

  useEffect(() => {
    operacaoId && MediaHorasPorOperacao(operacaoId);
  }, [operacaoId]);

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box
            display="flex"
            flexWrap="wrap"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            w="100%"
            bg={"#f5f5f5"}
            px={5}
            py={4}
            borderRadius={"60px"}
            mb={2}
          >
            <Flex
              flexDirection={"row"}
              gap={4}
              flex={1}
              justify={"space-between"}
              height="80px"
            >
              <Flex align={"center"} justify={"center"} gap={3}>
                <GiHamburgerMenu color="#2E69FD" size={16} />
                <Text sx={{ fontSize: 16, fontWeight: "600" }}>
                  {index + 1}
                </Text>
              </Flex>

              <Flex
                gap={4}
                direction={innerwidth >= 640 ? "row" : "column"}
                align={"center"}
                justify={"center"}
                py={innerwidth >= 640 ? 0 : 4}
              >
                <Flex direction={"column"} flex={2}>
                  <Flex>
                    <RequiredField />
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      OPERAÇÃO
                    </Text>
                  </Flex>
                  <SelectFiltragem
                    registerForm={registerForm}
                    propName={`atividades[${index}].operacao_id`}
                    options={optionsOperacao}
                    value={getValue(optionsOperacao, index, "operacao_id")}
                  />
                </Flex>
                {/* <Flex direction={"column"}>
                  <Flex gap={1}>
                    <RequiredField />
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      OPERAÇÃO
                    </Text>
                  </Flex>
                  <SelectFiltragem
                    width={true}
                    registerForm={registerForm}
                    propName={`atividades[${index}].operacao_id`}
                    options={optionsOperacao}
                    // onChange={getValue(optionsOperacao, index, "operacao_id")}
                    value={getValue(optionsOperacao, index, "operacao_id")}
                  />
                </Flex> */}

                <Flex direction={"column"} flex={1}>
                  <DateTimePicker registerForm={registerForm} index={index} />
                </Flex>

                {/* <Flex direction={"column"}>
                  <DateTimePickerModal
                    registerForm={registerForm}
                    value={
                      dataInicio &&
                      formatDateToddMMyyyyhhmm(new Date(dataInicio))
                    }
                    dateFormat="dd/MM/yyyy, hh:mm"
                    index={index}
                    width="208px"
                  />
                </Flex> */}

                {/* <Flex direction={"column"}>
                  <Flex gap={1}>
                    <RequiredField />
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      DURAÇÃO
                    </Text>
                  </Flex>
                  <NumberInput
                    max={99999}
                    min={0}
                    height="56px"
                    width="208px"
                    id={`atividades[${index}].duracao`}
                    name={`atividades[${index}].duracao`}
                    value={duracao}
                    onChange={(value) => {
                      registerForm.setFieldValue(
                        `atividades[${index}].duracao`,
                        Number(value)
                      );
                    }}
                  >
                    <NumberInputField bg={"#fff"} h={"56px"} />
                  </NumberInput>
                </Flex> */}

                <Flex direction={"column"} flex={1}>
                  <Flex gap={1}>
                    <RequiredField />
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      DURAÇÃO
                    </Text>
                  </Flex>
                  <NumberInput
                    _placeholder={{ color: "#949494" }}
                    fontSize={"14px"}
                    fontWeight={"400"}
                    color={"black"}
                    width={99}
                    max={99999}
                    min={0}
                    id={`atividades[${index}].duracao`}
                    name={`atividades[${index}].duracao`}
                    value={registerForm.values.atividades[index].duracao}
                    onChange={(value) => {
                      registerForm.setFieldValue(
                        `atividades[${index}].duracao`,
                        Number(value)
                      );
                    }}
                  >
                    <NumberInputField bg={"#fff"} h={"56px"} />
                  </NumberInput>
                </Flex>

                <Flex direction={"column"} flex={1}>
                  <Flex>
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      PROFUNDIDADE
                    </Text>
                  </Flex>
                  <NumberInput
                    _placeholder={{ color: "#949494" }}
                    fontSize={"14px"}
                    fontWeight={"400"}
                    color={"black"}
                    max={99999}
                    min={0}
                    width={99}
                    // id={`atividades[${index}].duracao`}
                    // name={`atividades[${index}].duracao`}
                    // value={registerForm.values.atividades[index].duracao}
                    // onChange={(value) => {
                    //   registerForm.setFieldValue(
                    //     `atividades[${index}].duracao`,
                    //     Number(value)
                    //   );
                    // }}
                  >
                    <NumberInputField bg={"#fff"} h={"56px"} />
                  </NumberInput>
                </Flex>
                <Flex direction={"column"} flex={1}>
                  <Flex>
                    <RequiredField />
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      MÉTODO
                    </Text>
                  </Flex>
                  <SelectFiltragem
                    width={174}
                    registerForm={registerForm}
                    // propName={`atividades[${index}].operacao_id`}
                    options={[
                      {
                        value: 1,
                        label: "Gás Lift",
                      },
                      {
                        value: 2,
                        label: "Surgente",
                      },
                    ]}
                    // value={getValue(optionsOperacao, index, "operacao_id")}
                  />
                </Flex>
              </Flex>
              <Flex
                align={"center"}
                justify={"center"}
                _hover={{ cursor: "pointer" }}
              >
                <ModalFiltrarAtividade
                  setDuracao={setDuracao}
                  registerFormAct={registerForm}
                  setOperacao={setOperacao}
                  setDataInicio={setDataInicio}
                  filterData={filterData}
                  setOpcoesFiltro={setOpcoesFiltro}
                  index={index}
                />
                <IconButton
                  onClick={() => remove(index)}
                  color={"#F40606"}
                  fontWeight={"700"}
                  backgroundColor={"transparent"}
                  aria-label="Plus sign"
                  _hover={{
                    backgroundColor: "#F40606",
                    color: "white",
                  }}
                >
                  <FiTrash size={"13px"} />
                </IconButton>
              </Flex>
            </Flex>
          </Box>
        </div>
      )}
    </Draggable>
  );
}

export default AtividadesDraggable;
