import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Flex, Button } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import ContainerPagina from "components/ContainerPagina";
import Sidebar from "components/SideBar";
import TituloPagina from "components/TituloPagina";

import { statusProjeto } from "utils/validateDate";

import { useRequests } from "hooks/useRequests";

import { getAtividadesCampanha } from "services/get/ActivitiesSchedule";

import StatusProjeto from "../../components/StatusProjeto";
import BotaoVisaoPorArea from "./Components/BotaoVisaoPorArea";
import CardACT from "./Components/CardACT";
// import ModalAtividade from "./Components/ModalAtividade";
import ModalCadastroAtividadeIntervencao from "./Components/ModalCadastroAtividadeIntervencao";
import ModalEditarAtividade from "./Components/ModalEditarAtividade";

export function ActivitiesSchedule() {
  const { optionsAreaAtuacao, optionsResponsaveis } = useRequests();

  const listaOptions = {
    optionsAreaAtuacao,
    optionsResponsaveis,
  };

  const navigate = useNavigate();
  const { state }: any = useLocation();
  const { id } = useParams();
  const [poco, setPoco] = useState(true);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState("");
  const [openIndex, setOpenIndex] = useState("");
  const [atividades, setAtividades] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loadingCards, setLoadingCards] = useState(true);
  const [intervencaoIniciada, setIntervencaoIniciada] = useState<any>(false);

  const requestHandler = async () => {
    const response = await getAtividadesCampanha(id);
    setAtividades(response.data);
  };

  const openDetails = (atividade: any, index: any) => {
    setOpenId(atividade);
    setOpenIndex(index);
  };

  useEffect(() => {
    setPoco(state.poco);
    setIntervencaoIniciada(state.intervencaoFoiIniciada);
    requestHandler();
    setLoading(false);
  }, []);

  useEffect(() => {
    requestHandler();
  }, [refresh]);

  useEffect(() => {
    if (atividades.length > 0) {
      setLoadingCards(false);
    }
  }, [atividades]);

  console.log("intervencaoIniciada", intervencaoIniciada);

  return (
    <>
      <Sidebar>
        {!loading ? (
          <ContainerPagina>
            <TituloPagina botaoVoltar={true}>
              Acompanhamento de Atividades
            </TituloPagina>

            <Flex
              direction={"column"}
              justify={"space-between"}
              gap={4}
              wrap={"wrap"}
              mb={4}
            >
              <Flex gap={2} wrap={"wrap"} flex={1}>
                <ModalCadastroAtividadeIntervencao
                  id={id}
                  setRefresh={setRefresh}
                  refresh={refresh}
                  atividades={atividades}
                />
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
                    navigate(`precedentes`, {
                      state: {
                        poco,
                      },
                    });
                  }}
                >
                  Visão Por Precedentes
                </Button>
                <BotaoVisaoPorArea />
              </Flex>
            </Flex>
            <Flex gap={4} wrap={"wrap"} flex={1} justify={"end"}>
              {statusProjeto.map((status, index) => (
                <StatusProjeto
                  key={index}
                  status={status.status}
                  color={status.color}
                />
              ))}
            </Flex>

            <Flex direction={"row"} gap={4} py={4} wrap={"wrap"}>
              {!loadingCards ? (
                atividades.map((atividade, index) => (
                  <Flex
                    key={index}
                    direction={"column"}
                    align={"center"}
                    justify={"center"}
                    onClick={() => openDetails(atividade, index)}
                    _hover={{ cursor: "pointer" }}
                  >
                    <CardACT atividade={atividade} />
                  </Flex>
                ))
              ) : (
                <Flex align={"center"} justify={"center"} w={"100%"} h={"50vh"}>
                  <Ring speed={2} lineWeight={5} color="blue" size={64} />
                </Flex>
              )}
            </Flex>
            {openId && optionsAreaAtuacao.length > 0 ? (
              <ModalEditarAtividade
                listaPrecedentes={atividades}
                id={id}
                index={openIndex}
                atividade={openId}
                onClose={() => setOpenId("")}
                setRefresh={setRefresh}
                refresh={refresh}
                listaOptions={listaOptions}
                poco={poco}
                intervencaoIniciada={intervencaoIniciada}
              />
            ) : undefined}
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
