import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

import {
  Box,
  Flex,
  Text,
  FormControl,
  Select,
  Button,
  FormLabel,
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
  const [idProject, setIdProject] = useState<string>("0");

  async function handleProjectChange() {
    const act = await getAtividades(+idProject);
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
        <Flex w={"auto"} align="center" justify="center" bg="#EDF2F7">
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
            <Flex direction="column" ml={-5}>
              <Flex align={"flex-end"} mt={-5}>
                <FormControl>
                  <FormLabel htmlFor="name">
                    <Text
                      mb={3}
                      fontSize={"24px"}
                      color={"#2D2926"}
                      fontWeight={"700"}
                      fontFamily={"Mulish"}
                    >
                      Relatório Lookahead
                    </Text>
                  </FormLabel>
                </FormControl>
              </Flex>
              <Flex direction="row" justifyContent="flex-start">
                <Flex direction="row" justifyContent="flex-end">
                  <FormControl>
                    <Text
                      fontWeight={"bold"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      PROJETO
                    </Text>
                    <Select
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      color={"#949494"}
                      placeholder="Projeto"
                      width={"146px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      onChange={(e) => setIdProject(e.target.value)}
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
                      h={"56px"}
                      background={"#0047BB"}
                      border={"2.3px solid"}
                      color={"white"}
                      variant="primary"
                      _hover={{
                        background: "white",
                        color: "#0047BB",
                        transition: "all 0.4s",
                      }}
                      rightIcon={<FiSearch />}
                      fontSize={"18px"}
                      fontWeight={"700"}
                      onClick={handleProjectChange}
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
      </Sidebar>
    </div>
  );
}
