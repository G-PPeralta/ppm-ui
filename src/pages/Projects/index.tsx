import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Select,
  Text,
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
              py={{ base: "6", sm: "8" }}
              px={{ base: "6", sm: "10" }}
              w="100%"
              bg="white"
              boxShadow={{
                base: "none",
                sm: "md",
              }}
              borderRadius={{ base: "none", sm: "xl" }}
            >
              <Flex direction="column" ml={-5} mt={-5}>
                <Flex
                  justify={"space-between"}
                  mb={2}
                  wrap={"wrap"}
                  align={"center"}
                >
                  <FormLabel htmlFor="name">
                    <Text
                      mb={3}
                      fontSize={"24px"}
                      color={"#2D2926"}
                      fontWeight={"700"}
                      fontFamily={"Mulish"}
                    >
                      Projetos
                    </Text>
                  </FormLabel>
                </Flex>

                <Flex direction={"column"}>
                  <Flex mb="16px">
                    <Link to={"/projetos/cadastro"}>
                      <Button
                        h={"56px"}
                        borderRadius={"10px"}
                        background={"white"}
                        border={"2px solid"}
                        color={"origem.500"}
                        _hover={{
                          border: "2px solid",
                          borderColor: "origem.500",
                          background: "origem.500",
                          transition: "all 0.4s",
                          color: "white",
                        }}
                        rightIcon={<FiPlus />}
                      >
                        Cadastrar Projeto
                      </Button>
                    </Link>
                  </Flex>
                  <Flex align={"end"} wrap={"wrap"}>
                    <Flex direction={"column"} mr="16px">
                      <Text
                        fontWeight={"bold"}
                        fontSize={"12px"}
                        color={"#949494"}
                      >
                        PROJETOS
                      </Text>
                      <Input
                        h={"56px"}
                        fontWeight={"bold"}
                        width={"170px"}
                        color={"#949494"}
                        isRequired
                        placeholder="Projeto"
                        id="name"
                        type="text"
                        name="name"
                        onChange={(e) => filterProjects(e.target.value)}
                      />
                    </Flex>
                    <Flex direction={"column"} mr="16px">
                      <Text
                        fontWeight={"bold"}
                        fontSize={"12px"}
                        color={"#949494"}
                      >
                        POLO
                      </Text>

                      <Select
                        h={"56px"}
                        id="poloId"
                        fontWeight={"bold"}
                        name="pole"
                        color={"#949494"}
                        onChange={(e) => setPolo(e.target.value)}
                        width={300}
                      >
                        <option value="0">Todos</option>
                        <option value="1">Tucano Sul</option>
                        <option value="2">Alagoas</option>
                      </Select>
                    </Flex>
                    <Flex>
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
                  </Flex>
                </Flex>

                {projetosFilter && (
                  <Flex flex={1}>
                    <TabelaProjetos data={projetosFilter} />
                  </Flex>
                )}
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
