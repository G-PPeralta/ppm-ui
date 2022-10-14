import { FiSearch } from "react-icons/fi";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Select,
  // FormLabel,
  // Input,
  // Select,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";

import { useBudgets } from "hooks/useBudgets";

// import ProjectTable from "./projectTable";
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
        {loading && (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}
        <Stack spacing="8">
          <Flex
            w={useBreakpointValue({ base: "100%", md: "auto" })}
            align="center"
            justify="center"
            bg={useBreakpointValue({ base: "white", sm: "#EDF2F7" })}
          >
            <Box
              py={{ base: "0", sm: "16" }}
              px={{ base: "4", sm: "10" }}
              w={useBreakpointValue({
                base: "20rem",
                sm: "35rem",
                md: "60rem",
                lg: "80rem",
              })}
              bg={useBreakpointValue({ base: "transparent", sm: "white" })}
              boxShadow={{
                base: "none",
                sm: useColorModeValue("md", "md-dark"),
              }}
              borderRadius={{ base: "none", sm: "xl" }}
            >
              <Heading as="h2" size="lg" textAlign={"start"}>
                Gerencial do Orçamento
              </Heading>
              <Box display={wd > 100 ? "flex" : ""}>
                <Stack spacing="6" w="100%">
                  <Stack spacing="5">Projetos</Stack>
                  <Stack spacing="5">
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                    >
                      <FormControl>
                        <FormLabel>Projeto</FormLabel>
                        <Select
                          placeholder="Todos"
                          onChange={handleProjectChange}
                          height={"56px"}
                        >
                          {projects &&
                            projects.map((d) => (
                              <option value={d.id}>{d.nome}</option>
                            ))}
                        </Select>
                      </FormControl>

                      <FormControl className="toBottom">
                        <Button
                          color="white"
                          background="origem.500"
                          height={"56px"}
                          variant="primary"
                          _hover={{
                            background: "origem.600",
                            transition: "all 0.4s",
                          }}
                          rightIcon={<FiSearch />}
                          onClick={filterByProject}
                        >
                          Filtrar
                        </Button>
                      </FormControl>
                    </Flex>
                  </Stack>

                  {budgetFilter && (
                    <>
                      {/* <ProjectTable
                            data={projetosFilter}
                            columns={columnsProject}
                          /> */}
                      <TabelaBudgets data={budgetFilter} />
                    </>
                  )}
                </Stack>
              </Box>
            </Box>
          </Flex>
        </Stack>
      </Sidebar>
    </>
  );
}
