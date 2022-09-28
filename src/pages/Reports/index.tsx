import { useState, useRef } from "react";
import { FiPlusCircle, FiPrinter } from "react-icons/fi";
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

import Sidebar from "components/SideBar";

import { Evolucao } from "./components/evolucao";
import { Indicadores } from "./components/indicadores";
import { PanoramaGeral } from "./components/panoramaGeral";
import { Pendencias } from "./components/pendencias copy";
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
];

function handleReportButton(report: string) {
  return (
    <>
      {report == "1" && <PanoramaGeral />}
      {report == "2" && <Pendencias />}
      {report == "3" && <Indicadores />}
      {report == "4" && <Evolucao />}
      {report == "5" && <PrevistoXRealizado />}
    </>
  );
}

export function Reports() {
  const [report, setReport] = useState("0");

  let initialValue = "0";

  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Sidebar>
        <Stack>
          <Box
            py={{ base: "0", sm: "16" }}
            px={{ base: "4", sm: "10" }}
            bg={useBreakpointValue({ base: "transparent", sm: "white" })}
            boxShadow={{
              base: "none",
              sm: useColorModeValue("md", "md-dark"),
            }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Flex justify={"space-between"}>
              <Heading as="h3" size="md" mb={5}>
                GERAR RELATÓRIO
              </Heading>
              <ReactToPrint
                trigger={() => (
                  <Button
                    variant="ghost"
                    colorScheme="messenger"
                    rightIcon={<FiPrinter />}
                    disabled={report == "0" || report == ""}
                  >
                    Exportar
                  </Button>
                )}
                content={() => componentRef.current}
              />
            </Flex>
            <Flex flexDirection="row" gap={"4"}>
              <FormControl>
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
              <FormControl className="toBottom">
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
            <Flex ref={componentRef}>{handleReportButton(report)}</Flex>
          </Box>
        </Stack>
      </Sidebar>
    </>
  );
}
