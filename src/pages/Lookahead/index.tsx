import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

import {
  Box,
  Flex,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  Text,
  FormControl,
  Select,
  Button,
} from "@chakra-ui/react";
import { AtividadesLookahead } from "interfaces/lookahead";

import Sidebar from "components/SideBar";

import { useLookahead } from "hooks/useLookahead";

import { getAtividades } from "services/get/Lookahead";

import { TabelaLookahead } from "./components/TabelaLookahead";
// import { useState } from "react";
// import { Projetos } from "interfaces/Projetos";

export function Lookahead() {
  const { projetos } = useLookahead();
  const [atividades, setAtividades] = useState<AtividadesLookahead[]>();
  // const [projects, setProjetcs] = useState<Projetos[]>();
  // const [projectsFiltered, setProjetcsFiltered] = useState<Projetos[]>();
  async function handleProjectChange(id: string) {
    const act = await getAtividades(+id);
    setAtividades(act);
  }

  const getAllActivities = async () => {
    const act = await getAtividades(0);
    setAtividades(act);
  };

  useEffect(() => {
    getAllActivities();
  }, []);

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
                  <Flex direction="row" justifyContent="flex-end">
                    <FormControl>
                      <Text
                        fontWeight={"bold"}
                        fontSize={"12px"}
                        color={"#949494"}
                      >
                        Projeto
                      </Text>
                      <Select
                        fontWeight={"bold"}
                        color={"#949494"}
                        placeholder="Projeto"
                        onChange={(e) => handleProjectChange(e.target.value)}
                      >
                        {projetos &&
                          projetos.map((d, k) => (
                            <option key={k} value={d.id}>
                              {d.nome_projeto.length > 20
                                ? `${d.id} - ${d.nome_projeto.substring(
                                    0,
                                    17
                                  )}...`
                                : `${d.id} - ${d.nome_projeto}`}
                            </option>
                          ))}
                      </Select>
                    </FormControl>

                    <Flex alignItems="flex-end" marginLeft="16px">
                      <Button
                        color="white"
                        background="origem.300"
                        variant="primary"
                        _hover={{
                          background: "origem.500",
                          transition: "all 0.4s",
                        }}
                        // onClick={filterByProject}
                        rightIcon={<FiSearch />}
                      >
                        Filtrar
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex justifyContent="flex-end">
                  {atividades && <TabelaLookahead data={atividades} />}
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Stack>
      </Sidebar>
    </div>
  );
}
