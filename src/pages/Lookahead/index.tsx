//  CRIADO EM: 10/2022
//  AUTOR: Maxwell.
//  DESCRIÇÃO DO ARQUIVO: Tela de lookahead

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

export function Lookahead() {
  const { getProjetos, loading } = useLookahead();
  const [atividades, setAtividades] = useState<AtividadesLookahead[]>();
  const [filtered, setFiltered] = useState<AtividadesLookahead[]>();
  const [idProject, setIdProject] = useState<string>("0");

  const [projetos, setProjetos] = useState<ProjetosLookahead[]>();

  const getAllActivities = async () => {
    const act = await getAtividades(0);
    setAtividades(act);
    setFiltered(act);
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

  async function handleFilter() {
    if (Number(idProject) === 0) {
      return setFiltered(atividades);
    }
    if (atividades) {
      const filteredActivity = atividades.filter(
        (b) => b.id_projeto === Number(idProject)
      );
      setFiltered(filteredActivity);
    }
  }

  return (
    <Sidebar>
      {!loading ? (
        <ContainerPagina>
          <Flex direction="column" fontFamily="Mulish">
            <Flex align={"flex-end"}>
              <FormControl mt={-1} ml={-1}>
                <TituloPagina botaoVoltar={false}>
                  Relatório Lookahead
                </TituloPagina>
              </FormControl>
            </Flex>
            <Flex direction="row" justifyContent="flex-start">
              <Flex direction="row" justifyContent="flex-end" ml={-1}>
                <FormControl>
                  <Text fontWeight={"bold"} fontSize={"12px"} color={"#949494"}>
                    PROJETO
                  </Text>
                  <Select
                    fontSize={"14px"}
                    fontWeight={"400"}
                    width={"208px"}
                    height={"56px"}
                    borderRadius={"8px"}
                    placeholder="Projeto"
                    onChange={(e) => setIdProject(e.target.value)}
                  >
                    <option value={0}>Todos</option>
                    {projetos &&
                      projetos.map((d, k) => (
                        <option key={k} value={d.id}>
                          {d.nome_projeto.length > 20
                            ? `${d.nome_projeto.substring(0, 17)}...`
                            : `${d.nome_projeto}`}
                        </option>
                      ))}
                  </Select>
                </FormControl>

                <Flex alignItems="flex-end" marginLeft="16px">
                  <Button
                    h={"58px"}
                    w={"117px"}
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
                    borderRadius={"8px"}
                    fontFamily={"Mulish"}
                    onClick={handleFilter}
                  >
                    Filtrar
                  </Button>
                </Flex>
              </Flex>
            </Flex>

            <Flex justifyContent="flex-end" ml={-1} mr={-1}>
              {filtered && (
                <TabelaLookahead data={filtered} projetos={projetos} />
              )}
            </Flex>
          </Flex>
        </ContainerPagina>
      ) : (
        <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
          <Ring speed={2} lineWeight={5} color="blue" size={64} />
        </Flex>
      )}
    </Sidebar>
  );
}
