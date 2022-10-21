import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

import { Flex, Text, FormControl, Select, Button } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { AtividadesLookahead, ProjetosLookahead } from "interfaces/lookahead";

import ContainerPagina from "components/ContainerPagina";
import Sidebar from "components/SideBar";
import TituloPagina from "components/TituloPagina";

import { useLookahead } from "hooks/useLookahead";

import { getAtividades } from "services/get/Lookahead";

import { TabelaLookahead } from "./components/TabelaLookahead";
// import { useState } from "react";
// import { Projetos } from "interfaces/Projetos";

export function Lookahead() {
  const { getProjetos, loading } = useLookahead();
  const [atividades, setAtividades] = useState<AtividadesLookahead[]>();
  const [idProject, setIdProject] = useState<string>("0");
  const [projetos, setProjetos] = useState<ProjetosLookahead[]>();

  async function handleProjectChange() {
    const act = await getAtividades(+idProject);
    setAtividades(act);
  }

  const getAllActivities = async () => {
    const act = await getAtividades(0);
    setAtividades(act);
  };

  const getAllProjects = async () => {
    const proj = await getProjetos();
    setProjetos(proj);
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  useEffect(() => {
    getAllActivities();
  }, []);

  return (
    <div>
      <Sidebar>
        {!loading ? (
          <ContainerPagina>
            <Flex direction="column" fontFamily="Mulish">
              <Flex align={"flex-end"}>
                <FormControl>
                  <TituloPagina botaoVoltar={true}>Lookahead</TituloPagina>
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
                      width={"146px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      placeholder="Projeto"
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
                      background={"origem.500"}
                      border={"2.3px solid"}
                      color={"white"}
                      variant="primary"
                      _hover={{
                        background: "origem.600",
                        color: "white",
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
          </ContainerPagina>
        ) : (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}
      </Sidebar>
    </div>
  );
}
