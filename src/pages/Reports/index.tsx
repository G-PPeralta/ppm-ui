import { useState, useRef } from "react";
import { FiPlusCircle, FiPrinter } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
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
  Link,
} from "@chakra-ui/react";

import Sidebar from "components/SideBar";

import { Avanco } from "./components/avanco";
import { Evolucao } from "./components/evolucao";
import { Indicadores } from "./components/indicadores";
import { PanoramaGeral } from "./components/panoramaGeral";
import { Pendencias } from "./components/pendencias";
import { PrevistoXRealizado } from "./components/previstoXRealizado";

export interface ReportTypeProps {
  name: string;
  value: string;
}

const reports: ReportTypeProps[] = [
  { name: "Panorama Geral dos projetos", value: "1" },
  { name: "Pendências de Projeto", value: "2" },
  { name: "Indicadores", value: "3" },
  { name: "Evolução dos projetos", value: "4" },
  { name: "Previsto x Realizado", value: "5" },
  { name: "Avanço Físico x Avanço Financeiro", value: "6" },
];

const projects: ReportTypeProps[] = [
  { name: "Projeto 1", value: "1" },
  { name: "Projeto 2", value: "2" },
  { name: "Projeto 3", value: "3" },
  { name: "Projeto 4", value: "4" },
  { name: "Projeto 5", value: "5" },
  { name: "Projeto 6", value: "6" },
];

function handleReportButton(report: string) {
  return (
    <>
      {report == "1" && <PanoramaGeral />}
      {report == "2" && <Pendencias />}
      {report == "3" && <Indicadores />}
      {report == "4" && <Evolucao />}
      {report == "5" && <PrevistoXRealizado />}
      {report == "6" && <Avanco />}
    </>
  );
}

export function Reports() {
  const [report, setReport] = useState("0");

  let initialValue = "0";

  const componentRef = useRef<HTMLDivElement>(null);

  const width = useBreakpointValue({
    base: "mobile",
    sm: "mobile",
    md: "mobile",
    lg: "desktop",
    xl: "desktop",
  });

  return (
    <>
      <Sidebar>
        <Stack>
          <Box
            paddingTop={{ base: "5", sm: "10" }}
            paddingBottom={{ base: "5", sm: "10" }}
            px={{ base: "4", sm: "10" }}
            bg={useBreakpointValue({ base: "white", sm: "white" })}
            boxShadow={{
              base: "none",
              sm: useColorModeValue("md", "md-dark"),
            }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Flex justify={"space-between"} alignItems={"center"} mb={5}>
              <Flex direction={"row"} alignItems={"center"}>
                <Link href="javascript:history.back()">
                  <IoIosArrowBack
                    size={useBreakpointValue({ base: "20", sm: "38" })}
                  />
                </Link>
                <Heading
                  as="h3"
                  size={useBreakpointValue({ base: "md", sm: "lg" })}
                >
                  GERAR RELATÓRIO
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
              <Flex flexDirection="column" gap={"2"} alignItems={"end"}>
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
                        initialValue = e.target.value;
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
                      onClick={() => setReport(initialValue)}
                    >
                      Gerar
                    </Button>
                  </FormControl>
                </Flex>
                {(report == "6" || report == "5" || report == "2") && (
                  <FormControl maxW={"30%"}>
                    <FormLabel htmlFor="report" color={"gray.400"}>
                      PROJETO
                    </FormLabel>
                    <Select
                      id="poloId"
                      name="pole"
                      width={"100%"}
                      placeholder="Selecione"
                    >
                      {projects &&
                        projects.map((reportType) => (
                          <option value={reportType.value}>
                            {reportType.name}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                )}
              </Flex>
            ) : (
              <Flex flexDirection="row" gap={"4"} alignItems={"end"}>
                <FormControl maxW={{ base: "100%", sm: "30%" }}>
                  <FormLabel htmlFor="report" color={"gray.400"}>
                    TIPO DO RELATÓRIO
                  </FormLabel>
                  <Select
                    id="poloId"
                    name="pole"
                    width={"100%"}
                    placeholder="Selecione"
                    onChange={(e) => {
                      initialValue = e.target.value;
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
                  <FormControl maxW={{ base: "100%", sm: "30%" }}>
                    <FormLabel htmlFor="report" color={"gray.400"}>
                      PROJETO
                    </FormLabel>
                    <Select
                      id="poloId"
                      name="pole"
                      width={"100%"}
                      placeholder="Selecione"
                    >
                      {projects &&
                        projects.map((reportType) => (
                          <option value={reportType.value}>
                            {reportType.name}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                )}
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
                    onClick={() => setReport(initialValue)}
                  >
                    Gerar
                  </Button>
                </FormControl>
              </Flex>
            )}

            <Flex ref={componentRef}>{handleReportButton(report)}</Flex>
          </Box>
        </Stack>
      </Sidebar>
    </>
  );
}
