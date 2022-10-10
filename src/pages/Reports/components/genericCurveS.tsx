import { FiCircle } from "react-icons/fi";

import { Flex, Heading } from "@chakra-ui/react";
import {
  CartesianGrid,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";

export interface CurveSData {
  mes: string;
  cronogramaPrevisto: number;
  cronogramaRealizado: number;
  capexPrevisto: number;
  capexRealizado: number;
}

type Props = {
  data: CurveSData[];
};

function GenericCurveS({ data }: Props) {
  return (
    <>
      <Flex
        backgroundColor={"white"}
        direction={"column"}
        boxShadow={"md"}
        borderRadius={"2xl"}
        marginTop={4}
      >
        <Flex
          backgroundColor={"white"}
          borderTopRadius={"8px"}
          borderBottomRadius={"0px"}
          border={"1px"}
          borderColor={"gray.200"}
          align={"center"}
          pl={"20px"}
          gap={5}
          h={"72px"}
          py={2}
        >
          <Heading as="h4" size="md">
            Curva S
          </Heading>
        </Flex>
        <Flex
          justify={"left"}
          border={"1px"}
          borderTop={"0px"}
          borderColor={"gray.200"}
          borderBottomRadius={"2xl"}
          padding={"1em"}
          paddingLeft={{ base: "0", md: "1em" }}
          direction={"column"}
        >
          <ResponsiveContainer
            width={"97%"}
            height={"80%"}
            minWidth={250}
            minHeight={200}
          >
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="cronogramaPrevisto"
                stroke="#F94144"
                strokeWidth={4}
                name="Cronograma Previsto"
              />
              <Line
                type="monotone"
                dataKey="cronogramaRealizado"
                stroke="#F4DD06"
                strokeWidth={4}
                name="Cronograma Realizado"
              />
              <Line
                type="monotone"
                dataKey="capexPrevisto"
                stroke="#93E01B"
                strokeWidth={4}
                name="Capex Previsto"
              />
              <Line
                type="monotone"
                dataKey="capexRealizado"
                stroke="#2E69FD"
                strokeWidth={4}
                name="Capex Realizado"
              />
            </LineChart>
          </ResponsiveContainer>
          <Flex
            gap={{ base: "1em", md: "4em" }}
            direction={{ base: "column", md: "row" }}
            padding={{ base: "1em", md: "0" }}
            px={{ base: "1em", md: "0.6em" }}
          >
            <Flex direction={"column"}>
              <Heading as="h3" size="sm">
                Cronograma
              </Heading>
              <Flex direction={"row"} gap={"1em"}>
                <Flex alignItems={"center"} gap={"1"}>
                  <FiCircle color="#F94144" fill="#F94144" size={12} />
                  <p color="gray.400"> Previsto</p>
                </Flex>
                <Flex alignItems={"center"} gap={"1"}>
                  <FiCircle color={"#F4DD06"} fill={"#F4DD06"} size={12} />
                  <p color="gray.400"> Realizado</p>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction={"column"}>
              <Heading as="h3" size="sm">
                Capex
              </Heading>
              <Flex direction={"row"} gap={"1em"}>
                <Flex alignItems={"center"} gap={"1"}>
                  <FiCircle color="#93E01B" fill="#93E01B" size={12} />
                  <p color="gray.400"> Previsto</p>
                </Flex>
                <Flex alignItems={"center"} gap={"1"}>
                  <FiCircle color="#2E69FD" fill="#2E69FD" size={12} />
                  <p color="gray.400"> Realizado</p>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default GenericCurveS;
