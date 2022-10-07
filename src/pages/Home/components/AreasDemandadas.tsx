import { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { AreasDemandadasPorMes } from "interfaces/Services";

import PercentPieChart from "components/PercentPieChart";
import StackedBarChart from "components/StackedBarChart";

import { getAreasDemandadas } from "services/get/Dashboard";

export default function AreasDemandadasComponent() {
  const [areasDemandadas, setAreasDemandadas] = useState<
    AreasDemandadasPorMes[]
  >([] as AreasDemandadasPorMes[]);
  async function handleGetAreasDemandadas() {
    const reqGet = await getAreasDemandadas();
    const dataReq: AreasDemandadasPorMes[] = reqGet.data;
    setAreasDemandadas(dataReq);
  }

  useEffect(() => {
    handleGetAreasDemandadas();
  }, []);

  useEffect(() => {
    // console.log(areasDemandadas);
  }, [areasDemandadas]);

  function getCurrentMonth() {
    const date = new Date();
    return date.getMonth() + 1;
  }

  function getPieValues(month?: number) {
    let data;
    if (month) {
      data = areasDemandadas.filter((mes) => mes.mes === month);
    } else {
      data = areasDemandadas.filter((mes) => mes.mes === getCurrentMonth());
    }
    const total = data.map(
      (mes) => mes.sms + mes.regulatorio + mes.operacao + mes.outros
    );

    const smsPercent = (+data.map((mes) => mes.sms) / +total) * 100;
    const regulatorioPercent =
      (+data.map((mes) => mes.regulatorio) / +total) * 100;
    const operacaoPercent = (+data.map((mes) => mes.operacao) / +total) * 100;
    const outrosPercent = (+data.map((mes) => mes.outros) / +total) * 100;

    const values = {
      smsPercent,
      regulatorioPercent,
      operacaoPercent,
      outrosPercent,
    };

    return values;
  }

  function isUpDown(type: string) {
    const valuesCurrentMonth = getPieValues(getCurrentMonth());
    const valuesLastMonth = getPieValues(getCurrentMonth());

    switch (type) {
      case "sms":
        return valuesCurrentMonth.smsPercent > valuesLastMonth.smsPercent;
        break;
      case "regulatorio":
        return (
          valuesCurrentMonth.regulatorioPercent >
          valuesLastMonth.regulatorioPercent
        );
        break;
      case "operacao":
        return (
          valuesCurrentMonth.operacaoPercent > valuesLastMonth.operacaoPercent
        );
        break;
      case "outros":
        return valuesCurrentMonth.outrosPercent > valuesLastMonth.outrosPercent;
        break;
      default:
        return true;
    }
  }

  function createPieData() {
    const data = areasDemandadas.filter((mes) => mes.mes === getCurrentMonth());
    const total = data.map(
      (mes) => mes.sms + mes.regulatorio + mes.operacao + mes.outros
    );
    const sms = data.map((mes) => mes.sms);
    const regulatorio = data.map((mes) => mes.regulatorio);
    const operacao = data.map((mes) => mes.operacao);
    const outros = data.map((mes) => mes.outros);

    const dataTypes = {
      smsData: [
        {
          name: "Undone",
          value: +total - +sms,
          color: "#A8C1FF",
        },
        {
          name: "Done",
          value: +sms,
          color: "#2E69FD",
        },
      ],

      regulatorioData: [
        {
          name: "Undone",
          value: +total - +regulatorio,
          color: "#9fed9f",
        },
        {
          name: "Done",
          value: +regulatorio,
          color: "#FFB1B1",
        },
      ],

      operacaoData: [
        {
          name: "Undone",
          value: +total - +operacao,
          color: "#FFB1B1",
        },
        {
          name: "Done",
          value: +operacao,
          color: "#F94144",
        },
      ],

      outrosData: [
        {
          name: "Undone",
          value: +total - +outros,
          color: "#FFF8BC",
        },
        {
          name: "Done",
          value: +outros,
          color: "#F8E854",
        },
      ],
    };

    return dataTypes;
  }

  const dataMock = [
    {
      month: "Jan/22",
      SMS: 70,
      Regulatório: 10,
      Operação: 10,
      Outros: 10,
    },
    {
      month: "Fev/22",
      SMS: 10,
      Regulatório: 70,
      Operação: 10,
      Outros: 10,
    },
    {
      month: "Mar/22",
      SMS: 10,
      Regulatório: 10,
      Operação: 70,
      Outros: 10,
    },
    {
      month: "Abr/22",
      SMS: 10,
      Regulatório: 10,
      Operação: 10,
      Outros: 70,
    },
  ];

  const dataEntries = [
    { name: "SMS", color: "#2E69FD" },
    { name: "Regulatório", color: "#93E01B" },
    { name: "Operação", color: "#F94144" },
    { name: "Outros", color: "#F4DD06" },
  ];

  return (
    <Stack spacing="8">
      <Flex
        w={"100%"}
        height={"322px"}
        align="center"
        justify="center"
        bg={useBreakpointValue({ base: "#EDF2F7", sm: "#EDF2F7" })}
      >
        <Box
          py={{ base: "0", sm: "4" }}
          px={{ base: "0", sm: "4" }}
          w={"100%"}
          height={"322px"}
          bg={useBreakpointValue({ base: "white", sm: "white" })}
          boxShadow={{
            base: "none",
            sm: useColorModeValue("md", "md-dark"),
          }}
          borderRadius={{ base: "none", sm: "xl" }}
          display={"flex"}
          justifyContent={"center"}
        >
          <Box w={300} h={230}>
            <Text
              mb={1}
              sx={{ fontSize: 18, fontWeight: "600", alignSelf: "center" }}
              color="#000000"
            >
              Áreas Demandadas
            </Text>
            <Box display={"flex"} w={"100%"} justifyContent="space-between">
              <Box ml={-4} pt={6}>
                <StackedBarChart
                  showY={false}
                  sizeW={180}
                  sizeH={180}
                  data={dataMock}
                  dataEntries={dataEntries}
                  barW={20}
                />
              </Box>
              <Box w={150}>
                <Box
                  mb={1}
                  display="flex"
                  w={"100%"}
                  justifyContent="space-between"
                >
                  <Box
                    w={150}
                    display={"flex"}
                    flexDirection="column"
                    alignItems={"center"}
                  >
                    <Text
                      mb={2}
                      sx={{
                        fontSize: 14,
                        fontWeight: "600",
                        alignSelf: "center",
                      }}
                      color="#2E69FD"
                    >
                      SMS
                    </Text>
                    <PercentPieChart
                      size={60}
                      upDown={isUpDown("sms")}
                      data={createPieData().smsData}
                      value={getPieValues().smsPercent}
                    />
                  </Box>
                  <Box
                    w={150}
                    display={"flex"}
                    flexDirection="column"
                    alignItems={"center"}
                  >
                    <Text
                      mb={2}
                      sx={{
                        fontSize: 14,
                        fontWeight: "600",
                        alignSelf: "center",
                      }}
                      color="#93E01B"
                    >
                      Regulatório
                    </Text>
                    <PercentPieChart
                      size={60}
                      upDown={isUpDown("regulatorio")}
                      data={createPieData().regulatorioData}
                      value={getPieValues().regulatorioPercent}
                    />
                  </Box>
                </Box>
                <Box
                  mt={8}
                  mb={1}
                  display="flex"
                  w={"100%"}
                  justifyContent="space-between"
                >
                  <Box
                    w={150}
                    display={"flex"}
                    flexDirection="column"
                    alignItems={"center"}
                  >
                    <PercentPieChart
                      size={60}
                      upDown={isUpDown("operacao")}
                      data={createPieData().operacaoData}
                      value={getPieValues().operacaoPercent}
                    />
                    <Text
                      mt={2}
                      sx={{
                        fontSize: 14,
                        fontWeight: "600",
                        alignSelf: "center",
                      }}
                      color="#F94144"
                    >
                      Operação
                    </Text>
                  </Box>
                  <Box
                    w={150}
                    display={"flex"}
                    flexDirection="column"
                    alignItems={"center"}
                  >
                    <PercentPieChart
                      size={60}
                      upDown={isUpDown("outros")}
                      data={createPieData().outrosData}
                      value={getPieValues().outrosPercent}
                    />
                    <Text
                      mt={2}
                      sx={{
                        fontSize: 14,
                        fontWeight: "600",
                        alignSelf: "center",
                      }}
                      color="#F4DD06"
                    >
                      Outros
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Stack>
  );
}
