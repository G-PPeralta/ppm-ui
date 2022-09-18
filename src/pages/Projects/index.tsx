import { useState } from "react";
import { FiPlusCircle, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Column } from "react-table";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { Project } from "models/Project.model";

import Sidebar from "components/SideBar";

import { useProjects } from "hooks/useProjects";

import "./projects.css";
import ProjectTable from "./projectTable";

interface Projeto {
  id: number;
  nome: string;
  valorTotalPrevisto: string;
  prioridade: string;
  complexidade: string;
  responsavel: string;
  coordenador: string;
}

const columnsProject: Column<Projeto>[] = [
  {
    Header: "Nome",
    accessor: "nome",
  },
  {
    Header: "Total Previsto",
    accessor: "valorTotalPrevisto",
  },
  {
    Header: "Prioridade",
    accessor: "prioridade",
  },
  {
    Header: "Complexidade",
    accessor: "complexidade",
  },
  {
    Header: "Responsavel",
    accessor: "responsavel",
  },
  {
    Header: "Coordenador",
    accessor: "coordenador",
  },
];

export function Projects() {
  const { projectsForm, loading, getAllProjects } = useProjects();

  const [polo, setPolo] = useState("0");
  const [projetos, setProjetos] = useState<Project[]>();
  const [projetosFilter, setProjetosFilter] = useState<Project[]>();
  const wd = window.innerWidth;

  const getProjectsPerPolo = async () => {
    const data = await getAllProjects(polo);
    setProjetos(data);
    setProjetosFilter(data);
  };

  const filterProjects = (text: string) => {
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
  };

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
                        rightIcon={<FiPlusCircle />}
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
                      >
                        <FormControl>
                          <FormLabel htmlFor="name">PROJETO</FormLabel>
                          <Input
                            isRequired
                            placeholder="Nome do projeto"
                            id="name"
                            type="text"
                            name="name"
                            onChange={(e) => filterProjects(e.target.value)}
                            width={300}
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel htmlFor="pole">POLO</FormLabel>
                          <Select
                            id="poloId"
                            name="pole"
                            onChange={(e) => setPolo(e.target.value)}
                            width={300}
                          >
                            <option value="0">Todos</option>
                            <option value="1">Tucano Sul</option>
                            <option value="2">Alagoas</option>
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
                            rightIcon={<FiSearch />}
                            onClick={getProjectsPerPolo}
                          >
                            Buscar
                          </Button>
                        </FormControl>
                      </Flex>
                    </Stack>

                    <div className="table-container">
                      {projetosFilter && (
                        <>
                          <ProjectTable
                            data={projetosFilter}
                            columns={columnsProject}
                          />
                        </>
                      )}
                    </div>
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
