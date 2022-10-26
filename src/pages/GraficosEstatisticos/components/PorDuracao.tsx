import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { FiPlus } from "react-icons/fi";

import {
  Box,
  // Box,
  // Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  // Stack,
  Text,
  useBreakpointValue,
  // useColorModeValue,
} from "@chakra-ui/react";
// import { Ring } from "@uiball/loaders";

import StackedBarChart from "components/StackedBarChartGraphic";

import {
  getSondas,
  // getOperacoes,
  getGraficoHistorico,
} from "services/get/GraficosEstatisticos";

export function GraficoPorDuracao({ de, ate, refresh, setRefresh }: any) {
  const [listaSondas, setListaSondas] = useState<any[]>([]);
  const [selectedSonda, setSelectedSonda] = useState<any>();
  const [chartData, setChartData] = useState<any[]>([]);

  // const [loading, setLoading] = useState(true);
  const durationHistory = [
    "Mínimo - 8 horas",
    "Médio - 16 horas",
    "Máxima - 12 horas",
  ];

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
    // const operacao = await getOperacoes();
    const params: any = {};
    if (de && ate) {
      params.de = de;
      params.a = ate;
    }
    if (selectedSonda) {
      params.sonda = selectedSonda;
    }

    const historico = await getGraficoHistorico(params);

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

    setChartData(newData);
    setListaSondas(sondasSortedOptions);
    // setOperacao(operacao.data);
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
      {/* {loading && (
        <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
          <Ring speed={2} lineWeight={5} color="blue" size={64} />
        </Flex>
      )} */}
      {/* <Stack spacing="8"> */}
      {/* <Flex
        w={"auto"}
        align="center"
        justify="center"
        bg={useBreakpointValue({ base: "white", sm: "#EDF2F7" })}
      > */}
      {/* <Box
          py={{ base: "6", sm: "8" }}
          px={{ base: "6", sm: "10" }}
          w={"100%"}
          bg={useBreakpointValue({ base: "transparent", sm: "white" })}
          boxShadow={{
            base: "none",
            sm: useColorModeValue("md", "md-dark"),
          }}
          borderRadius={{ base: "none", sm: "xl" }}
        > */}
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
          {/* <Flex justifyContent={"space-between"}>
                <Flex align={"flex-end"}>
                  <FormControl mt={"-50px"}>
                    <FormLabel>
                      <Text
                        mb={"1px"}
                        fontSize={"24px"}
                        color={"black"}
                        fontWeight={"700"}
                        fontFamily={"Mulish"}
                      >
                        Gráficos estatísticos
                      </Text>
                    </FormLabel>
                  </FormControl>
                </Flex>
                <Prop />
              </Flex> */}
          {/* <Flex direction={"row"} mb={"10px"} gap={3}>
                <Flex alignItems={"flex-end"}>
                  <FormControl>
                    <FormLabel
                      mt={"-20px"}
                      fontSize={"12px"}
                      color={"#949494"}
                      fontWeight={"700"}
                      htmlFor="gera-grafico"
                    >
                      GERAR GRÁFICO POR
                    </FormLabel>
                    <Input
                      mt={"-9px"}
                      id="gera-grafico"
                      name="gera-grafico"
                      width={"480px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      placeholder="Histórico de durações"
                      _placeholder={{ color: "black" }}
                      fontSize={"14px"}
                      fontWeight={"400"}
                      // onChange={handleProjectChange}
                    ></Input>
                  </FormControl>
                </Flex>

                <Flex>
                  <FormControl>
                    <FormLabel
                      fontSize={"12px"}
                      color={"#949494"}
                      fontWeight={"700"}
                      htmlFor="de"
                    >
                      DE
                    </FormLabel>
                    <Input
                      mt={"-9px"}
                      id="de"
                      name="de"
                      width={"146px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      type={"date"}
                      mb={"-10px"}
                      color={"black"}
                      fontSize={"14px"}
                      fontWeight={"400"}
                    />
                  </FormControl>
                </Flex>

                <Flex>
                  <FormControl>
                    <FormLabel
                      alignItems={"flex-start"}
                      fontSize={"12px"}
                      color={"#949494"}
                      fontWeight={"700"}
                      htmlFor="ate"
                    >
                      ATÉ
                    </FormLabel>
                    <Input
                      mt={"-9px"}
                      id="ate"
                      name="ate"
                      width={"120px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      type={"date"}
                      color={"black"}
                      fontSize={"14px"}
                      fontWeight={"400"}
                    />
                  </FormControl>
                </Flex>
              </Flex> */}
          {/* <Flex flexDir={"column"} wrap={"wrap"} flex={1}> */}
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
                  // onChange={handleProjectChange}
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

            {/* <Flex alignItems={"flex-end"}>
              <FormControl>
                <FormLabel
                  fontSize={"12px"}
                  color={"#949494"}
                  fontWeight={"700"}
                  htmlFor="campo"
                >
                  OPERAÇÃO
                </FormLabel>
                <Select
                  mt={"-9px"}
                  id="campo"
                  name="campo"
                  width={"208px"}
                  height={"56px"}
                  borderRadius={"8px"}
                  placeholder="Operação"
                  // onChange={handleProjectChange}
                  color={"#2D2926"}
                  fontSize={"14px"}
                  fontWeight={"400"}
                >
                  {operacao.map((d) => (
                    <option>{d.nom_operacao}</option>
                  ))}
                </Select>
              </FormControl>
            </Flex> */}

            <Flex alignItems={"flex-end"}>
              <FormControl>
                <FormLabel htmlFor="base">
                  <Text fontSize={"12px"} color={"#949494"} fontWeight={"700"}>
                    BASE DA ZONA INTERVIDA MAIS PROFUNDA
                  </Text>
                </FormLabel>
                {/* <Input
                  placeholder="Base da zona intervida mais profunda"
                  mt={"-9px"}
                  id="base"
                  name="base"
                  width={"328px"}
                  height={"56px"}
                  borderRadius={"8px"}
                  // color={"#2D2926"}
                  fontSize={"14px"}
                  fontWeight={"400"}
                  _placeholder={{ color: "black" }}
                /> */}
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
                  // max="9999-12-31"
                  // maxLength={1}
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
                  // max="9999-12-31"
                  // maxLength={1}
                />
              </FormControl>
            </Flex>
          </Flex>
          <Flex flexDir={"row"} gap={4}>
            <Flex alignItems={"flex-end"}>
              <FormControl>
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
                  // onChange={handleProjectChange}
                  mt={"-9px"}
                  id="outro"
                  name="outro"
                  width={"146px"}
                  height={"56px"}
                  _placeholder={{ color: "black" }}
                  fontSize={"14px"}
                  // fontWeight={"400"}
                  borderRadius={"8px"}
                >
                  {durationHistory.map((d) => (
                    <option>{d}</option>
                  ))}
                </Select>
              </FormControl>
            </Flex>
            {/* </Flex> */}
            {/* <Flex>
              <FormControl className="toBottom">
                <Button
                  h={"56px"}
                  background={"#0047BB"}
                  border={"2.3px solid"}
                  color={"white"}
                  variant="primary"
                  _hover={{
                    background: "white",
                    color: "#0047BB",
                    transition: "all 0.4s",
                  }}
                  rightIcon={<FiPlus />}
                  fontSize={"18px"}
                  fontWeight={"700"}
                  borderRadius={"8px"}
                >
                  Gerar
                </Button>
              </FormControl>
            </Flex> */}
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
                8 HORAS
              </Text>
            </Flex>

            <Flex direction={"row"} gap={2}>
              <Text fontSize={"20px"} fontWeight={"700"} color={"#0047BB"}>
                Médio:
              </Text>
              <Text fontSize={"20px"} fontWeight={"700"} color={"black"}>
                16 HORAS
              </Text>
            </Flex>

            <Flex direction={"row"} gap={2}>
              <Text fontSize={"20px"} fontWeight={"700"} color={"#0047BB"}>
                Máxima:
              </Text>
              <Text fontSize={"20px"} fontWeight={"700"} color={"black"}>
                24 HORAS
              </Text>
            </Flex>

            <Flex direction={"row"} gap={2}>
              <Text fontSize={"20px"} fontWeight={"700"} color={"#0047BB"}>
                Tendência de duração:
              </Text>
              <Text fontSize={"20px"} fontWeight={"700"} color={"black"}>
                12 HORAS
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
            <Flex>
              <StackedBarChart
                showY={true}
                sizeW={1000}
                sizeH={352}
                data={chartData}
                dataEntries={dataEntries1}
                barW={44}
              />
            </Flex>
          </Box>
        </Flex>
        <Flex ref={componentRef} />
      </form>
    </>
  );
}
