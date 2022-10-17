import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Flex,
  Text,
  FormControl,
  Select,
  FormLabel,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";

// import { FiPlusCircle, FiSearch } from "react-icons/fi";

import { getAtividade } from "services/get/Lookahead";

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
  const [atividade, setAtividade] = useState<any>();

  const loadAtividade = async () => {
    const atividade = id ? await getAtividade(+id) : undefined;
    setAtividade(atividade);
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
    getWeeks();
  }, []);

  function changeWeek(value: string) {
    setSemana(value);
  }

  return (
    <>
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
            <Flex direction="column" ml={-5} mt={-5}>
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
              <Text>{atividade && atividade.id}</Text>
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
                      id="poloId"
                      name="pole"
                      color={"#949494"}
                      width={250}
                      marginRight="16px"
                      onChange={(e) => changeWeek(e.target.value)}
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
                  <FormControl>
                    {id && <ModalAddAtividade id={+id} />}
                  </FormControl>
                </Flex>
              </Flex>

              <Flex direction="column">
                {atividade && (
                  <TabelaAtividades semana={semana} data={atividade} />
                )}
                {atividade ? (
                  <TabelaFerramentas semana={semana} data={atividade} />
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
                {atividade ? (
                  <TabelaServicos semana={semana} data={atividade} />
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
          </Box>
        </Flex>
      </Sidebar>
    </>
  );
}
