import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { Projetos } from "interfaces/Projetos";

import Sidebar from "components/SideBar";

import { useProjects } from "hooks/useProjects";

import { TabelaProjetos } from "./components/TabelaProjetos";
import "./projects.css";

export function Projects() {
  const { projectsForm, loading, getProjetosDetalhados } = useProjects();

  const [, setPolo] = useState("0");
  const [projetos, setProjetos] = useState<Projetos[]>();
  const [projetosFilter, setProjetosFilter] = useState<Projetos[]>();
  const wd = window.innerWidth;

  const getProjectsPerPolo = async () => {
    const data = await getProjetosDetalhados();
    setProjetos(data);
    setProjetosFilter(data);
  };

  const filterProjects = (text: string) => {
    let filtered;
    if (text && text.length > 3) {
      filtered = projetos?.filter(
        (x) => x.nome_projeto.toLowerCase().indexOf(text.toLowerCase()) > -1
      );
    } else {
      filtered = projetos;
    }

    if (filtered) {
      setProjetosFilter([...filtered]);
    }
  };

  useEffect(() => {
    getProjectsPerPolo();
  }, []);
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  projectsForm.handleSubmit(e);
                }}
              >
                <Box display={wd > 100 ? "flex" : ""}>
                  <Stack spacing="6" w="100%">
                    <Stack spacing="5">
                      Projetos
                      <Button
                        variant="outline"
                        colorScheme="messenger"
                        rightIcon={<FiPlus color="#0047BB" />}
                        width={200}
                      >
                        <Link to={"/projects-registration"}>
                          Cadastrar Projeto
                        </Link>
                      </Button>
                    </Stack>
                    <Stack spacing="5">
                      <Flex
                        flexDirection={useBreakpointValue({
                          base: "column",
                          md: "row",
                        })}
                        alignItems="flex-end"
                      >
                        <Flex direction={"column"}>
                          <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            PROJETOS
                          </Text>
                          <Input
                            h={"56px"}
                            w={"328px"}
                            marginRight="15px"
                            fontWeight={"bold"}
                            color={"#949494"}
                            isRequired
                            placeholder="Projeto"
                            id="name"
                            type="text"
                            name="name"
                            onChange={(e) => filterProjects(e.target.value)}
                          />
                        </Flex>
                        <Flex direction={"column"}>
                          <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            POLO
                          </Text>

                          <Select
                            h={"56px"}
                            w={"200px"}
                            id="poloId"
                            fontWeight={"bold"}
                            name="pole"
                            color={"#949494"}
                            onChange={(e) => setPolo(e.target.value)}
                            width={300}
                            marginRight="15px"
                          >
                            <option value="0">Todos</option>
                            <option value="1">Tucano Sul</option>
                            <option value="2">Alagoas</option>
                          </Select>
                        </Flex>
                        <Button
                          h={"56px"}
                          borderRadius={"10px"}
                          background={"origem.500"}
                          variant="primary"
                          color="white"
                          onClick={() => getProjectsPerPolo()}
                          _hover={{
                            background: "origem.600",
                            transition: "all 0.4s",
                          }}
                          rightIcon={<BsSearch />}
                          fontWeight={"bold"}
                        >
                          Filtrar
                        </Button>
                      </Flex>
                    </Stack>

                    {projetosFilter && (
                      <>
                        {/* <ProjectTable
                            data={projetosFilter}
                            columns={columnsProject}
                          /> */}
                        <TabelaProjetos data={projetosFilter} />
                      </>
                    )}
                  </Stack>
                </Box>
              </form>
            </Box>
          </Flex>
        </Stack>
      </Sidebar>
    </>
  );
}
