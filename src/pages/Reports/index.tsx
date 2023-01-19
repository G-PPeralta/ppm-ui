//  CRIADO EM: 7/2022
//  AUTOR: Yolanda Ferreira.
//  DESCRIÇÃO DO ARQUIVO: Tela de relatórios

import { useState, useRef, useEffect } from "react";
import { FiPlus, FiPlusCircle, FiPrinter } from "react-icons/fi";
import ReactToPrint from "react-to-print";

import {
  FormControl,
  Stack,
  FormLabel,
  Box,
  Select,
  useBreakpointValue,
  useColorModeValue,
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { Projetos } from "interfaces/Projetos";

import Sidebar from "components/SideBar";

import { useProjects } from "hooks/useProjects";

import { Avanco } from "./components/Avanco/avanco";
import { Evolucao } from "./components/evolucao";
import { Indicadores } from "./components/Indicadores";
import { PanoramaGeral } from "./components/PanoramaGeral";
import { Pendencias } from "./components/pendencias";
import { PrevistoXRealizado } from "./components/PrevistoxRealizado/previstoXRealizado";

export interface ReportTypeProps {
  name: string;
  value: string;
}

const reports: ReportTypeProps[] = [
  { name: "Panorama Geral dos projetos", value: "1" },
  { name: "Indicadores", value: "3" },
  { name: "Previsto x Realizado", value: "5" },
];

export function Reports() {
  const { getProjetosDetalhados } = useProjects();

  const [report, setReport] = useState("0");
  const [gerar, setGerar] = useState(false);
  const [projetos, setProjetos] = useState<Projetos[]>();
  const [projeto, setProjeto] = useState<Projetos>();

  const getProjectsPerPolo = async () => {
    const data = await getProjetosDetalhados();
    setProjetos(data);
  };

  useEffect(() => {
    getProjectsPerPolo();
  }, []);

  const componentRef = useRef<HTMLDivElement>(null);

  const width = useBreakpointValue({
    base: "mobile",
    sm: "mobile",
    md: "mobile",
    lg: "desktop",
    xl: "desktop",
  });

  function changeProjeto(value: any) {
    const _projeto = projetos?.find(
      (x) => x.id_projeto_real == value.target.value
    );
    setProjeto(_projeto);
  }

  function handleReportButton(report: string) {
    return (
      <>
        {report == "1" && <PanoramaGeral />}
        {report == "2" && projeto && <Pendencias data={projeto} />}
        {report == "3" && <Indicadores />}
        {report == "4" && <Evolucao />}
        {report == "5" && projeto && <PrevistoXRealizado data={projeto} />}
        {report == "6" && <Avanco />}
      </>
    );
  }

  return (
    <>
      <Sidebar>
        <Stack>
          <Box
            py={{ base: "5", sm: "24px" }}
            px={{ base: "4", sm: "24px" }}
            bg={useBreakpointValue({ base: "white", sm: "white" })}
            boxShadow={{
              base: "none",
              sm: useColorModeValue("md", "md-dark"),
            }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Flex justify={"space-between"} alignItems={"center"}>
              <Flex direction={"row"} alignItems={"center"}>
                <Heading
                  mb={"24px"}
                  fontSize={"24px"}
                  color={"#2D2926"}
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                >
                  Gerar Relatório
                </Heading>
              </Flex>
              {width === "mobile" ? (
                <ReactToPrint
                  trigger={() => (
                    <Button
                      variant="ghost"
                      colorScheme="messenger"
                      disabled={report == "0" || report == "" || report == "3"}
                    >
                      <FiPrinter />
                    </Button>
                  )}
                  content={() => componentRef.current}
                />
              ) : (
                <ReactToPrint
                  trigger={() => (
                    <Button
                      variant="ghost"
                      colorScheme="messenger"
                      rightIcon={<FiPrinter />}
                      disabled={report == "0" || report == "" || report == "3"}
                    >
                      Exportar
                    </Button>
                  )}
                  content={() => componentRef.current}
                />
              )}
            </Flex>

            {width === "mobile" ? (
              <Flex flexDirection="column" gap={"2"}>
                <Flex direction={"row"} gap={"4"}>
                  <FormControl maxW={"100%"}>
                    <FormLabel htmlFor="report" color={"gray.400"}>
                      TIPO DO RELATÓRIO
                    </FormLabel>
                    <Select
                      id="poloId"
                      name="pole"
                      width={"100%"}
                      placeholder="Selecione"
                      onChange={(e) => {
                        setGerar(false);
                        setReport(e.target.value);
                      }}
                    >
                      {reports &&
                        reports.map((reportType) => (
                          <option value={reportType.value}>
                            {reportType.name}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                  <FormControl className="toBottom" maxW={"fit-content"}>
                    <Button
                      color="white"
                      background="origem.300"
                      variant="primary"
                      _hover={{
                        background: "origem.500",
                        transition: "all 0.4s",
                      }}
                      rightIcon={<FiPlusCircle />}
                      onClick={() => setGerar(true)}
                    >
                      Gerar
                    </Button>
                  </FormControl>
                </Flex>
                {(report == "6" || report == "5" || report == "2") && (
                  <FormControl maxW={"100%"}>
                    <FormLabel htmlFor="report" color={"gray.400"}>
                      PROJETO
                    </FormLabel>
                    <Select
                      id="poloId"
                      name="pole"
                      width={"100%"}
                      placeholder="Selecione"
                      onChange={changeProjeto}
                    >
                      {projetos &&
                        projetos.map((reportType) => (
                          <option value={reportType.id_projeto_real}>
                            {reportType.nome_projeto}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                )}
              </Flex>
            ) : (
              <Flex flexDirection="row" gap={"4"} alignItems={"end"}>
                <FormControl maxW={"30%"}>
                  <FormLabel
                    htmlFor="report"
                    fontSize={"12px"}
                    color={"#A7A7A7"}
                    fontWeight={"700"}
                  >
                    TIPO DO RELATÓRIO
                  </FormLabel>
                  <Select
                    fontSize={"14px"}
                    fontWeight={"400"}
                    _placeholder={{ color: "#2D2926" }}
                    mt={"-6px"}
                    h={"56px"}
                    id="poloId"
                    name="pole"
                    width={"100%"}
                    placeholder="Selecione"
                    onChange={(e) => {
                      setGerar(false);
                      setReport(e.target.value);
                    }}
                  >
                    {reports &&
                      reports.map((reportType) => (
                        <option value={reportType.value}>
                          {reportType.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
                {(report == "6" || report == "5" || report == "2") && (
                  <FormControl maxW={"30%"}>
                    <FormLabel
                      htmlFor="report"
                      fontSize={"12px"}
                      color={"#A7A7A7"}
                      fontWeight={"700"}
                    >
                      PROJETO
                    </FormLabel>
                    <Select
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="poloId"
                      name="pole"
                      width={"100%"}
                      placeholder="Selecione"
                      onChange={changeProjeto}
                    >
                      {projetos &&
                        projetos.map((projeto) => (
                          <option value={projeto.id_projeto_real}>
                            {projeto.nome_projeto}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                )}
                <FormControl className="toBottom" maxW={"fit-content"}>
                  <Button
                    h={"56px"}
                    fontSize={"18px"}
                    fontWeight={"700"}
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
                    onClick={() => setGerar(true)}
                  >
                    Gerar
                  </Button>
                </FormControl>
              </Flex>
            )}
            {gerar === true ? (
              <Flex ref={componentRef}>{handleReportButton(report)}</Flex>
            ) : (
              <Flex></Flex>
            )}
          </Box>
        </Stack>
      </Sidebar>
    </>
  );
}
