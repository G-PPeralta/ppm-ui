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

function CurvaS({ data }: Props) {
  return (
    <>
      <Flex
        backgroundColor={"white"}
        direction={"column"}
        boxShadow={"md"}
        borderRadius={"2xl"}
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
                stroke="#FBB4B4"
                strokeWidth={4}
                name="Cronograma Previsto"
              />
              <Line
                type="monotone"
                dataKey="cronogramaRealizado"
                stroke="#F40606"
                strokeWidth={4}
                name="Cronograma Realizado"
              />
              <Line
                type="monotone"
                dataKey="capexPrevisto"
                stroke="#B2C7EA"
                strokeWidth={4}
                name="Capex Previsto"
              />
              <Line
                type="monotone"
                dataKey="capexRealizado"
                stroke="#0047BB"
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
                  <FiCircle color="#FBB4B4" fill="#FBB4B4" size={12} />
                  <p color="gray.400"> Previsto</p>
                </Flex>
                <Flex alignItems={"center"} gap={"1"}>
                  <FiCircle color={"#F40606"} fill={"#F40606"} size={12} />
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
                  <FiCircle color="#B2C7EA" fill="#B2C7EA" size={12} />
                  <p color="gray.400"> Previsto</p>
                </Flex>
                <Flex alignItems={"center"} gap={"1"}>
                  <FiCircle color="#0047BB" fill="#0047BB" size={12} />
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

export default CurvaS;
