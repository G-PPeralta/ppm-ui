import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

import {
  Box,
  Button,
  Flex,
  FormControl,
  // FormLabel,
  // Input,
  // Select,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { Budget } from "models/Budget.model";

import Sidebar from "components/SideBar";

import { useBudgets } from "hooks/useBudgets";

// import ProjectTable from "./projectTable";
import { TabelaBudgets } from "./Components/TabelaBudgets";

export function Budgets() {
  const { /* projectsForm, */ loading, getAllBudgets } = useBudgets();

  const [polo /* setPolo */] = useState("0");
  //  const [ /* budgets,  setBudgets */ ] = useState<Budget[]>();
  const [budgetFilter, setBudgetsFilter] = useState<Budget[]>();
  const wd = window.innerWidth;

  const gerarBudgetsList = async () => {
    const data = await getAllBudgets(polo);
    // setBudgets(data);
    setBudgetsFilter(data);
  };

  useEffect(() => {
    gerarBudgetsList();
  }, []);

  /* const filterProjects = (text: string) => {
    let filtered;
    if (text && text.length > 3) {
      filtered = projetos?.filter(
        (x) => x.nome.toLowerCase().indexOf(text.toLowerCase()) > -1
      );
    } else {
      filtered = projetos;
    }

    if (filtered) {
      setProjetosFilter([...filtered]);
    }
  }; */

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
                      <FormControl className="toBottom">
                        <Button
                          color="white"
                          background="origem.300"
                          variant="primary"
                          _hover={{
                            background: "origem.500",
                            transition: "all 0.4s",
                          }}
                          rightIcon={<FiSearch />}
                          // onClick={getProjectsPerPolo}
                        >
                          Buscar
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
