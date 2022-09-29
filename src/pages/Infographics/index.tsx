import { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Heading,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";
import StatusProjeto from "components/StatusProjeto";

import { useFiltragemCampanha } from "hooks/useFiltragemCampanha";

import { postGetInfoCampanha } from "services/get/Infograficos";

import { statusProjeto } from "../../utils/validateDate";
import ColumnSPT from "./Components/ColumnSPT";
import ExibirModal from "./Components/ExibirModal";
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
  const [exibirDataInicio, setExibirDataInicio] = useState(true);
  const [exibirPctPlan, setExibirPctPlan] = useState(true);
  const [exibirPctReal, setExibirPctReal] = useState(true);

  const opcoesExibir = {
    exibirDataInicio,
    setExibirDataInicio,
    exibirPctPlan,
    setExibirPctPlan,
    exibirPctReal,
    setExibirPctReal,
  };

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
          <Stack spacing="8">
            <Flex w={"auto"} align="center" justify="center" bg={"#EDF2F7"}>
              <Box
                py={{ base: "6", sm: "8" }}
                px={{ base: "6", sm: "8" }}
                w={"100%"}
                bg={"white"}
                borderRadius={{ base: "xl", sm: "xl" }}
              >
                <Flex justify={"space-between"} mb={5} wrap={"wrap"}>
                  <Heading as="h3" size="md" mb={3} mt={innerWidth}>
                    Acompanhamento de poços
                  </Heading>
                  <Flex gap={4}>
                    <ExibirModal opcoesExibir={opcoesExibir} />
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
                  gap={6}
                  wrap={"wrap"}
                  mb={4}
                >
                  <Flex gap={2} wrap={"wrap"}>
                    <ModalNovaCampanha
                      refresh={refresh}
                      setRefresh={setRefresh}
                    />
                    <ModalCadastrarSonda />
                    <ModalCadastroPoco />
                    <ModalCadastroAtividade />
                    <ModalCadastroProjetoTipo
                      refresh={refresh}
                      setRefresh={setRefresh}
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
                <Flex align={"center"} justify={"center"}>
                  {campanhas.length !== 0 ? (
                    <Box
                      overflowX={{ base: "scroll" }}
                      display={"flex"}
                      flexDirection={"row"}
                      gap={10}
                      py={4}
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
                            opcoesExibir={opcoesExibir}
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
