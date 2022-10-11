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

type Props = {
  AreasDemandadasPorMes: AreasDemandadasPorMes[];
};

export default function AreasDemandadasComponent({
  AreasDemandadasPorMes,
}: Props) {
  // const [areasDemandadas, setAreasDemandadas] = useState<
  //   AreasDemandadasPorMes[]
  // >([] as AreasDemandadasPorMes[]);
  // async function handleGetAreasDemandadas() {
  //   const reqGet = await getAreasDemandadas();
  //   const dataReq: AreasDemandadasPorMes[] = reqGet.data;
  //   setAreasDemandadas(dataReq);
  // }

  // useEffect(() => {
  //   handleGetAreasDemandadas();
  // }, []);

  // useEffect(() => {
  //   // console.log(areasDemandadas);
  // }, [areasDemandadas]);

  function getCurrentMonth() {
    const date = new Date();
    return date.getMonth() + 1;
  }

  function formatMonth(month?: number) {
    let monthName: string;
    let year: number;
    const date = new Date();
    const currentYear = date.getFullYear();
    switch (month) {
      case 1:
        monthName = "jan";
        break;
      case 2:
        monthName = "fev";
        break;
      case 3:
        monthName = "mar";
        break;
      case 4:
        monthName = "abr";
        break;
      case 5:
        monthName = "mai";
        break;
      case 6:
        monthName = "jun";
        break;
      case 7:
        monthName = "jul";
        break;
      case 8:
        monthName = "ago";
        break;
      case 9:
        monthName = "set";
        break;
      case 10:
        monthName = "out";
        break;
      case 11:
        monthName = "nov";
        break;
      case 12:
        monthName = "dez";
        break;
      default:
        monthName = "?";
    }

    if (month) {
      if (month > getCurrentMonth()) {
        year = currentYear - 1;
      } else {
        year = currentYear;
      }

      return monthName + "/" + year;
    } else {
      return "-";
    }
  }

  function getPieValues(month: number) {
    const data = AreasDemandadasPorMes.at(month);

    if (data) {
      const sms = data.sms;
      const regulatorio = data.regulatorio;
      const operacao = data.operacao;
      const outros = data.outros;
      const total: number = sms + regulatorio + operacao + outros;

      const smsPercent = ((sms / total) * 100).toFixed(0);
      const regulatorioPercent = ((regulatorio / total) * 100).toFixed(0);
      const operacaoPercent = ((operacao / total) * 100).toFixed(0);
      const outrosPercent = ((outros / total) * 100).toFixed(0);

      const values = {
        smsPercent,
        regulatorioPercent,
        operacaoPercent,
        outrosPercent,
      };

      return values;
    } else {
      const smsPercent = "0";
      const regulatorioPercent = "0";
      const operacaoPercent = "0";
      const outrosPercent = "0";

      const values = {
        smsPercent,
        regulatorioPercent,
        operacaoPercent,
        outrosPercent,
      };

      return values;
    }
  }

  function isUpDown(type: string) {
    const valuesCurrentMonth = getPieValues(AreasDemandadasPorMes.length - 1);
    const valuesLastMonth = getPieValues(AreasDemandadasPorMes.length - 2);

    if (valuesCurrentMonth && valuesLastMonth) {
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
          return (
            valuesCurrentMonth.outrosPercent > valuesLastMonth.outrosPercent
          );
          break;
      }
    }
  }

  function createPieData() {
    const data = AreasDemandadasPorMes.at(AreasDemandadasPorMes.length - 1);
    if (data) {
      const sms = data.sms;
      const regulatorio = data.regulatorio;
      const operacao = data.operacao;
      const outros = data.outros;
      const total: number = sms + regulatorio + operacao + outros;

      const dataTypes = {
        smsData: [
          {
            name: "Undone",
            value: total - sms,
            color: "#A8C1FF",
          },
          {
            name: "Done",
            value: sms,
            color: "#2E69FD",
          },
        ],

        regulatorioData: [
          {
            name: "Undone",
            value: total - regulatorio,
            color: "#9fed9f",
          },
          {
            name: "Done",
            value: regulatorio,
            color: "#00B53D",
          },
        ],

        operacaoData: [
          {
            name: "Undone",
            value: total - operacao,
            color: "#FFB1B1",
          },
          {
            name: "Done",
            value: operacao,
            color: "#F94144",
          },
        ],

        outrosData: [
          {
            name: "Undone",
            value: total - outros,
            color: "#FFF8BC",
          },
          {
            name: "Done",
            value: outros,
            color: "#F8E854",
          },
        ],
      };

      return dataTypes;
    } else {
      const dataTypes = {
        smsData: [
          {
            name: "Undone",
            value: 100,
            color: "#A8C1FF",
          },
          {
            name: "Done",
            value: 0,
            color: "#2E69FD",
          },
        ],

        regulatorioData: [
          {
            name: "Undone",
            value: 100,
            color: "#9fed9f",
          },
          {
            name: "Done",
            value: 0,
            color: "#FFB1B1",
          },
        ],

        operacaoData: [
          {
            name: "Undone",
            value: 100,
            color: "#FFB1B1",
          },
          {
            name: "Done",
            value: 0,
            color: "#F94144",
          },
        ],

        outrosData: [
          {
            name: "Undone",
            value: 100,
            color: "#FFF8BC",
          },
          {
            name: "Done",
            value: 0,
            color: "#F8E854",
          },
        ],
      };

      return dataTypes;
    }
  }

  function createBarChart() {
    const values: {
      month: string;
      SMS: number;
      Regulatório: number;
      Operação: number;
      Outros: number;
    }[] = [];
    if (AreasDemandadasPorMes.length > 0) {
      AreasDemandadasPorMes.forEach((mes) => {
        const total = mes.sms + mes.regulatorio + mes.operacao + mes.outros;
        const dataMock = {
          month: formatMonth(mes.month),
          SMS: +((mes.sms / total) * 100).toFixed(2),
          Regulatório: +((mes.regulatorio / total) * 100).toFixed(2),
          Operação: +((mes.operacao / total) * 100).toFixed(2),
          Outros: +((mes.outros / total) * 100).toFixed(2),
        };
        values.push(dataMock);
      });
      return values;
    } else {
      const dataMock = {
        month: formatMonth(),
        SMS: 0,
        Regulatório: 0,
        Operação: 0,
        Outros: 0,
      };
      values.push(dataMock);
      return values;
    }
  }

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
          <Box w={"fit-content"} h={230}>
            <Text
              mb={1}
              sx={{ fontSize: 18, fontWeight: "600", alignSelf: "center" }}
              color="#000000"
            >
              Áreas Demandadas
            </Text>
            <Box display={"flex"} w={"100%"} justifyContent="space-between">
              <Box pt={6}>
                <StackedBarChart
                  showY={false}
                  sizeW={180}
                  sizeH={180}
                  data={createBarChart()}
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
                      value={
                        getPieValues(AreasDemandadasPorMes.length - 1)
                          .smsPercent
                      }
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
                      value={
                        getPieValues(AreasDemandadasPorMes.length - 1)
                          .regulatorioPercent
                      }
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
                      value={
                        getPieValues(AreasDemandadasPorMes.length - 1)
                          .operacaoPercent
                      }
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
                      value={
                        getPieValues(AreasDemandadasPorMes.length - 1)
                          .outrosPercent
                      }
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
