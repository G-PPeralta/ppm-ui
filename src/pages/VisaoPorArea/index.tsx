import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { Button, Flex } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { Atividade } from "interfaces/CadastroAtividadeDeta";

import ContainerPagina from "components/ContainerPagina";
import Sidebar from "components/SideBar";
import StatusProjeto from "components/StatusProjeto";
import TituloPagina from "components/TituloPagina";

import { statusProjeto } from "utils/validateDate";

import { getAtividadesCampanha } from "services/get/ActivitiesSchedule";

import AccordionArea from "./components/AccordionArea";
import BotaoVisaoGeral from "./components/BotaoVisaoGeral";
import { Area, RootArray } from "./interfaces";

declare type AreaCompetaType = {
  area: string;
  pctTotalConcluido: number;
  totalAtividades: number;
  status: { status: string; qtde: number }[];
  atividades: Array<Atividade>;
};

function validateDate(
  pct_plan: number, // porcentagem planejada
  comp_pct: number, // comparação porcentagens
  pct_real: number // porcentagem realizada
) {
  switch (true) {
    case pct_plan > pct_real:
      return 3;
    case pct_real === 100 && comp_pct === 1:
      return 4;
    case (pct_real > 0 && pct_real < 100 && comp_pct === 1) ||
      (pct_real > pct_plan && comp_pct === 1):
      return 1;
    case pct_plan === 0 && pct_real === 0:
      return 0;
    default:
      return 2;
  }
}

function VisaoPorArea() {
  const { id } = useParams();
  const handleClick = () => {
    navigate(`/campanhas/atividade/${id}/precedentes`);
  };
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([] as Area[]);
  const navigate = useNavigate();
  const requestHandler = async () => {
    const response = await getAtividadesCampanha(id);
    const payload: RootArray[] = response.data;
    const areas: string[] = [];
    payload.forEach((value: any, key: number) => {
      if (!areas.includes(value.nom_area)) {
        areas.push(value.nom_area);
      }
    });
    const newData: any[] = [];
    for (const i in areas) {
      const newArea: AreaCompetaType = {
        area: "",
        pctTotalConcluido: 0,
        totalAtividades: 0,
        status: [
          {
            status: "Não Iniciado",
            qtde: 0,
          },
          {
            status: "Em Andamento",
            qtde: 0,
          },
          {
            status: "Não Aplicável",
            qtde: 0,
          },
          {
            status: "Atrasado",
            qtde: 0,
          },
          {
            status: "Concluído",
            qtde: 0,
          },
        ],
        atividades: [],
      };
      newArea.area = areas[i];
      payload.forEach((value: any, key: number) => {
        if (areas[i] === value.nom_area) {
          const newArray = newArea.atividades;
          newArray.push(value);
          newArea.atividades = newArray;
          const newPct =
            (newArea.totalAtividades * newArea.pctTotalConcluido +
              value.pct_real) /
            (newArea.totalAtividades + 1);
          newArea.pctTotalConcluido = newPct;
          newArea.totalAtividades += 1;
          newArea.status[
            validateDate(
              Number(value.pct_plan),
              Number(value.comp_pct),
              Number(value.pct_real)
            )
          ].qtde += 1;
        }
      });
      newData.push(newArea);
    }
    setData(newData);
  };

  useEffect(() => {
    setTimeout(() => {
      requestHandler();
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Sidebar>
        {!loading ? (
          <ContainerPagina>
            <TituloPagina botaoVoltar={true}>Visão Por Área</TituloPagina>

            <Flex
              direction={"column"}
              justify={"space-between"}
              gap={6}
              wrap={"wrap"}
              mb={4}
            >
              <Flex gap={2} wrap={"wrap"}>
                <BotaoVisaoGeral />
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
                  Visão Por Precedentes
                </Button>
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
            </Flex>

            <Flex align={"center"} justify={"center"} direction={"column"}>
              {data.map((area: Area, index: number) => (
                <AccordionArea key={index} area={area} />
              ))}
            </Flex>
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

export default VisaoPorArea;
