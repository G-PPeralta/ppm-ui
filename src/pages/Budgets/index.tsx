import { BsSearch } from "react-icons/bs";

import { Box, Button, Flex, Select, Text } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";
import TituloPagina from "components/TituloPagina";

import { useBudgets } from "hooks/useBudgets";

import { TabelaBudgets } from "./Components/TabelaBudgets";

export function Budgets() {
  const {
    budgetFilter,
    loading,
    wd,
    projects,
    handleProjectChange,
    filterByProject,
  } = useBudgets();

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
              <Flex ml={-3} mt={-1}>
                <TituloPagina>Gerencial do Orçamento</TituloPagina>
              </Flex>
              <Flex
                direction={wd > 600 ? "row" : "column"}
                wrap={"wrap"}
                alignItems="flex-end"
                justify={"space-between"}
                gap={4}
                flex={1}
              >
                <Flex align={"end"} gap={4} wrap={"wrap"} flex={1}>
                  <Flex direction={"column"} w={"208px"} ml={-3}>
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      PROJETO
                    </Text>
                    <Select
                      fontSize={"14px"}
                      fontWeight={"400"}
                      placeholder="Todos"
                      onChange={handleProjectChange}
                      height={"56px"}
                    >
                      {projects &&
                        projects.map((d) => (
                          <option value={d.id}>{d.nome}</option>
                        ))}
                    </Select>
                  </Flex>
                  <Flex flex={1}>
                    <Button
                      h={"56px"}
                      borderRadius={"8px"}
                      background={"origem.500"}
                      variant="primary"
                      color="white"
                      _hover={{
                        background: "origem.600",
                        transition: "all 0.4s",
                      }}
                      rightIcon={<BsSearch />}
                      fontSize="18px"
                      fontWeight={"700"}
                      fontFamily={"Mulish"}
                      onClick={filterByProject}
                    >
                      Filtrar
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
              <Flex ml={-3} mr={-3} flexDir={"column"}>
                {budgetFilter && <TabelaBudgets data={budgetFilter} />}
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
