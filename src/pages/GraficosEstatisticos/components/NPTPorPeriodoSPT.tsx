// import { useLayoutEffect, useState } from "react";
// import { FiPlus } from "react-icons/fi";

import {
  // Box,
  // Button,
  Flex,
  // FormControl,
  // FormLabel,
  // Input,
  Stack,
  Text,
  useBreakpointValue,
  // useColorModeValue,
} from "@chakra-ui/react";
// import { Ring } from "@uiball/loaders";

import StackedBarChart from "components/StackedBarChartGraphic";

import StatusIntervencao from "./StatusIntervencao";

export function GraficoNPTPorPeriodoSPT({ Prop }: any) {
  const dataMock2 = [
    {
      month: "Pir-61",
      Manutenção: 10,
      "Recurso Origem": 20,
      "Recurso Cia": 10,
      "Condições Climáticas": 30,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-62",
      Manutenção: 5,
      "Recurso Origem": 5,
      "Recurso Cia": 10,
      "Condições Climáticas": 50,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-63",
      Manutenção: 5,
      "Recurso Origem": 5,
      "Recurso Cia": 10,
      "Condições Climáticas": 50,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-64",
      Manutenção: 10,
      "Recurso Origem": 20,
      "Recurso Cia": 10,
      "Condições Climáticas": 30,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-65",
      Manutenção: 10,
      "Recurso Origem": 20,
      "Recurso Cia": 10,
      "Condições Climáticas": 30,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-66",
      Manutenção: 5,
      "Recurso Origem": 5,
      "Recurso Cia": 10,
      "Condições Climáticas": 50,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-67",
      Manutenção: 10,
      "Recurso Origem": 20,
      "Recurso Cia": 10,
      "Condições Climáticas": 30,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-68",
      Manutenção: 20,
      "Recurso Origem": 20,
      "Recurso Cia": 20,
      "Condições Climáticas": 20,
      "Informações Técnicas": 20,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-69",
      Manutenção: 5,
      "Recurso Origem": 5,
      "Recurso Cia": 10,
      "Condições Climáticas": 50,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-70",
      Manutenção: 10,
      "Recurso Origem": 20,
      "Recurso Cia": 10,
      "Condições Climáticas": 30,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
    {
      month: "Pir-71",
      Manutenção: 10,
      "Recurso Origem": 10,
      "Recurso Cia": 10,
      "Condições Climáticas": 10,
      "Informações Técnicas": 10,
      "Aguardando Outros": 90,
    },
    {
      month: "Pir-72",
      Manutenção: 10,
      "Recurso Origem": 20,
      "Recurso Cia": 10,
      "Condições Climáticas": 30,
      "Informações Técnicas": 10,
      "Aguardando Outros": 20,
    },
  ];

  const dataEntries2 = [
    { name: "Aguardando Outros", color: "#7030a0" },
    { name: "Informações Técnicas", color: "#00b0f0" },
    { name: "Condições Climáticas", color: "#00b050" },
    { name: "Recurso Cia", color: "#778bd7" },
    { name: "Recurso Origem", color: "#0047bb" },
    { name: "Manutenção", color: "#f4dd06" },
  ];

  const intervençoes = [
    {
      id: 4,
      status: "Manutenção 36hrs/36%",
      color: "#f4dd06",
    },
    {
      id: 2,
      status: "Recurso Origem 6hrs/6%",
      color: "#0047bb",
    },
    {
      id: 5,
      status: "Recurso Cia de Serviço 8hrs/8%",
      color: "#778bd7",
    },
    {
      id: 3,
      status: "Condições Climáticas 10hrs/10%",
      color: "#00b050",
    },
    {
      id: 1,
      status: "Informações Técnicas 23hrs/23%",
      color: "#00b0f0",
    },
    {
      id: 6,
      status: "Aguardando Outros 18hrs/18%",
      color: "#7030a0",
    },
  ];

  // function useWindowSize() {
  //   const [size, setSize] = useState([0, 0]);
  //   useLayoutEffect(() => {
  //     function updateSize() {
  //       setSize([window.innerWidth, window.innerHeight]);
  //     }
  //     window.addEventListener("resize", updateSize);
  //     updateSize();
  //     return () => window.removeEventListener("resize", updateSize);
  //   }, []);
  //   return size;
  // }

  // const [width] = useWindowSize();

  return (
    <>
      {/* {loading && (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )} */}
      {/* <Stack spacing="8">
        <Flex
          w={"auto"}
          align="center"
          justify="center"
          bg={useBreakpointValue({ base: "white", sm: "#EDF2F7" })}
        >
          <Box
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
        <Stack spacing="3">
          <Flex
            flexDirection={useBreakpointValue({
              base: "column",
              md: "column",
            })}
            gap={4}
          >
            {/* <Flex justifyContent={"space-between"}> */}
            {/* <Flex align={"flex-end"}>
                <FormControl mt={"-50px"}>
                  <FormLabel>
                    <Text
                      mb={"1px"}
                      fontSize={"24px"}
                      color={"#2D2926"}
                      fontWeight={"700"}
                      fontFamily={"Mulish"}
                    >
                      Gráficos estatísticos
                    </Text>
                  </FormLabel>
                </FormControl>
              </Flex> */}
            {/* <Prop /> */}
            {/* </Flex> */}
            {/* <Flex direction={"row"} mb={"15px"} gap={4}> */}
            {/* <Flex alignItems={"flex-end"}>
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
                    placeholder="Relatório Tempo NPT por período/SPT"
                    _placeholder={{ color: "#2D2926" }}
                    fontSize={"14px"}
                    fontWeight={"400"}
                    // onChange={handleProjectChange}
                  ></Input>
                </FormControl>
              </Flex> */}

            {/* <Flex>
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
                    color={"#2D2926"}
                    fontSize={"14px"}
                    fontWeight={"400"}
                  />
                </FormControl>
              </Flex> */}

            {/* <Flex>
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
                    width={"146px"}
                    height={"56px"}
                    borderRadius={"8px"}
                    type={"date"}
                    color={"#2D2926"}
                    fontSize={"14px"}
                    fontWeight={"400"}
                  />
                </FormControl>
              </Flex> */}
            {/* <Flex gap={4}> */}
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
                    >
                      Gerar
                    </Button>
                  </FormControl>
                </Flex> */}
            {/* </Flex> */}
            {/* </Flex> */}

            <Flex direction={"column"}>
              <Flex mb={"-16px"}>
                <Text
                  mt={"20px"}
                  fontSize={"24px"}
                  fontWeight={"700"}
                  color={"#2D2926"}
                >
                  Relatório Tempo NPT por período/SPT
                </Text>
              </Flex>
              <Flex direction={"row"} gap={2}>
                <Text
                  mt={"20px"}
                  fontSize={"20px"}
                  fontWeight={"700"}
                  color={"#0047BB"}
                >
                  TEMPO TOTAL AGUARDADO:
                </Text>
                <Text
                  mt={"20px"}
                  fontSize={"20px"}
                  fontWeight={"700"}
                  color={"#2D2926"}
                >
                  100 HORAS
                </Text>
              </Flex>

              <Flex gap={2} wrap={"wrap"} mt={"5px"}>
                {intervençoes.map((status, index) => (
                  <StatusIntervencao
                    key={index}
                    status={status.status}
                    color={status.color}
                  />
                ))}
              </Flex>
            </Flex>
            {/* <Box
                    overflowX={"scroll"}
                    w={width * 0.7}
                    h={260}
                    display={"flex"}
                    overflowY={"hidden"}
                  > */}
            <Flex ml={"-45px"} mt={"50px"}>
              <StackedBarChart
                showY={true}
                sizeW={1000}
                sizeH={352}
                data={dataMock2}
                dataEntries={dataEntries2}
                barW={40}
              />
            </Flex>
            {/* </Box> */}
          </Flex>
        </Stack>
      </form>
      {/* </Box>
        </Flex>
      </Stack> */}
    </>
  );
}
