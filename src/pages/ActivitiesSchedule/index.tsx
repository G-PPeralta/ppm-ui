import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Flex, Button, Select, FormControl, FormLabel } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import ContainerPagina from "components/ContainerPagina";
// import SelectFiltragem from "components/SelectFiltragem";
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
  const [loadings, setLoadings] = useState(false);
  const [intervencaoIniciada, setIntervencaoIniciada] = useState<any>(false);

  const subTitulo = {
    sonda: `${state.poco.sonda.split(" - ")[1]}`,
    poco: `${state.poco.poco.split(" - ")[1]}`,
  };

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
    setTimeout(() => {
      requestHandler();
    }, 100);
  }, [refresh, atividades]);

  useEffect(() => {
    setLoadingCards(true);
    if (atividades.length > 0) {
      setLoadingCards(false);
    }
  }, [atividades]);

  useEffect(() => {
    setTimeout(() => {
      if (atividades.length === 0) {
        setLoadingCards(false);
        setLoadings(true);
      }
    }, 15000);
  }, [atividades]);

  return (
    <>
      <Sidebar>
        {!loading ? (
          <ContainerPagina>
            <TituloPagina botaoVoltar={true} subTitulo={subTitulo}>
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
                  atividades={atividades}
                  setRefresh={setRefresh}
                  refresh={refresh}
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
              <FormControl>
                <FormLabel
                  htmlFor="beneficio.opcao_id"
                  fontSize={"12px"}
                  fontWeight={"700"}
                  color={"#949494"}
                  mb={"1px"}
                >
                  FASE
                </FormLabel>
                <Select
                  // mt={"-9px"}
                  h={"56px"}
                  w={"530px"}
                  fontSize={"14px"}
                  fontWeight={"400"}
                  // color={"#A7A7A7"}
                  isRequired
                  placeholder="Selecione a fase"
                  id="fase"
                  name="fase"
                  // value={beneficio}
                  // onChange={(event) => setBeneficio(event.target.value)}
                >
                  <option color={"#2D2926"}>1</option>
                </Select>
              </FormControl>
            </Flex>
            <Flex gap={4} wrap={"wrap"} flex={1} justify={"end"}>
              {statusProjeto.map((status, index) => {
                if (index !== 5) {
                  return (
                    <StatusProjeto
                      key={index}
                      status={status.status}
                      color={status.color}
                    />
                  );
                }
                return null;
              })}
            </Flex>

            <Flex direction={"row"} gap={4} py={4} wrap={"wrap"}>
              {!loadingCards &&
              optionsAreaAtuacao.length > 0 &&
              optionsResponsaveis.length > 0 ? (
                atividades.map((atividade, index) => (
                  <Flex
                    key={index}
                    direction={"column"}
                    align={"center"}
                    justify={"center"}
                    onDoubleClick={() => {
                      openDetails(atividade, index);
                    }}
                    _hover={{ cursor: "pointer" }}
                  >
                    <CardACT
                      atividade={atividade}
                      id={atividade}
                      setRefresh={setRefresh}
                      refresh={refresh}
                    />
                  </Flex>
                ))
              ) : (
                <Flex align={"center"} justify={"center"} w={"100%"} h={"50vh"}>
                  <Ring speed={2} lineWeight={5} color="blue" size={64} />
                </Flex>
              )}
            </Flex>
            {loadings && atividades.length === 0 && (
              <Flex align={"center"} justify={"center"} w={"100%"} h={"50vh"}>
                Não há atividades cadastradas
              </Flex>
            )}
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
