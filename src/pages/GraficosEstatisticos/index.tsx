// import { useEffect, useState } from "react";
import { useRef, useState } from "react";
// import { CSVLink } from "react-csv";
// import { AiFillPrinter } from "react-icons/ai";
// import { FaFileCsv } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
// @ts-ignore
import Pdf from "react-to-pdf";

// import ReactToPrint from "react-to-print";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
// import { Ring } from "@uiball/loaders";
import moment from "moment";

import Sidebar from "components/SideBar";

import { GraficoNPTPorPeriodoSPT } from "./components/NPTPorPeriodoSPT";
import { GraficoCIP } from "./components/ParaCIP";
import { GraficoSPT } from "./components/ParaSPT";
import { GraficoPorCadaIntervencao } from "./components/PorCadaIntervencao";
import { GraficoPorDuracao } from "./components/PorDuracao";

export function GráficosEstatisticos() {
  const [graphic, setGraphic] = useState("0");
  const [init, setInit] = useState("0");
  const [loading, setLoading] = useState(true);
  const [de, setDe] = useState<string>("");
  const [ate, setAte] = useState<string>("");
  const [refresh, setRefresh] = useState(false);

  interface TypeProps {
    name: string;
    value: string;
  }

  const graphics: TypeProps[] = [
    { name: "Histórico de durações", value: "1" },
    { name: "Relatório de cada intervenção", value: "2" },
    { name: "Relatório Tempo NPT por período / SPT", value: "3" },
    { name: "Relatório para cada SPT", value: "4" },
    { name: "Relatório para a CIP", value: "5" },
  ];

  const x = (prop: string) => {
    if (prop === "1") {
      return `historico_de_duracoes_${moment().format("DDMMYYYY_hhmmss")}`;
    }
    if (prop === "2") {
      return `relatorio_de_cada_intervencao_${moment().format(
        "DDMMYYYY_hhmmss"
      )}`;
    }
    if (prop === "3") {
      return `relatorio_tempo_npt_por_periodo_spt_${moment().format(
        "DDMMYYYY_hhmmss"
      )}`;
    }
    if (prop === "4") {
      return `relatorio_para_cada_spt${moment().format("DDMMYYYY_hhmmss")}`;
    }
    if (prop === "5") {
      return `relatorio_para_a_cip_${moment().format("DDMMYYYY_hhmmss")}`;
    }
    return `grafico_${moment().format("DDMMYYYY_hhmmss")}`;
  };

  function handleGraphicButton(graphic: string) {
    return (
      <>
        {graphic == "1" && (
          <GraficoPorDuracao
            de={de}
            ate={ate}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        )}
        {graphic == "2" && (
          <GraficoPorCadaIntervencao
            de={de}
            ate={ate}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        )}
        {graphic == "3" && (
          <GraficoNPTPorPeriodoSPT
            de={de}
            ate={ate}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        )}
        {graphic == "4" && (
          <GraficoSPT
            de={de}
            ate={ate}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        )}
        {graphic == "5" && (
          <GraficoCIP
            de={de}
            ate={ate}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        )}
      </>
    );
  }

  const componentRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setGraphic(init);
    setRefresh(!refresh);
    setLoading(false);
  };

  return (
    <>
      <Sidebar>
        {/* {loading && (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )} */}
        {/* {loading && ( */}

        <Flex w={"auto"} align="center" justify="center" bg="#EDF2F7">
          <Box
            py={{ base: "6", sm: "8" }}
            px={{ base: "6", sm: "10" }}
            w="100%"
            // minH={"100vh"}
            bg="white"
            boxShadow={{
              base: "none",
              sm: "md",
            }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // projectsForm.handleSubmit(e);
              }}
            >
              <Flex flexDirection={"column"}>
                <Flex justifyContent={"space-between"}>
                  <Flex align={"flex-end"} mt={-4} ml={-5}>
                    <FormControl>
                      <FormLabel htmlFor="name">
                        <Text
                          mb={3}
                          fontSize={"24px"}
                          color={"#2D2926"}
                          fontWeight={"700"}
                          fontFamily={"Mulish"}
                        >
                          Gráficos Estatísticos
                        </Text>
                      </FormLabel>
                    </FormControl>
                  </Flex>
                  <Flex>
                    <Pdf targetRef={componentRef.current} filename={x(graphic)}>
                      {/* @ts-ignore */}
                      {({ toPdf }) => (
                        <Button
                          // width={"77px"}
                          onClick={toPdf}
                          height={"23px"}
                          variant="ghost"
                          fontSize={"18px"}
                          fontWeight={"700"}
                          color={"#0047BB"}
                          rightIcon={<FaFilePdf />}
                          _hover={{
                            background: "white",
                            color: "#0047BB",
                            transition: "all 0.4s",
                          }}
                          disabled={graphic == "0" || graphic == ""}
                        >
                          Exportar
                        </Button>
                      )}
                    </Pdf>
                  </Flex>
                </Flex>
                <Flex flexDir={"column"} gap={6}>
                  <Flex
                    direction={"row"}
                    gap={4}
                    wrap={"wrap"}
                    flex={1}
                    ml={-5}
                  >
                    <Flex alignItems={"flex-end"}>
                      <FormControl>
                        <FormLabel
                          fontSize={"12px"}
                          color={"#A7A7A7"}
                          fontWeight={"700"}
                          htmlFor="gera-grafico"
                        >
                          GERAR GRÁFICO POR
                        </FormLabel>
                        <Select
                          fontSize={"14px"}
                          fontWeight={"400"}
                          _placeholder={{ color: "#2D2926" }}
                          mt={"-6px"}
                          id="gera-grafico"
                          name="gera-grafico"
                          // width={"480px"}
                          height={"56px"}
                          borderRadius={"8px"}
                          placeholder="Tipo de gráfico"
                          onChange={(event) => setInit(event.target.value)}
                        >
                          {graphics &&
                            graphics.map((reportType) => (
                              <option value={reportType.value}>
                                {reportType.name}
                              </option>
                            ))}
                        </Select>
                      </FormControl>
                    </Flex>

                    <Flex>
                      <FormControl>
                        <FormLabel
                          fontSize={"12px"}
                          color={"#A7A7A7"}
                          fontWeight={"700"}
                          htmlFor="de"
                        >
                          DE
                        </FormLabel>
                        <Input
                          fontSize={"14px"}
                          fontWeight={"400"}
                          _placeholder={{ color: "#2D2926" }}
                          mt={"-6px"}
                          id="de"
                          name="de"
                          width={"146px"}
                          height={"56px"}
                          borderRadius={"8px"}
                          type={"date"}
                          onChange={(event) => setDe(event.target.value)}
                          max="9999-12-31"
                          maxLength={1}
                        />
                      </FormControl>
                    </Flex>

                    <Flex>
                      <FormControl>
                        <FormLabel
                          fontSize={"12px"}
                          color={"#A7A7A7"}
                          fontWeight={"700"}
                          htmlFor="ate"
                          alignItems={"flex-start"}
                        >
                          <Text>ATÉ</Text>
                        </FormLabel>
                        <Input
                          fontSize={"14px"}
                          fontWeight={"400"}
                          _placeholder={{ color: "#2D2926" }}
                          mt={"-6px"}
                          id="ate"
                          name="ate"
                          width={"146px"}
                          height={"56px"}
                          borderRadius={"8px"}
                          type={"date"}
                          pattern={"d{4}-d{2}-d{2}"}
                          onChange={(event) => setAte(event.target.value)}
                          max="9999-12-31"
                          maxLength={1}
                        />
                      </FormControl>
                    </Flex>

                    <Flex>
                      <FormControl className="toBottom">
                        <Button
                          h={"56px"}
                          // w={"98px"}
                          background={"origem.500"}
                          border={"2.3px solid"}
                          color={"white"}
                          variant="primary"
                          _hover={{
                            background: "origem.600",
                            color: "white",
                            transition: "all 0.4s",
                          }}
                          rightIcon={<FiPlus />}
                          fontSize={"18px"}
                          fontWeight={"700"}
                          onClick={handleClick}
                        >
                          Gerar
                        </Button>
                      </FormControl>
                    </Flex>
                  </Flex>
                  <Flex ref={componentRef} ml={-5} wrap={"wrap"} flex={1}>
                    {handleGraphicButton(graphic)}
                  </Flex>
                </Flex>
                {loading && (
                  <Text
                    fontWeight={"400"}
                    fontSize={"14px"}
                    align={"center"}
                    color={"#A1A1A1"}
                    mt={"190px"}
                  >
                    Selecione um tipo de Gráfico
                  </Text>
                )}
              </Flex>
            </form>
          </Box>
        </Flex>

        {/* )} */}
      </Sidebar>
    </>
  );
}
