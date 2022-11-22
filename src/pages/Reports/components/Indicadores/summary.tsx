import { FaWallet } from "react-icons/fa";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Cell, Pie, PieChart } from "recharts";

import { formatRealInput } from "utils/regexCoinMask";

import { GenericTable, TableData } from "./../genericTable";

export interface SummaryData {
  name: string;
  responsible: string;
  startDate: string;
  endDate: string;
  budget: string;
  realized: string;
  percent?: string;
}

type Props = {
  data: SummaryData;
  table: boolean;
  tableData: TableData;
};

export function ProjectSummary({ data, table, tableData }: Props) {
  // const format = /^[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
  const budget = data.budget + ".00";
  const budget2 = data.budget + "0";
  const realized = data.realized + ".00";
  const realized2 = data.realized + "0";

  const formatOrc = () => {
    if (!data.budget.includes(".")) {
      return budget;
    }
    if (data.budget.substring(data.budget.indexOf(".") + 1).length < 2) {
      return budget2;
    }
    if (data.budget.includes(".")) {
      return data.budget;
    }
    return budget;
  };

  const formatRealized = () => {
    if (!data.realized.includes(".")) {
      return realized;
    }
    if (data.realized.substring(data.realized.indexOf(".") + 1).length < 2) {
      return realized2;
    }
    if (data.realized.includes(".")) {
      return data.realized;
    }
    return realized;
  };

  // console.log(formatRealized());

  function calculatePercent(data: SummaryData) {
    if (Number(data.realized) > 0 && Number(data.budget) > 0) {
      const done = (Number(data.realized) / Number(data.budget)) * 100;
      return done > 100 ? 100 : done;
    }
    return 0;
  }

  // console.log(data);

  function createPieData(data: SummaryData) {
    const p = Number(data.percent);
    const pieData = [
      {
        name: "Undone",
        value: 100 - p,
      },
      {
        name: "Done",
        value: p,
      },
    ];
    return pieData;
  }

  function changeColor(percent: number) {
    return percent > 50 ? "#00B53D" : "#F40606";
  }

  function changeShadow() {
    return table === false ? "md" : "none";
  }

  // function formatToLocale(num: number) {
  //   return num.toLocaleString("pt-BR");
  // }

  return (
    <Accordion padding={0} margin={0} allowToggle w={"100%"}>
      <AccordionItem
        border={0}
        w={"100%"}
        boxShadow={changeShadow()}
        borderRadius={"2xl"}
      >
        <Flex
          marginTop={"24px"}
          direction={"column"}
          w={"100%"}
          border={"1px"}
          borderRadius={"2xl"}
          borderColor={"gray.200"}
          paddingY={"14px"}
        >
          <Flex
            direction={{ base: "column", lg: "row" }}
            justify={{ base: "center", lg: "space-between" }}
            align={"center"}
            gap={{ base: "4", lg: "0" }}
            marginLeft={{ base: "0", lg: "14px" }}
          >
            <Flex justify={"left"} gap={{ base: "2", md: "4" }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <PieChart width={50} height={50}>
                  <Pie
                    data={createPieData(data)}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={18}
                    outerRadius={25}
                  >
                    {createPieData(data).map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.name === "Done"
                            ? changeColor(entry.value)
                            : "#A7A7A7"
                        }
                      />
                    ))}
                  </Pie>
                </PieChart>
                <Box
                  alignItems="center"
                  display={"flex"}
                  sx={{ position: "absolute" }}
                  justifyContent="center"
                >
                  {createPieData(data).map((entry) =>
                    entry.name === "Done" ? (
                      <Text
                        sx={{ fontSize: 14 }}
                        color={changeColor(entry.value)}
                        fontWeight={"bold"}
                      >
                        {entry.value}%
                      </Text>
                    ) : null
                  )}
                </Box>
              </Box>
              <Flex direction={"column"} w={"100%"}>
                <Heading
                  as="h3"
                  fontSize="24px"
                  fontWeight={"500"}
                  color={"gray.800"}
                >
                  {data.name}
                </Heading>
                <Flex direction={"row"} gap={1} w={"fit-content"}>
                  <Text fontSize={"16px"} fontWeight={"500"} color={"gray.400"}>
                    Responsável:
                  </Text>
                  <Text
                    fontSize={"16px"}
                    fontWeight={"500"}
                    color={"origem.300"}
                  >
                    {data.responsible}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction={"row"} justifySelf={"center"} gap={2}>
              <Flex
                direction={"column"}
                w={"fit-content"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text fontSize={"14px"} fontWeight={"500"} color={"gray.400"}>
                  Início Real
                </Text>
                <Text fontSize={"16px"} fontWeight={"500"} color={"gray.600"}>
                  {" "}
                  {data.startDate}{" "}
                </Text>
              </Flex>
              <Heading color={"#0047BB"} fontWeight={"normal"}>
                |
              </Heading>
              <Flex
                direction={"column"}
                w={"fit-content"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text fontSize={"14px"} fontWeight={"500"} color={"gray.400"}>
                  Fim Planejado
                </Text>
                <Text fontSize={"16px"} fontWeight={"500"} color={"gray.600"}>
                  {data.endDate}
                </Text>
              </Flex>
            </Flex>
            <Flex
              direction={"row"}
              gap={4}
              justify={{ base: "center", lg: "space-between" }}
              align={"center"}
              w={{ base: "100%", md: "fit-content" }}
            >
              <Flex
                direction={"column"}
                w={"fit-content"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Flex alignItems={"center"} gap={1} textColor={"origem.300"}>
                  <FaWallet
                    size={useBreakpointValue({ base: "15px", md: "18px" })}
                  />
                  <Heading
                    fontSize={"20px"}
                    fontFamily={"roboto"}
                    fontWeight={"600"}
                    color={"gray.800"}
                  >
                    Orçamento
                  </Heading>
                </Flex>
                <Heading fontSize={"18px"} color={"gray.600"}>
                  R$ {formatRealInput(formatOrc())}
                </Heading>
              </Flex>
              <Flex
                direction={"column"}
                w={"fit-content"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Flex alignItems={"center"} gap={1} textColor={"origem.200"}>
                  <FaWallet
                    size={useBreakpointValue({ base: "15px", md: "18px" })}
                  />
                  <Heading
                    fontSize={"20px"}
                    fontFamily={"roboto"}
                    fontWeight={"600"}
                    color={"gray.800"}
                  >
                    Realizado
                  </Heading>
                </Flex>
                <Heading fontSize={"18px"} color={"gray.600"}>
                  R$ {formatRealInput(formatRealized())}
                </Heading>
              </Flex>
            </Flex>
            <Flex justify={"space-between"}>
              <Flex
                backgroundColor={"origem.300"}
                alignItems={"center"}
                marginY={1}
                borderRadius={"sm"}
                marginRight={"14px"}
                w={"fit-content"}
              >
                <Heading
                  as="h3"
                  fontSize="24px"
                  fontFamily={"roboto"}
                  fontWeight={"700"}
                  color={"white"}
                  padding={2}
                >
                  {calculatePercent(data)
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")}
                  %
                </Heading>
              </Flex>
              {table == true && (
                <Flex>
                  <AccordionButton>
                    <AccordionIcon fontSize={"20px"} />
                  </AccordionButton>
                </Flex>
              )}
            </Flex>
          </Flex>
          {table == true && (
            <AccordionPanel w={"100%"} marginTop={5}>
              <GenericTable data={tableData} />
            </AccordionPanel>
          )}
        </Flex>
      </AccordionItem>
    </Accordion>
  );
}
