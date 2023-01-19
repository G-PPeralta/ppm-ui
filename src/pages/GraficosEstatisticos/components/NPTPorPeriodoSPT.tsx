//  CRIADO EM: 10/2022
//  AUTOR: Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Gtráfico por período.

import { useEffect, useLayoutEffect, useState } from "react";

import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import {
  Intervenções,
  NPTPorSPT,
  TempoTotal,
} from "interfaces/GraficoNPTPorSPT";

import StackedBarChart from "components/StackedBarChartGraphic";

import { getGraficoTempoPorSonda } from "services/get/GraficosEstatisticos";

import StatusIntervencao from "./StatusIntervencao";

interface Props {
  de: string;
  ate: string;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
}

interface Params {
  de: string;
  a: string;
  sonda: string;
}

export function GraficoNPTPorPeriodoSPT({
  de,
  ate,
  refresh,
  setRefresh,
}: Props) {
  const [chartData, setChartData] = useState<NPTPorSPT[]>([]);
  const [tempoTotal, setTempoTotal] = useState<TempoTotal[]>([]);
  const [intervençoes, setInterv] = useState<Intervenções[]>([]);

  const dataEntries2 = [
    { name: "Aguardando Outros", color: "#7030a0" },
    { name: "Informações Técnicas", color: "#00b0f0" },
    { name: "Condições Climáticas", color: "#00b050" },
    { name: "Recurso Cia", color: "#778bd7" },
    { name: "Recurso Origem", color: "#0047bb" },
    { name: "Manutenção", color: "#f4dd06" },
  ];

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const [width] = useWindowSize();

  const reqGet = async () => {
    const params: Params | any = {};
    if (de && ate) {
      params.de = de;
      params.a = ate;
    }
    const res = await getGraficoTempoPorSonda(params);

    const newData = res.data.map((e) => ({
      key: e.nom_sonda,
      Manutenção: Number(e.hrs_manutencao),
      "Recurso Origem": Number(e.hrs_recursos_origem),
      "Recurso Cia": Number(e.hrs_recursos_cia),
      "Condições Climáticas": Number(e.hrs_mudanca_climatica),
      "Informações Técnicas": Number(e.hrs_info_tecnicas),
      "Aguardando Outros": Number(e.hrs_outros),
    }));

    const dataTempo = res.data.map((dados) => ({
      tempoTotal: dados.hrs_total,
      hrs_recursos_origem: dados.hrs_recursos_origem,
      hrs_recursos_cia: dados.hrs_recursos_cia,
      hrs_mudanca_climatica: dados.hrs_mudanca_climatica,
      hrs_info_tecnicas: dados.hrs_info_tecnicas,
      hrs_hrs_outros: dados.hrs_outros,
      intervencao: dados.intervencao,
    }));

    setInterv(dataTempo[0].intervencao[0]);
    setTempoTotal(dataTempo);
    setChartData(newData);
  };

  useEffect(() => {
    reqGet();
  }, [refresh]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // projectsForm.handleSubmit(e);
        }}
      >
        <Flex
          flexDirection={useBreakpointValue({
            base: "column",
            md: "column",
          })}
          gap={4}
        >
          <Flex direction={"column"}>
            <Flex>
              <Text fontSize={"24px"} fontWeight={"700"} color={"#2D2926"}>
                Relatório Tempo NPT por período/SPT
              </Text>
            </Flex>
            <Flex direction={"row"} gap={2}>
              <Text fontSize={"20px"} fontWeight={"700"} color={"#0047BB"}>
                TEMPO TOTAL AGUARDADO:
              </Text>
              <Text fontSize={"20px"} fontWeight={"700"} color={"#2D2926"}>
                {tempoTotal.map((tempo) => (
                  <Text>{tempo.tempoTotal} HORAS</Text>
                ))}
              </Text>
            </Flex>

            <Flex gap={2} wrap={"wrap"}>
              {intervençoes.map((status, index) => (
                <StatusIntervencao
                  key={index}
                  status={status.status}
                  color={status.color}
                />
              ))}
            </Flex>
          </Flex>
          <Box
            overflowX={"scroll"}
            w={innerWidth > 428 ? width * 0.7 : width * 0.85}
            h={460}
            display={"flex"}
            overflowY={"hidden"}
          >
            <Flex>
              <StackedBarChart
                showY={true}
                sizeW={1000}
                sizeH={352}
                data={chartData}
                dataEntries={dataEntries2}
                barW={56}
              />
            </Flex>
          </Box>
        </Flex>
      </form>
    </>
  );
}
