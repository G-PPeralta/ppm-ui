/*
  Criado por: Bruno Fracaro
  Data de criação: 09/2022
  Descrição: Tela de visão por precedentes, acessada dentro de uma intervenção.
*/

import { useEffect, useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import ContainerPagina from "components/ContainerPagina";
import Sidebar from "components/SideBar";
import StatusProjeto from "components/StatusProjeto";
import TituloPagina from "components/TituloPagina";

import { statusProjeto } from "utils/validateDate";

import { getAtividadesCampanha } from "services/get/ActivitiesSchedule";

import BotaoVisaoGeral from "./components/BotaoVisaoGeral";
import CardACT from "./components/CardACT";

declare type AnchorPositionType =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "middle";

declare type AreaCompetaType = {
  area: string;
  atividades: Array<any>;
};

export function ActivitiesPrecedents() {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/campanhas/atividade/${id}/visao-por-area`);
  };
  const [loading, setLoading] = useState(true);
  const [atividades, setAtividades] = useState<any[]>([]);
  const [destaques, setDestaques] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);
  // const [openId, setOpenId] = useState("");

  const requestHandler = async () => {
    const response = await getAtividadesCampanha(id);
    const payload = response.data;
    setAtividades(response.data);
    const areas: any[] = [];
    payload.forEach((value: any, key: number) => {
      if (!areas.includes(value.nom_area)) {
        areas.push(value.nom_area);
      }
    });
    const newData: any[] = [];
    for (const i in areas) {
      const newArea: AreaCompetaType = {
        area: "",
        atividades: [],
      };
      newArea.area = areas[i];
      payload.forEach((value: any, key: number) => {
        if (areas[i] === value.nom_area) {
          const newArray = newArea.atividades;
          newArray.push(value);
          newArea.atividades = newArray;
        }
      });
      newData.push(newArea);
    }
    setData(newData);
  };

  useEffect(() => {
    requestHandler();
    setLoading(false);
  }, []);

  useEffect(() => {
    requestHandler();
  }, [refresh]);

  const openDetails = (atividade: any) => {
    if (destaques.includes(atividade.id_filho)) {
      setDestaques([]);
    } else {
      const atvLocal = atividades;
      const filtered = atvLocal.filter((val: any) => {
        const predIds = val.precedentesId.map(
          (pred: any) => pred.precedente_id
        );
        if (predIds.length > 0) {
          return predIds.includes(atividade.id_filho);
        } else {
          return false;
        }
      });
      const renderList = filtered.map((val: any) => val.id_filho);
      renderList.push(atividade.id_filho);
      setDestaques(renderList);
    }
  };

  const getAreabyIdTarget = (
    precedenteId: string,
    atividadeId: string
  ): AnchorPositionType => {
    const atv = document.getElementById(atividadeId);
    let rectATV = { x: 0, y: 0 };
    if (atv) {
      rectATV = atv.getBoundingClientRect();
    }
    const pre = document.getElementById(precedenteId);
    let rectPRE = { x: 0, y: 0 };
    if (pre) {
      rectPRE = pre.getBoundingClientRect();
    }
    if (rectATV.y == rectPRE.y) {
      if (rectATV.x < rectPRE.x) {
        return "left";
      } else {
        return "right";
      }
    } else {
      if (rectATV.y > rectPRE.y) {
        return "bottom";
      } else {
        return "top";
      }
    }
  };

  const getAreabyIdSource = (
    precedenteId: string,
    atividadeId: string
  ): AnchorPositionType => {
    const atv = document.getElementById(atividadeId);
    let rectATV = { x: 0, y: 0 };
    if (atv) {
      rectATV = atv.getBoundingClientRect();
    }
    const pre = document.getElementById(precedenteId);
    let rectPRE = { x: 0, y: 0 };
    if (pre) {
      rectPRE = pre.getBoundingClientRect();
    }
    if (rectATV.y == rectPRE.y) {
      if (rectATV.x < rectPRE.x) {
        return "right";
      } else {
        return "left";
      }
    } else {
      if (rectATV.y > rectPRE.y) {
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
          <ContainerPagina>
            {/* <TituloPagina botaoVoltar={true}>
              {atividades[0] ? atividades[0].sonda : ""}
            </TituloPagina> */}
            <TituloPagina botaoVoltar={true}>
              Visão Por Precedentes
            </TituloPagina>
            <Flex justify={"space-between"} gap={1} wrap={"wrap"} mb={4}>
              <Flex gap={2}>
                <BotaoVisaoGeral />
                {/* <ModalCadastroAtividade
                      id={id}
                      setRefresh={setRefresh}
                      refresh={refresh}
                    /> */}
                <Button
                  h={"56px"}
                  borderRadius={"10px"}
                  variant="outline"
                  border={"2px solid"}
                  borderColor={"origem.500"}
                  textColor={"origem.500"}
                  _hover={{
                    borderColor: "origem.600",
                    backgroundColor: "origem.500",
                    textColor: "white",
                    transition: "all 0.4s",
                  }}
                  onClick={() => {
                    handleClick();
                  }}
                >
                  {" "}
                  Visão Por Área
                </Button>
              </Flex>
            </Flex>
            <Flex gap={4} wrap={"wrap"} justify={"end"}>
              {statusProjeto.map((status, index) => (
                <StatusProjeto
                  key={index}
                  status={status.status}
                  color={status.color}
                />
              ))}
            </Flex>

            <ArcherContainer
              startMarker={true}
              endMarker={false}
              strokeColor="black"
              strokeWidth={1}
            >
              <Flex py={4} wrap={"wrap"}>
                {data.map((area, index) => (
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
                      width={"160px"}
                      borderRight={"1px solid"}
                      borderColor={"#A7A7A7"}
                    >
                      <Text sx={{ fontWeight: "500", fontSize: 20 }}>
                        {area.area}
                      </Text>
                    </Box>
                    <Box py={4} px={4}>
                      <Flex direction={"row"} gap={4} py={4} wrap={"wrap"}>
                        {area.atividades.map(
                          (atividade: any, index: number) => (
                            <ArcherElement
                              id={String(atividade.id_filho)}
                              relations={atividade.precedentesId.map(
                                (precedente: any) => {
                                  const item = {
                                    targetId: String(precedente.precedente_id),
                                    targetAnchor: getAreabyIdTarget(
                                      String(precedente.precedente_id),
                                      String(atividade.id_filho)
                                    ),
                                    sourceAnchor: getAreabyIdSource(
                                      String(precedente.precedente_id),
                                      String(atividade.id_filho)
                                    ),
                                    style: {
                                      strokeColor:
                                        (destaques.includes(
                                          atividade.id_filho
                                        ) &&
                                          destaques[destaques.length - 1] !=
                                            atividade.id_filho) ||
                                        destaques.length == 0
                                          ? "#000000"
                                          : "#00000000",
                                      strokeWidth: 1,
                                    },
                                  };
                                  return item;
                                }
                              )}
                            >
                              <Flex
                                id={atividade.id_filho}
                                key={index}
                                direction={"column"}
                                opacity={
                                  destaques.includes(atividade.id_filho) ||
                                  destaques.length == 0
                                    ? 1
                                    : 0.1
                                }
                                align={"center"}
                                justify={"center"}
                                onClick={() => openDetails(atividade)}
                                _hover={{ cursor: "pointer" }}
                              >
                                <CardACT
                                  atividade={atividade}
                                  setRefresh={setRefresh}
                                  refresh={refresh}
                                />
                              </Flex>
                            </ArcherElement>
                          )
                        )}
                      </Flex>
                    </Box>
                  </Flex>
                ))}
              </Flex>
            </ArcherContainer>
          </ContainerPagina>
        ) : (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}
      </Sidebar>
    </>
  );
}
