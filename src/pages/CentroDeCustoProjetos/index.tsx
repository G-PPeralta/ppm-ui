import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";

import { useFinanceiroProjetos } from "hooks/useFinanceiroProjetos";

import Tabela from "./components/Tabela";

export function CentroDeCustoProjetos() {
  const { loading } = useFinanceiroProjetos();
  const [filter, setFilter] = useState<any[]>([]);

  const handleGetAllData = async () => {
    setFilter([]);
  };

  useEffect(() => {
    handleGetAllData();
  }, []);

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
              <Flex mb={4} wrap={"wrap"} align={"center"} gap={2}>
                <Flex direction={"column"}>
                  <Flex align={"center"} gap={2} h={"56px"}>
                    <IconButton
                      aria-label="Botão Voltar"
                      icon={<IoIosArrowBack size={20} />}
                      borderRadius={"10px"}
                      background={"white"}
                      color={"origem.500"}
                      _hover={{
                        background: "origem.500",
                        transition: "all 0.4s",
                        color: "white",
                      }}
                      onClick={() => {
                        window.history.back();
                      }}
                    />
                    <Heading as="h3" size="md" textAlign={"center"}>
                      Centro de Custo
                    </Heading>
                  </Flex>
                  <Text
                    as="h4"
                    size="sm"
                    textAlign={"end"}
                    fontWeight={"semibold"}
                    mt={-3}
                  >
                    Carteira de Projetos
                  </Text>
                </Flex>
              </Flex>

              <Tabela data={filter} />
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
