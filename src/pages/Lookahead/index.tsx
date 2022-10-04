import { FiSearch } from "react-icons/fi";

import {
  Box,
  Flex,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  Text,
  FormControl,
  FormLabel,
  Select,
  Button,
} from "@chakra-ui/react";

import Sidebar from "components/SideBar";

import { useBudgets } from "hooks/useBudgets";
import { useLookahead } from "hooks/useLookahead";

import { TabelaLookahead } from "./components/TabelaLookahead";

export function Lookahead() {
  const {
    budgetFilter,
    // loading,
    // wd,
    projects,
    handleProjectChange,
    filterByProject,
  } = useBudgets();

  const { projetos } = useLookahead();

  // const [projetos, setProjetos] = useState<Project[]>();

  // const getProjects = async () => {
  //   const data = await getAllProjects("");
  //   console.log("projetos", data);
  //   setProjetos(data);
  // };
  // useEffect(() => {
  //   getProjects();
  // }, []);

  return (
    <div>
      <Sidebar>
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
              <Flex direction="column">
                <Text fontWeight="bold">Relatorio Lookahead</Text>
                <Flex direction="row" justifyContent="flex-end">
                  <Flex>
                    <FormControl>
                      <FormLabel>Projeto</FormLabel>
                      <Select
                        placeholder="Select option"
                        onChange={handleProjectChange}
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
                        background="origem.300"
                        variant="primary"
                        _hover={{
                          background: "origem.500",
                          transition: "all 0.4s",
                        }}
                        onClick={filterByProject}
                        rightIcon={<FiSearch />}
                      >
                        Buscar
                      </Button>
                    </FormControl>
                  </Flex>
                </Flex>

                <Flex>
                  {budgetFilter && <TabelaLookahead data={projetos} />}
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Stack>
      </Sidebar>
    </div>
  );
}
