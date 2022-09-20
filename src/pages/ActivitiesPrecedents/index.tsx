import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";

import { getAtividadesCampanha } from "services/get/ActivitiesSchedule";

import ModalCadastroAtividade from "../ActivitiesSchedule/Components/ModalCadastroAtividade";
import ExibirModal from "./components/ExibirModal";
import FiltrosModal from "./components/FiltrosModal";

export function ActivitiesPrecedents() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [atividades, setAtividades] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);

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
                <Flex
                  direction={"column"}
                  justify={"space-between"}
                  gap={6}
                  wrap={"wrap"}
                  mb={4}
                >
                  <Flex gap={2}>
                    <ModalCadastroAtividade
                      id={id}
                      setRefresh={setRefresh}
                      refresh={refresh}
                    />
                  </Flex>
                </Flex>
                <Flex direction={"row"} gap={4} py={4} wrap={"wrap"}>
                  {atividades.map((atividade, index) => (
                    <Flex
                      key={index}
                      direction={"column"}
                      align={"center"}
                      justify={"center"}
                      _hover={{ cursor: "pointer" }}
                    ></Flex>
                  ))}
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
