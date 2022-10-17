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

import { tableData } from "./data";
import { GenericTable } from "./genericTable";

export interface SummaryData {
  name: string;
  responsible: string;
  startDate: string;
  endDate: string;
  budget: number;
  realized: number;
}

type Props = {
  data: SummaryData;
  table: boolean;
};

export function ProjectSummary({ data, table }: Props) {
  function createPieData(data: SummaryData) {
    const pieData = [
      {
        name: "Undone",
        value: calculatePercet(data).undone,
      },
      {
        name: "Done",
        value: calculatePercet(data).done,
      },
    ];
    return pieData;
  }

  function calculatePercet(data: SummaryData) {
    const percents = {
      undone: ((data.budget - data.realized) / data.budget) * 100,
      done: ((data.budget - (data.budget - data.realized)) / data.budget) * 100,
    };
    return percents;
  }

  function changeColor(percent: number) {
    return percent > 50 ? "#00B53D" : "#F40606";
  }

  return (
    <Accordion padding={0} margin={0} allowToggle w={"100%"}>
      <AccordionItem
        border={0}
        w={"100%"}
        boxShadow={"md"}
        borderRadius={"2xl"}
      >
        <Flex
          direction={"column"}
          w={"100%"}
          border={"1px"}
          borderRadius={"2xl"}
          borderColor={"gray.200"}
          paddingY={"14px"}
        >
          <Flex
            direction={{ base: "column", lg: "row" }}
            justify={"space-between"}
            // gap={"4"}
            marginLeft={"14px"}
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
                  size="24px"
                  fontWeight={"500"}
                  color={"gray.800"}
                >
                  {data.name}
                </Heading>
                <Flex direction={"row"} gap={1} w={"fit-content"}>
                  <Text size={"16px"} fontWeight={"500"} color={"gray.400"}>
                    Responsável:
                  </Text>
                  <Text size={"16px"} fontWeight={"500"} color={"origem.300"}>
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
              >
                <Text size={"14px"} fontWeight={"500"} color={"gray.400"}>
                  Início Real
                </Text>
                <Text size={"16px"} fontWeight={"500"} color={"gray.600"}>
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
              >
                <Text size={"14px"} fontWeight={"500"} color={"gray.400"}>
                  Fim Planejado
                </Text>
                <Text size={"16px"} fontWeight={"500"} color={"gray.600"}>
                  {" "}
                  {data.endDate}{" "}
                </Text>
              </Flex>
            </Flex>
            <Flex
              direction={"row"}
              gap={4}
              w={{ base: "100%", md: "fit-content" }}
            >
              <Flex
                direction={"column"}
                w={"fit-content"}
                alignItems={"center"}
              >
                <Flex alignItems={"center"} gap={1} textColor={"origem.300"}>
                  <FaWallet
                    size={useBreakpointValue({ base: "15px", md: "18px" })}
                  />
                  <Heading
                    size={"24px"}
                    fontFamily={"roboto"}
                    fontWeight={"600"}
                    color={"gray.800"}
                  >
                    Orçamento
                  </Heading>
                </Flex>
                <Heading size={"20px"} color={"gray.600"}>
                  R$ {data.budget}
                </Heading>
              </Flex>
              <Flex
                direction={"column"}
                w={"fit-content"}
                alignItems={"center"}
              >
                <Flex alignItems={"center"} gap={1} textColor={"origem.200"}>
                  <FaWallet
                    size={useBreakpointValue({ base: "15px", md: "18px" })}
                  />
                  <Heading
                    size={"24px"}
                    fontFamily={"roboto"}
                    fontWeight={"600"}
                    color={"gray.800"}
                  >
                    Realizado
                  </Heading>
                </Flex>
                <Heading size={"20px"} color={"gray.600"}>
                  R$ {data.realized}
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
                  size="24px"
                  fontFamily={"roboto"}
                  fontWeight={"700"}
                  color={"white"}
                  padding={2}
                >
                  {calculatePercet(data).done}%
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
