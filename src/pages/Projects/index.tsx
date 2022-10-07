import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { Projetos } from "interfaces/Projetos";

import Sidebar from "components/SideBar";

import { useProjects } from "hooks/useProjects";

import "./projects.css";
import { TabelaProjetos } from "./Components/TabelaProjetos";

export function Projects() {
  const { loading, getProjetosDetalhados } = useProjects();

  const [, setPolo] = useState("0");
  const [projetos, setProjetos] = useState<Projetos[]>();
  const [projetosFilter, setProjetosFilter] = useState<Projetos[]>();
  const wd = window.innerWidth;

  const innerWidth = useBreakpointValue({ base: 0, md: 1, lg: 2, xl: 3 });

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
        {!loading ? (
          <Flex w={"auto"} align="center" justify="center" bg={"#EDF2F7"}>
            <Box
              py={{ base: "6", sm: "6" }}
              px={{ base: "6", sm: "8" }}
              w={"100%"}
              bg={"white"}
              borderRadius={{ base: "xl", sm: "xl" }}
            >
              <Flex
                justify={"space-between"}
                mb={2}
                wrap={"wrap"}
                align={"center"}
              >
                <Heading
                  as="h3"
                  size="md"
                  mb={2}
                  mt={innerWidth}
                  textAlign={"center"}
                >
                  Projetos
                </Heading>
              </Flex>
              <Flex
                direction={"column"}
                justify={"space-between"}
                gap={4}
                wrap={"wrap"}
                mb={2}
                flex={1}
              >
                <Flex gap={2} wrap={"wrap"} flex={1}>
                  <Button
                    variant="outline"
                    colorScheme="messenger"
                    rightIcon={<FiPlus color="#0047BB" />}
                    width={200}
                  >
                    <Link to={"/projects-registration"}>Cadastrar Projeto</Link>
                  </Button>
                </Flex>
              </Flex>

              <Stack spacing="5">
                <Flex
                  flexDirection={wd > 600 ? "row" : "column"}
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
                <Flex flex={1}>
                  <TabelaProjetos data={projetosFilter} />
                </Flex>
              )}
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
