import { useEffect, useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { useParams } from "react-router-dom";

import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";
import StatusProjeto from "components/StatusProjeto";

import { statusProjeto } from "utils/validateDate";

import { getAtividadesCampanha } from "services/get/ActivitiesSchedule";

import CardACT from "../ActivitiesSchedule/Components/CardACT";
import ModalCadastroAtividade from "../ActivitiesSchedule/Components/ModalCadastroAtividade";
import ModalEditarAtividade from "../ActivitiesSchedule/Components/ModalEditarAtividade";
import BotaoVisaoGeral from "./components/BotaoVisaoGeral";
import ExibirModal from "./components/ExibirModal";
import FiltrosModal from "./components/FiltrosModal";

declare type AnchorPositionType =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "middle";

export function ActivitiesPrecedents() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [atividades, setAtividades] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [openId, setOpenId] = useState("");

  const requestHandler = async () => {
    const response = await getAtividadesCampanha(id);
    setAtividades(response.data);
  };

  useEffect(() => {
    requestHandler();
    setLoading(false);
  }, []);

  useEffect(() => {
    requestHandler();
  }, [refresh]);

  const openDetails = (atividade: any) => {
    // console.log("atividade", atividade);
    setOpenId(atividade);
  };

  const payload = [
    {
      area: "Área 1",
      atividades: [
        {
          atividade: "Escavaçao de Rocha",
          comp_pct: 1,
          finalplanejado: "2022-09-19T13:27:00.000Z",
          id_poco: 41,
          inicioplanejado: "2022-09-19T12:27:00.000Z",
          pct_plan: 0,
          pct_real: 4,
          qtddias: 0,
          sonda: "PIR-999",
          atividadeId: "id1",
          precedentesIds: [],
        },
        {
          atividade: "Escavaçao Solo",
          comp_pct: 1,
          finalplanejado: "2022-09-19T13:27:00.000Z",
          id_poco: 41,
          inicioplanejado: "2022-09-19T12:27:00.000Z",
          pct_plan: 100,
          pct_real: 100,
          qtddias: 0,
          sonda: "PIR-999",
          atividadeId: "id2",
          precedentesIds: ["id1"],
        },
        {
          atividade: "Escavaçao Monte",
          comp_pct: 1,
          finalplanejado: "2022-09-19T13:27:00.000Z",
          id_poco: 41,
          inicioplanejado: "2022-09-19T12:27:00.000Z",
          pct_plan: 65.8,
          pct_real: 3,
          qtddias: 0,
          sonda: "PIR-999",
          atividadeId: "id3",
          precedentesIds: ["id2"],
        },
      ],
    },
    {
      area: "Área 2",
      atividades: [
        {
          atividade: "Escavaçao Solo",
          comp_pct: 1,
          finalplanejado: "2022-09-19T13:27:00.000Z",
          id_poco: 41,
          inicioplanejado: "2022-09-19T12:27:00.000Z",
          pct_plan: 100,
          pct_real: 100,
          qtddias: 0,
          sonda: "PIR-999",
          atividadeId: "id4",
          precedentesIds: ["id1"],
        },
        {
          atividade: "Escavaçao Solo",
          comp_pct: 1,
          finalplanejado: "2022-09-19T13:27:00.000Z",
          id_poco: 41,
          inicioplanejado: "2022-09-19T12:27:00.000Z",
          pct_plan: 100,
          pct_real: 100,
          qtddias: 0,
          sonda: "PIR-999",
          atividadeId: "id5",
          precedentesIds: ["id3"],
        },
        {
          atividade: "Escavaçao Solo",
          comp_pct: 1,
          finalplanejado: "2022-09-19T13:27:00.000Z",
          id_poco: 41,
          inicioplanejado: "2022-09-19T12:27:00.000Z",
          pct_plan: 100,
          pct_real: 100,
          qtddias: 0,
          sonda: "PIR-999",
          atividadeId: "id6",
          precedentesIds: ["id8"],
        },
      ],
    },
    {
      area: "Área 3",
      atividades: [
        {
          atividade: "Escavaçao Solo",
          comp_pct: 1,
          finalplanejado: "2022-09-19T13:27:00.000Z",
          id_poco: 41,
          inicioplanejado: "2022-09-19T12:27:00.000Z",
          pct_plan: 100,
          pct_real: 100,
          qtddias: 0,
          sonda: "PIR-999",
          atividadeId: "id7",
          precedentesIds: [],
        },
        {
          atividade: "Escavaçao Solo",
          comp_pct: 1,
          finalplanejado: "2022-09-19T13:27:00.000Z",
          id_poco: 41,
          inicioplanejado: "2022-09-19T12:27:00.000Z",
          pct_plan: 100,
          pct_real: 100,
          qtddias: 0,
          sonda: "PIR-999",
          atividadeId: "id8",
          precedentesIds: ["id9"],
        },
        {
          atividade: "Escavaçao Solo",
          comp_pct: 1,
          finalplanejado: "2022-09-19T13:27:00.000Z",
          id_poco: 41,
          inicioplanejado: "2022-09-19T12:27:00.000Z",
          pct_plan: 100,
          pct_real: 100,
          qtddias: 0,
          sonda: "PIR-999",
          atividadeId: "id9",
          precedentesIds: [],
        },
      ],
    },
  ];

  const getAreabyIdTarget = (
    precedenteId: string,
    currentArea: string,
    currentIndex: number
  ): AnchorPositionType => {
    let area = "";
    let index = 0;
    for (const pay in payload) {
      for (const atividade in payload[pay].atividades) {
        if (payload[pay].atividades[atividade].atividadeId == precedenteId) {
          area = payload[pay].area;
          index = Number(atividade);
        }
      }
    }
    if (area == currentArea) {
      if (index < currentIndex) {
        return "right";
      } else {
        return "left";
      }
    } else {
      if (Number(area.split(" ")[1]) < Number(currentArea.split(" ")[1])) {
        return "bottom";
      } else {
        return "top";
      }
    }
  };

  const getAreabyIdSource = (
    precedenteId: string,
    currentArea: string,
    currentIndex: number
  ): AnchorPositionType => {
    let area = "";
    let index = 0;
    for (const pay in payload) {
      for (const atividade in payload[pay].atividades) {
        if (payload[pay].atividades[atividade].atividadeId == precedenteId) {
          area = payload[pay].area;
          index = Number(atividade);
        }
      }
    }
    if (area == currentArea) {
      if (index < currentIndex) {
        return "left";
      } else {
        return "right";
      }
    } else {
      if (Number(area.split(" ")[1]) < Number(currentArea.split(" ")[1])) {
        return "top";
      } else {
        return "bottom";
      }
    }
  };

  return (
    <>
      <Sidebar>
        {!loading ? (
          <Stack spacing="8">
            <Flex w={"auto"} align="center" justify="center" bg={"#EDF2F7"}>
              <Box
                py={{ base: "0", sm: "8" }}
                px={{ base: "4", sm: "6" }}
                w={"100%"}
                bg={"white"}
                borderRadius={{ base: "none", sm: "xl" }}
              >
                <Flex justify={"space-between"} mb={5}>
                  <Heading as="h3" size="md" mb={3}>
                    {atividades[0] ? atividades[0].sonda : ""}
                  </Heading>
                  <Flex gap={4}>
                    <ExibirModal />
                    <FiltrosModal />
                  </Flex>
                </Flex>
                <Flex justify={"space-between"} gap={1} wrap={"wrap"} mb={4}>
                  <Flex gap={2}>
                    <BotaoVisaoGeral />
                    <ModalCadastroAtividade
                      id={id}
                      setRefresh={setRefresh}
                      refresh={refresh}
                    />
                  </Flex>
                  <Flex gap={4} wrap={"wrap"}>
                    {statusProjeto.map((status, index) => (
                      <StatusProjeto
                        key={index}
                        status={status.status}
                        color={status.color}
                      />
                    ))}
                  </Flex>
                </Flex>
                <ArcherContainer
                  startMarker={true}
                  endMarker={false}
                  strokeColor="black"
                  strokeWidth={1}
                >
                  <Flex py={4} wrap={"wrap"}>
                    {payload.map((area, index) => (
                      <Flex
                        width={"100%"}
                        borderTop={"1px solid"}
                        borderBottom={"1px solid"}
                        borderColor={"#A7A7A7"}
                        direction={"row"}
                        key={index}
                      >
                        <Box
                          py={4}
                          px={4}
                          width={"150px"}
                          borderRight={"1px solid"}
                          borderColor={"#A7A7A7"}
                        >
                          <Text sx={{ fontWeight: "500", fontSize: 20 }}>
                            {area.area}
                          </Text>
                        </Box>
                        <Box py={4} px={4}>
                          <Flex direction={"row"} gap={4} py={4} wrap={"wrap"}>
                            {area.atividades.map((atividade, index) => (
                              <ArcherElement
                                id={atividade.atividadeId}
                                // relations={[
                                //   {
                                //     targetId: "id1",
                                //     targetAnchor: "bottom",
                                //     sourceAnchor: "right",
                                //     style: {
                                //       strokeColor: "blue",
                                //       strokeWidth: 1,
                                //     },
                                //   },
                                // ]}
                                relations={atividade.precedentesIds.map(
                                  (precedente: any) => {
                                    const item = {
                                      targetId: String(precedente),
                                      targetAnchor: getAreabyIdTarget(
                                        precedente,
                                        area.area,
                                        index
                                      ),
                                      sourceAnchor: getAreabyIdSource(
                                        precedente,
                                        area.area,
                                        index
                                      ),
                                    };
                                    return item;
                                  }
                                )}
                              >
                                <Flex
                                  key={index}
                                  direction={"column"}
                                  align={"center"}
                                  justify={"center"}
                                  onClick={() => openDetails(atividade)}
                                  _hover={{ cursor: "pointer" }}
                                >
                                  <CardACT atividade={atividade} />
                                </Flex>
                              </ArcherElement>
                            ))}
                          </Flex>
                          {openId ? (
                            <ModalEditarAtividade
                              id={id}
                              atividade={openId}
                              onClose={() => setOpenId("")}
                              setRefresh={setRefresh}
                              refresh={refresh}
                            />
                          ) : undefined}
                        </Box>
                      </Flex>
                    ))}
                  </Flex>
                </ArcherContainer>
              </Box>
            </Flex>
          </Stack>
        ) : (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}
      </Sidebar>
    </>
  );
}
