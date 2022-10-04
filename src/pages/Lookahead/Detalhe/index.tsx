import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Flex,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  Text,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";

import Sidebar from "components/SideBar";

// import { FiPlusCircle, FiSearch } from "react-icons/fi";
import { useLookahead } from "hooks/useLookahead";

import { ModalAddAtividade } from "../components/ModalAddAtividade";
import { TabelaAtividades } from "../components/TabelaAtividades";
import { TabelaFerramentas } from "../components/TabelaFerramentas";
import { TabelaServicos } from "../components/TabelaServicos";

const LookaheadData = [
  {
    id: 1,
    projeto: "SPT - 123",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    projeto: "SPT - 001",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    projeto: "SPT - 002",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 4,
    projeto: "SPT - 003",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 5,
    projeto: "SPT - 004",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 6,
    projeto: "SPT - 005",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 7,
    projeto: "SPT - 006",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 8,
    projeto: "SPT - 007",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 9,
    projeto: "SPT - 008",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 10,
    projeto: "SPT - 009",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 11,
    projeto: "SPT - 0010",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 12,
    projeto: "SPT - 0011",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

interface Weeks {
  id: string;
  value: string;
}

export function LookaheadDetalhe() {
  const { id } = useParams();
  const { atividades } = useLookahead();
  const [weeks, setWeeks] = useState<Weeks[]>();
  const [semana, setSemana] = useState<string>();

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
    const monday2 = new Date(today.setDate(first + 8));
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
    getWeeks();
  }, []);

  function changeWeek(value: string) {
    setSemana(value);
  }

  return (
    <>
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
                <Text>
                  {id && LookaheadData.find((x) => x.id == +id)?.projeto}
                </Text>
                <Flex
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <Flex alignItems="flex-end">
                    <FormControl>
                      <ModalAddAtividade />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="pole">SEMANA</FormLabel>
                      <Select
                        id="poloId"
                        name="pole"
                        width={250}
                        marginRight="15px"
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
                  </Flex>
                </Flex>

                <Flex direction="column">
                  <TabelaAtividades semana={semana} data={atividades} />
                  <TabelaFerramentas semana={semana} />
                  <TabelaServicos />
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Stack>
      </Sidebar>
    </>
  );
}
