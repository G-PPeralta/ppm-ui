import { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

import {
  Box,
  Flex,
  Text,
  FormControl,
  Select,
  Heading,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { AtividadesLookahead } from "interfaces/lookahead";

import BotaoSetaVoltar from "components/BotaoSetaVoltar/BotaoSetaVoltar";
import ContainerPagina from "components/ContainerPagina";
import Sidebar from "components/SideBar";

// import { FiPlusCircle, FiSearch } from "react-icons/fi";

import { getAtividade, getFerramentasServicos } from "services/get/Lookahead";

import { ModalAddAtividade } from "../components/ModalAddAtividade";
import { TabelaAtividades } from "../components/TabelaAtividades";
import { TabelaFerramentas } from "../components/TabelaFerramentas";
import { TabelaServicos } from "../components/TabelaServicos";

interface Weeks {
  id: string;
  value: string;
}

export function LookaheadDetalhe() {
  const { id } = useParams();
  const [weeks, setWeeks] = useState<Weeks[]>();
  const [semana, setSemana] = useState<string>();
  const [ferramentasServicos, setFerramentasServicos] = useState<any>();
  const [atividade, setAtividade] = useState<AtividadesLookahead[]>();

  const loadAtividade = async () => {
    if (id) {
      const act = await getAtividade(+id);
      setAtividade(act);
    } else return null;
  };

  const loadFerramentasServicos = async () => {
    const fs = id ? await getFerramentasServicos(+id) : undefined;
    setFerramentasServicos(fs);
  };

  function getWeeks() {
    const dataBr = Intl.DateTimeFormat("pt-BR");
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;
    const last = first + 6;

    const monday = new Date(today.setDate(first));
    const sunday = new Date(today.setDate(last));
    const diaInicial = dataBr.format(monday);
    const diaFinal = dataBr.format(sunday);
    const x = [];
    x.push({
      id: diaInicial,
      value: `${diaInicial} - ${diaFinal}`,
    });

    changeWeek(`${diaInicial} - ${diaFinal}`);
    const monday2 = new Date(today.setDate(first + 7));
    const sunday2 = new Date(today.setDate(last + 8));
    const diaInicial2 = dataBr.format(monday2);
    const diaFinal2 = dataBr.format(sunday2);

    x.push({
      id: diaInicial2,
      value: `${diaInicial2} - ${diaFinal2}`,
    });

    setWeeks(x);
  }

  useEffect(() => {
    loadAtividade();
  }, []);

  useEffect(() => {
    loadFerramentasServicos();
    getWeeks();
  }, []);

  function changeWeek(value: string) {
    setSemana(value);
  }

  return (
    <>
      {atividade && ferramentasServicos ? (
        <Sidebar>
          <ContainerPagina>
            <Flex direction="column">
              <Flex align={"center"} gap={2} mb={4}>
                <Flex ml={-3} mt={-8} mr={-2}>
                  <BotaoSetaVoltar />
                </Flex>
                <Flex direction={"column"}>
                  <Heading
                    mt={-1}
                    fontFamily={"Mulish"}
                    fontWeight={"700"}
                    // as="h3"
                    // size="md"
                    textAlign={"center"}
                    fontSize={"24px"}
                  >
                    Relatório Lookahead
                  </Heading>
                  <Text
                    fontFamily={"Mulish"}
                    fontSize="20px"
                    color="#585858"
                    fontWeight="400"
                  >
                    {atividade[0].nom_atividade}
                  </Text>
                </Flex>
              </Flex>

              <Flex
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-end"
              >
                <Flex alignItems="flex-end">
                  <FormControl>
                    <Text
                      fontWeight={"bold"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      SEMANA
                    </Text>
                    <Select
                      fontSize={"14px"}
                      fontWeight={"400"}
                      // _placeholder={{ color: "#2D2926" }}
                      // color={"#949494"}
                      width={"218px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      onChange={(e) => changeWeek(e.target.value)}
                      icon={<FaRegCalendarAlt />}
                    >
                      {weeks &&
                        weeks.map(function (x, i) {
                          return (
                            <option key={i} value={x.id}>
                              {x.value}
                            </option>
                          );
                        })}
                    </Select>
                  </FormControl>
                  <FormControl marginLeft="16px">
                    {id && <ModalAddAtividade id={+id} />}
                  </FormControl>
                </Flex>
              </Flex>

              <Flex direction="column">
                {ferramentasServicos && (
                  <TabelaAtividades
                    semana={semana}
                    data={ferramentasServicos}
                  />
                )}
                {ferramentasServicos ? (
                  <TabelaFerramentas
                    semana={semana}
                    data={ferramentasServicos}
                  />
                ) : (
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    h={"84vh"}
                  >
                    <Ring speed={2} lineWeight={5} color="blue" size={64} />
                  </Box>
                )}
                {ferramentasServicos ? (
                  <TabelaServicos semana={semana} data={ferramentasServicos} />
                ) : (
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    h={"84vh"}
                  >
                    <Ring speed={2} lineWeight={5} color="blue" size={64} />
                  </Box>
                )}
              </Flex>
            </Flex>
            {/* </Box> */}
            {/* </Flex> */}
          </ContainerPagina>
        </Sidebar>
      ) : (
        <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
          <Ring speed={2} lineWeight={5} color="blue" size={64} />
        </Flex>
      )}
    </>
  );
}
