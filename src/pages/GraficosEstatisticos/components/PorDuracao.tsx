import { useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  // Input,
  Select,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import StackedBarChart from "components/StackedBarChartGraphic";

import {
  getSondas,
  getLabelHistorico,
  getGraficoHistorico,
} from "services/get/GraficosEstatisticos";

export function GraficoPorDuracao({ de, ate, refresh, setRefresh }: any) {
  const [listaSondas, setListaSondas] = useState<any[]>([]);
  const [selectedSonda, setSelectedSonda] = useState<any>();
  const [chartData, setChartData] = useState<any[]>([]);
  const [historicoData, setHistorico] = useState<any>();
  const [label, setLabel] = useState({
    hrs_min: "",
    hrs_max: "",
    hrs_media: "",
    hrs_dp: "",
    tend_duracao: "",
  });

  // const durationHistory = [
  //   "Mínimo - 8 horas",
  //   "Médio - 16 horas",
  //   "Máxima - 12 horas",
  // ];

  const dataEntries1 = [{ name: "Durações", color: "#0047BB" }];

  const componentRef = useRef<HTMLDivElement>(null);

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
    const sondas = await getSondas();
    const params: any = {};
    if (de && ate) {
      params.de = de;
      params.a = ate;
      // console.log(params);
    }
    if (selectedSonda) {
      params.sonda = selectedSonda;
    }

    const labelReq = await getLabelHistorico();
    const historico = await getGraficoHistorico(params);
    setHistorico(historico.data);
    // console.log(historico.data);

    const newData = historico.data.map((e) => ({
      ...e,
      key: `${e.nom_poco}`,
      Durações: e.hrs_media,
    }));

    const sondasSorted = sondas.data.sort((a: any, b: any) =>
      a.nom_sonda.localeCompare(b.nom_sonda)
    );
    const sondasSortedOptions = sondasSorted.map((a: any) => ({
      value: a.id,
      label: a.nom_sonda,
    }));

    setLabel(labelReq.data[0]);
    setChartData(newData);
    setListaSondas(sondasSortedOptions);
  };

  const handleChange = (e: any) => {
    setSelectedSonda(e.target.value);
    setRefresh(!refresh);
  };

  useEffect(() => {
    reqGet();
  }, [refresh]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Flex
          flexDirection={useBreakpointValue({
            base: "column",
            md: "column",
          })}
          gap={4}
        >
          <Flex gap={4} wrap={"wrap"} flex={1}>
            <Flex alignItems={"flex-end"}>
              <FormControl>
                <FormLabel
                  fontSize={"12px"}
                  color={"#949494"}
                  fontWeight={"700"}
                  htmlFor="sonda"
                >
                  SONDA
                </FormLabel>
                <Select
                  placeholder="Sonda"
                  mt={"-9px"}
                  id="sonda"
                  name="sonda"
                  width={"208px"}
                  height={"56px"}
                  borderRadius={"8px"}
                  color={"black"}
                  fontSize={"14px"}
                  fontWeight={"400"}
                  onChange={handleChange}
                >
                  {listaSondas.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Flex>

            <Flex alignItems={"flex-end"}>
              {/* <FormControl>
                <FormLabel htmlFor="base">
                  <Text fontSize={"12px"} color={"#949494"} fontWeight={"700"}>
                    BASE DA ZONA INTERVIDA MAIS PROFUNDA
                  </Text>
                </FormLabel>

                <Input
                  mr={4}
                  fontSize={"14px"}
                  fontWeight={"400"}
                  _placeholder={{ color: "#2D2926" }}
                  mt={"-6px"}
                  id="ate"
                  name="ate"
                  width={"146px"}
                  height={"56px"}
                  borderRadius={"8px"}
                  type={"number"}
                  placeholder={"De"}
                />
                <Input
                  fontSize={"14px"}
                  fontWeight={"400"}
                  placeholder={"Até"}
                  _placeholder={{ color: "#2D2926" }}
                  mt={"-6px"}
                  id="ate"
                  name="ate"
                  width={"146px"}
                  height={"56px"}
                  borderRadius={"8px"}
                  type={"number"}
                />
              </FormControl> */}
            </Flex>
          </Flex>
          <Flex flexDir={"row"} gap={4}>
            <Flex alignItems={"flex-end"}>
              {/* <FormControl>
                <FormLabel
                  fontSize={"12px"}
                  color={"#949494"}
                  fontWeight={"700"}
                  htmlFor="outro"
                >
                  OUTRO
                </FormLabel>
                <Select
                  placeholder="Selecione"
                  mt={"-9px"}
                  id="outro"
                  name="outro"
                  width={"146px"}
                  height={"56px"}
                  _placeholder={{ color: "black" }}
                  fontSize={"14px"}
                  borderRadius={"8px"}
                >
                  {durationHistory.map((d) => (
                    <option>{d}</option>
                  ))}
                </Select>
              </FormControl> */}
            </Flex>
          </Flex>
          <Flex gap={1} direction={"column"}>
            <Flex>
              <Text
                mt={"5px"}
                fontSize={"24px"}
                fontWeight={"700"}
                color={"black"}
              >
                Histórico de durações
              </Text>
            </Flex>
            <Flex direction={"row"} gap={2}>
              <Text fontSize={"20px"} fontWeight={"700"} color={"#0047BB"}>
                Mínimo:
              </Text>
              <Text fontSize={"20px"} fontWeight={"700"} color={"black"}>
                {label.hrs_min} HORAS
              </Text>
            </Flex>

            <Flex direction={"row"} gap={2}>
              <Text fontSize={"20px"} fontWeight={"700"} color={"#0047BB"}>
                Médio:
              </Text>
              <Text fontSize={"20px"} fontWeight={"700"} color={"black"}>
                {label.hrs_media} HORAS
              </Text>
            </Flex>

            <Flex direction={"row"} gap={2}>
              <Text fontSize={"20px"} fontWeight={"700"} color={"#0047BB"}>
                Máxima:
              </Text>
              <Text fontSize={"20px"} fontWeight={"700"} color={"black"}>
                {label.hrs_max} HORAS
              </Text>
            </Flex>

            <Flex direction={"row"} gap={2}>
              <Text fontSize={"20px"} fontWeight={"700"} color={"#0047BB"}>
                Tendência de duração:
              </Text>
              <Text fontSize={"20px"} fontWeight={"700"} color={"black"}>
                {label.tend_duracao} HORAS
              </Text>
            </Flex>
          </Flex>
          <Box
            overflowX={"scroll"}
            w={innerWidth > 428 ? width * 0.7 : width * 0.85}
            h={460}
            display={"flex"}
            overflowY={"hidden"}
          >
            <>
              {historicoData && historicoData.length > 0 ? (
                <Flex direction={"column"}>
                  <StackedBarChart
                    showY={true}
                    sizeW={1000}
                    sizeH={352}
                    data={chartData}
                    dataEntries={dataEntries1}
                    barW={44}
                  />
                </Flex>
              ) : (
                <Flex align={"center"} justify={"center"} w={"100%"} h={"50vh"}>
                  Não há dados nesse período
                </Flex>
              )}
            </>
          </Box>
        </Flex>
        <Flex ref={componentRef} />
      </form>
    </>
  );
}
