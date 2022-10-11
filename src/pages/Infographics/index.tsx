import { useEffect, useState } from "react";

import { Box, Flex, Heading, useBreakpointValue } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";
import StatusProjeto from "components/StatusProjeto";

import { useFiltragemCampanha } from "hooks/useFiltragemCampanha";

import { postGetInfoCampanha } from "services/get/Infograficos";

import { statusProjeto } from "../../utils/validateDate";
import ColumnSPT from "./Components/ColumnSPT";
import FiltrosModal from "./Components/FiltrosModal";
import ModalCadastrarSonda from "./Components/ModalCadastrarSonda";
import ModalCadastroAtividade from "./Components/ModalCadastroAtividade";
import ModalCadastroPoco from "./Components/ModalCadastroPoco";
import ModalCadastroProjetoTipo from "./Components/ModalCadastroProjetoTipo";
import ModalNovaCampanha from "./Components/ModalNovaCampanha";

export function Infographics() {
  const [loading, setLoading] = useState(true);
  const [campanhas, setCampanhas] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);

  const {
    registerForm,
    listaAreaAtuacao,
    listaPocos,
    listaTarefas,
    listaResponsaveis,
    listaSondas,
  } = useFiltragemCampanha();

  const listas = {
    registerForm,
    listaAreaAtuacao,
    listaPocos,
    listaTarefas,
    listaResponsaveis,
    listaSondas,
  };

  const innerWidth = useBreakpointValue({ base: 0, md: 1, lg: 2, xl: 3 });

  const handleGetAll = async () => {
    const campanhas = await postGetInfoCampanha(registerForm.values);
    setCampanhas(campanhas.data);
    setLoading(false);
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  useEffect(() => {
    handleGetAll();
  }, [refresh]);

  return (
    <>
      <Sidebar>
        {!loading ? (
          <Flex w={"auto"} align="center" justify="center" bg={"#EDF2F7"}>
            <Box
              py={{ base: "6", sm: "6" }}
              px={{ base: "6", sm: "8" }}
              w={"100%"}
              bg={"white"}
              borderRadius={{ base: "xl", sm: "xl" }}
            >
              <Flex
                justify={"space-between"}
                mb={2}
                wrap={"wrap"}
                align={"center"}
              >
                <Heading
                  as="h3"
                  size="md"
                  mb={2}
                  mt={innerWidth}
                  textAlign={"center"}
                >
                  Acompanhamento de Poços
                </Heading>
                <Flex gap={4}>
                  <FiltrosModal
                    refresh={refresh}
                    setRefresh={setRefresh}
                    listas={listas}
                    registerForm={registerForm}
                  />
                </Flex>
              </Flex>
              <Flex
                direction={"column"}
                justify={"space-between"}
                gap={4}
                wrap={"wrap"}
                mb={2}
                flex={1}
              >
                <Flex gap={2} wrap={"wrap"} flex={1}>
                  <ModalCadastrarSonda />
                  <ModalCadastroPoco />
                  <ModalCadastroAtividade />
                  <ModalCadastroProjetoTipo
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                  <ModalNovaCampanha
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
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
              </Flex>
              <Flex align={"center"} justify={"center"}>
                {campanhas.length !== 0 ? (
                  <Box
                    overflowX={{ base: "scroll" }}
                    display={"flex"}
                    flexDirection={"row"}
                    gap={10}
                    py={2}
                    flex={1}
                  >
                    {campanhas.map((column, index) => (
                      <Flex
                        key={index}
                        direction={"column"}
                        gap={4}
                        align={"end"}
                        justify={"space-between"}
                      >
                        <ColumnSPT
                          column={column}
                          refresh={refresh}
                          setRefresh={setRefresh}
                        />
                      </Flex>
                    ))}
                  </Box>
                ) : (
                  <Flex h={180} align={"center"} justify={"center"}>
                    <Heading as="h4" size="md">
                      Nenhuma campanha Cadastrada
                    </Heading>
                  </Flex>
                )}
              </Flex>
            </Box>
          </Flex>
        ) : (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}
      </Sidebar>
    </>
  );
}
