import { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { AreasDemandadasPorMes } from "interfaces/Services";

// import PercentPieChart from "components/PercentPieChart";
// import StackedBarChart from "components/StackedBarChart";

// import capitalizeFirstLetter from "utils/capitalizeFirstLetter";

import { Loading } from "components/Loading";

import { getAreasDemandadas } from "services/get/Dashboard";

import { AreasDemandantesGrafico } from "./GraficoAreas";
import PercentPieChart from "./PercentPieAreas";

type Props = {
  AreasDemandadasPorMes: AreasDemandadasPorMes[];
};

export default function AreasDemandadasComponent({
  AreasDemandadasPorMes,
}: Props) {
  const innerWidth = window.innerWidth;

  const [areasDemandadas, setAreasDemandadas] = useState<any[]>([] as any[]);
  const [reqGet, setReqGet] = useState<any[]>([] as any[]);
  const [loading, setLoading] = useState(true);
  // const [array, setArray] = useState<any[]>([] as any[]);
  async function handleGetAreasDemandadas() {
    try {
      const reqGet = await getAreasDemandadas();

      setReqGet(reqGet.data);
      const dataReq: any[] = reqGet.data.reduce((acc: any, curr: any) => {
        const { solicitante, data, quantia } = curr;

        const index = acc.findIndex((item: any) => item.data === data);

        if (index === -1) {
          return [
            ...acc,
            {
              data,
              [solicitante[0].toUpperCase() + solicitante.substring(1)]:
                quantia,
            },
          ];
        }

        return [
          ...acc.slice(0, index),
          {
            ...acc[index],
            [solicitante[0].toUpperCase() + solicitante.substring(1)]: quantia,
          },
          ...acc.slice(index + 1),
        ];
      }, []);
      setAreasDemandadas(dataReq);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const getTotalAreas =
    reqGet &&
    reqGet
      .map((i: any) => Number(i.quantia))
      .reduce((partialSum: number, a: number) => partialSum + a, 0);
  // console.log(getTotalAreas);

  const data =
    reqGet.length > 0 &&
    reqGet.map((infoArea) => ({
      name: infoArea.solicitante,
      value: (infoArea.quantia / getTotalAreas) * 100,
    }));

  // console.log(data);

  // const getJan = () => {
  //   const data2 = areasDemandadas.reduce((acc: any, curr: any) => {
  //     const { solicitante, data, quantia } = curr;

  //     const index = acc.findIndex((item: any) => item.data === data);

  //     if (index === -1) {
  //       return [
  //         ...acc,
  //         {
  //           data,
  //           [solicitante]: quantia,
  //         },
  //       ];
  //     }

  //     return [
  //       ...acc.slice(0, index),
  //       {
  //         ...acc[index],
  //         [solicitante]: quantia,
  //       },
  //       ...acc.slice(index + 1),
  //     ];
  //   }, []);
  //   // setArray(data2);
  //   return { data2 };
  // };

  useEffect(() => {
    handleGetAreasDemandadas();
  }, []);

  // useEffect(() => {
  //   // console.log(areasDemandadas);
  // }, [areasDemandadas]);

  // function getCurrentMonth() {
  //   const date = new Date();
  //   return date.getMonth() + 1;
  // }

  // function formatMonth(month?: number) {
  //   let monthName: string;
  //   let year: number;
  //   const date = new Date();
  //   const currentYear = date.getFullYear();
  //   switch (month) {
  //     case 1:
  //       monthName = "jan";
  //       break;
  //     case 2:
  //       monthName = "fev";
  //       break;
  //     case 3:
  //       monthName = "mar";
  //       break;
  //     case 4:
  //       monthName = "abr";
  //       break;
  //     case 5:
  //       monthName = "mai";
  //       break;
  //     case 6:
  //       monthName = "jun";
  //       break;
  //     case 7:
  //       monthName = "jul";
  //       break;
  //     case 8:
  //       monthName = "ago";
  //       break;
  //     case 9:
  //       monthName = "set";
  //       break;
  //     case 10:
  //       monthName = "out";
  //       break;
  //     case 11:
  //       monthName = "nov";
  //       break;
  //     case 12:
  //       monthName = "dez";
  //       break;
  //     default:
  //       monthName = "?";
  //   }

  //   if (month) {
  //     if (month > getCurrentMonth()) {
  //       year = currentYear - 1;
  //     } else {
  //       year = currentYear;
  //     }

  //     return monthName + "/" + year;
  //   } else {
  //     return "-";
  //   }
  // }

  // function getPieValues(month: number) {
  //   const data = AreasDemandadasPorMes.at(month);

  //   if (data) {
  //     const sms = data.sms;
  //     const regulatorio = data.regulatorio;
  //     const operacao = data.operacao;
  //     const outros = data.outros;
  //     const total: number = sms + regulatorio + operacao + outros;

  //     const smsPercent = ((sms / total) * 100).toFixed(0);
  //     const regulatorioPercent = ((regulatorio / total) * 100).toFixed(0);
  //     const operacaoPercent = ((operacao / total) * 100).toFixed(0);
  //     const outrosPercent = ((outros / total) * 100).toFixed(0);

  //     const values = {
  //       smsPercent,
  //       regulatorioPercent,
  //       operacaoPercent,
  //       outrosPercent,
  //     };

  //     return values;
  //   } else {
  //     const smsPercent = "0";
  //     const regulatorioPercent = "0";
  //     const operacaoPercent = "0";
  //     const outrosPercent = "0";

  //     const values = {
  //       smsPercent,
  //       regulatorioPercent,
  //       operacaoPercent,
  //       outrosPercent,
  //     };

  //     return values;
  //   }
  // }

  // function isUpDown(type: string) {
  //   const valuesCurrentMonth = getPieValues(AreasDemandadasPorMes.length - 1);
  //   const valuesLastMonth = getPieValues(AreasDemandadasPorMes.length - 2);

  //   if (valuesCurrentMonth && valuesLastMonth) {
  //     switch (type) {
  //       case "sms":
  //         return valuesCurrentMonth.smsPercent > valuesLastMonth.smsPercent;

  //       case "regulatorio":
  //         return (
  //           valuesCurrentMonth.regulatorioPercent >
  //           valuesLastMonth.regulatorioPercent
  //         );

  //       case "operacao":
  //         return (
  //           valuesCurrentMonth.operacaoPercent > valuesLastMonth.operacaoPercent
  //         );

  //       case "outros":
  //         return (
  //           valuesCurrentMonth.outrosPercent > valuesLastMonth.outrosPercent
  //         );
  //     }
  //   }
  // }

  // function createPieData() {
  //   const data = AreasDemandadasPorMes.at(AreasDemandadasPorMes.length - 1);
  //   if (data) {
  //     const sms = data.sms;
  //     const regulatorio = data.regulatorio;
  //     const operacao = data.operacao;
  //     const outros = data.outros;
  //     const total: number = sms + regulatorio + operacao + outros;

  //     const dataTypes = {
  //       smsData: [
  //         {
  //           name: "Undone",
  //           value: total - sms,
  //           color: "#9EE09E",
  //         },
  //         {
  //           name: "Done",
  //           value: sms,
  //           color: "#9EE09E",
  //         },
  //       ],

  //       regulatorioData: [
  //         {
  //           name: "Undone",
  //           value: total - regulatorio,
  //           color: "#9EC1CF",
  //         },
  //         {
  //           name: "Done",
  //           value: regulatorio,
  //           color: "#9EC1CF",
  //         },
  //       ],

  //       operacaoData: [
  //         {
  //           name: "Undone",
  //           value: total - operacao,
  //           color: "#FF6663",
  //         },
  //         {
  //           name: "Done",
  //           value: operacao,
  //           color: "#FF6663",
  //         },
  //       ],

  //       outrosData: [
  //         {
  //           name: "Undone",
  //           value: total - outros,
  //           color: "#FEB144",
  //         },
  //         {
  //           name: "Done",
  //           value: outros,
  //           color: "#FEB144",
  //         },
  //       ],
  //     };

  //     return dataTypes;
  //   } else {
  //     const dataTypes = {
  //       smsData: [
  //         {
  //           name: "Undone",
  //           value: 100,
  //           color: "#9EE09E",
  //         },
  //         {
  //           name: "Done",
  //           value: 0,
  //           color: "#9EE09E",
  //         },
  //       ],

  //       regulatorioData: [
  //         {
  //           name: "Undone",
  //           value: 100,
  //           color: "#9EC1CF",
  //         },
  //         {
  //           name: "Done",
  //           value: 0,
  //           color: "#9EC1CF",
  //         },
  //       ],

  //       operacaoData: [
  //         {
  //           name: "Undone",
  //           value: 100,
  //           color: "#FF6663",
  //         },
  //         {
  //           name: "Done",
  //           value: 0,
  //           color: "#FF6663",
  //         },
  //       ],

  //       outrosData: [
  //         {
  //           name: "Undone",
  //           value: 100,
  //           color: "#FEB144",
  //         },
  //         {
  //           name: "Done",
  //           value: 0,
  //           color: "#FEB144",
  //         },
  //       ],
  //     };

  //     return dataTypes;
  //   }
  // }

  // function createBarChart() {
  //   const values: {
  //     mes: string;
  //     SMS: number;
  //     Regulatório: number;
  //     Operação: number;
  //     Outros: number;
  //   }[] = [];
  //   if (AreasDemandadasPorMes.length > 0) {
  //     AreasDemandadasPorMes.forEach((mes) => {
  //       const total = mes.sms + mes.regulatorio + mes.operacao + mes.outros;
  //       const dataMock = {
  //         mes: capitalizeFirstLetter(formatMonth(mes.month)),
  //         SMS: +((mes.sms / total) * 100).toFixed(2),
  //         Regulatório: +((mes.regulatorio / total) * 100).toFixed(2),
  //         Operação: +((mes.operacao / total) * 100).toFixed(2),
  //         Outros: +((mes.outros / total) * 100).toFixed(2),
  //       };
  //       values.push(dataMock);
  //     });
  //     return values;
  //   } else {
  //     const dataMock = {
  //       mes: formatMonth().toUpperCase(),
  //       SMS: 0,
  //       Regulatório: 0,
  //       Operação: 0,
  //       Outros: 0,
  //     };
  //     values.push(dataMock);
  //     return values;
  //   }
  // }

  // const dataEntries = [
  //   { name: "SMS", color: "#9EE09E" },
  //   { name: "Regulatório", color: "#9EC1CF" },
  //   { name: "Operação", color: "#FF6663" },
  //   { name: "Outros", color: "#FEB144" },
  // ];
  if (loading) {
    <Loading />;
  }
  return (
    <Flex w={"100%"} align="center" justify="center" bg={"#EDF2F7"}>
      <Box
        py={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
        px={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
        w={"100%"}
        h={"370px"}
        flex={3}
        bg={"white"}
        boxShadow={{
          base: "none",
          sm: useColorModeValue("md", "md-dark"),
        }}
        borderRadius={"xl"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={4}
      >
        <Box w={"fit-content"} h={230}>
          <Text
            sx={{
              fontSize: 18,
              fontWeight: "700",
              fontFamily: "Mulish",
              alignSelf: "center",
            }}
            color="#000000"
            textAlign={"center"}
          >
            Áreas Demandantes
          </Text>

          <Box display={"flex"} w={"100%"} justifyContent="space-between">
            <Box
              pt={6}
              minW={innerWidth >= 428 ? "350px" : "120px"}
              flex={1}
              ml={-10}
              mr={-20}
            >
              <Flex>
                <Flex align={"center"} justify={"center"}>
                  <AreasDemandantesGrafico data={areasDemandadas || []} />
                </Flex>
                <Flex mt={-20} ml={-19}>
                  <PercentPieChart data={data || []} />
                </Flex>
              </Flex>
              {/* <StackedBarChart
                showY={true}
                sizeW={innerWidth >= 428 ? 350 : 120}
                sizeH={180}
                data={createBarChart()}
                dataEntries={dataEntries}
                barW={20}
              /> */}
            </Box>
            {/* <Box w={200}>
              <Box
                mb={1}
                display="flex"
                w={"100%"}
                justifyContent="space-between"
              >
                <Box
                  w={200}
                  display={"flex"}
                  flexDirection="column"
                  alignItems={"center"}
                  mt={10}
                >
                  <Text
                    mb={2}
                    sx={{
                      fontSize: 14,
                      fontWeight: "600",
                      alignSelf: "center",
                    }}
                    color="#9EE09E"
                  >
                    SMS
                  </Text>
                  <PercentPieChart
                    size={80}
                    upDown={isUpDown("sms")}
                    data={createPieData().smsData}
                    value={
                      getPieValues(AreasDemandadasPorMes.length - 1).smsPercent
                    }
                  />
                </Box>
                <Box
                  w={200}
                  display={"flex"}
                  flexDirection="column"
                  alignItems={"center"}
                  mt={10}
                >
                  <Text
                    mb={2}
                    sx={{
                      fontSize: 14,
                      fontWeight: "600",
                      alignSelf: "center",
                    }}
                    color="#9EC1CF"
                  >
                    Regulatório
                  </Text>
                  <PercentPieChart
                    size={80}
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
                  w={200}
                  display={"flex"}
                  flexDirection="column"
                  alignItems={"center"}
                >
                  <PercentPieChart
                    size={80}
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
                    color="#FF6663"
                  >
                    Operação
                  </Text>
                </Box>
                <Box
                  w={200}
                  display={"flex"}
                  flexDirection="column"
                  alignItems={"center"}
                >
                  <PercentPieChart
                    size={80}
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
                    color="#FEB144"
                  >
                    Outros
                  </Text>
                </Box>
              </Box> */}
            {/* </Box> */}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
