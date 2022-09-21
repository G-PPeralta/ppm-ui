import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Box, Flex, Heading, Stack, Button } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";

import { statusProjeto } from "utils/validateDate";

import { getAtividadesCampanha } from "services/get/ActivitiesSchedule";

import StatusProjeto from "../../components/StatusProjeto";
import BotaoVisaoPorArea from "./Components/BotaoVisaoPorArea";
import CardACT from "./Components/CardACT";
// import ModalAtividade from "./Components/ModalAtividade";
import ModalCadastroAtividade from "./Components/ModalCadastroAtividade";
import ModalEditarAtividade from "./Components/ModalEditarAtividade";

export function ActivitiesSchedule() {
  const navigate = useNavigate();
  const { state }: any = useLocation();
  const { id } = useParams();
  const [poco, setPoco] = useState(true);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState("");
  const [atividades, setAtividades] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);

  const requestHandler = async () => {
    const response = await getAtividadesCampanha(id);
    setAtividades(response.data);
  };

  useEffect(() => {
    setPoco(state.poco);
    requestHandler();
    setLoading(false);
  }, []);

  useEffect(() => {
    requestHandler();
  }, [refresh]);

  const openDetails = (atividade: any) => {
    // console.log('atividade', atividade);
    setOpenId(atividade);
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
                    Acompanhamento de atividades
                  </Heading>
                </Flex>
                <Flex justify={"space-between"} gap={6} wrap={"wrap"} mb={4}>
                  <Flex gap={2}>
                    <ModalCadastroAtividade
                      id={id}
                      setRefresh={setRefresh}
                      refresh={refresh}
                    />
                    <Button
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
                      Visão por precedentes
                    </Button>
                    <BotaoVisaoPorArea />
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
                <Flex direction={"row"} gap={4} py={4} wrap={"wrap"}>
                  {atividades.map((atividade, index) => (
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
                  ))}
                </Flex>
                {openId ? (
                  // <ModalAtividade
                  //   id={id}
                  //   atividade={openId}
                  //   onClose={() => setOpenId("")}
                  // />
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
