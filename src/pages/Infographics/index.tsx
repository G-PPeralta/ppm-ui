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

import { getInfoCampanha } from "services/get/Infograficos";

import { statusProjeto } from "../../utils/validateDate";
import ColumnSPT from "./Components/ColumnSPT";
import ExibirModal from "./Components/ExibirModal";
import FiltrosModal from "./Components/FiltrosModal";
import ModalCadastrarSonda from "./Components/ModalCadastrarSonda";
import ModalCadastroAtividade from "./Components/ModalCadastroAtividade";
import ModalCadastroPoco from "./Components/ModalCadastroPoco";
import ModalCadastroProjetoTipo from "./Components/ModalCadastroProjetoTipo";
import ModalIntervencao from "./Components/ModalIntervencao";
import ModalNovaCampanha from "./Components/ModalNovaCampanha";

export function Infographics() {
  const [loading, setLoading] = useState(true);
  const [campanhas, setCampanhas] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const innerWidth = useBreakpointValue({ base: 0, md: 1, lg: 2, xl: 3 });

  const handleGetCampanha = async () => {
    const response = await getInfoCampanha();
    setCampanhas(response.data);
    setLoading(false);
  };

  useEffect(() => {
    handleGetCampanha();
  }, []);

  useEffect(() => {
    handleGetCampanha();
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
                    <ExibirModal />
                    <FiltrosModal />
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
                    <ModalCadastroProjetoTipo />
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
                  <Box
                    overflowX={{ base: "scroll" }}
                    display={"flex"}
                    flexDirection={"row"}
                    gap={10}
                    py={4}
                  >
                    {campanhas &&
                      campanhas.map((column, index) => (
                        <Flex
                          key={index}
                          direction={"column"}
                          gap={4}
                          align={"center"}
                          justify={"space-between"}
                        >
                          <ColumnSPT column={column} />
                          <ModalIntervencao />
                        </Flex>
                      ))}
                  </Box>
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
