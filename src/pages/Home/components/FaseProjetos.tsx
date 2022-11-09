import { useEffect, useState } from "react";

import {
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import PieChart from "components/PieChart";

import { getGates } from "services/get/Dashboard";

export default function NaoPrevistoComponent() {
  const [data, setData] = useState<any[]>([]);

  const getData = async () => {
    const gates = await getGates();
    setData(gates.data);
  };
  // console.log("data", data);

  useEffect(() => {
    getData();
  }, []);

  const innerWidth = window.innerWidth;

  const grafData = [
    {
      name: "Engenharia",
      value: data ? Number(data[2]?.value.toFixed(1)) : 0,
      color: "#93E01B",
    },
    {
      name: "C&M",
      value: data ? Number(data[3]?.value.toFixed(1)) : 0,
      color: "#F4DD06",
    },
    {
      name: "Suprimentos",
      value: data ? Number(data[1]?.value.toFixed(1)) : 0,
      color: "#F94144",
    },
    {
      name: "Pré-projeto",
      value: data ? Number(data[0]?.value.toFixed(1)) : 0,
      color: "#2E69FD",
    },
  ];

  return (
    <Flex
      w={"100%"}
      align="center"
      justify="center"
      bg={"#EDF2F7"}
      flex={1}
      h={"100%"}
    >
      <Flex
        py={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
        px={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
        w={"100%"}
        bg={"white"}
        boxShadow={{
          base: "none",
          sm: useColorModeValue("md", "md-dark"),
        }}
        borderRadius={"xl"}
        direction={"column"}
        align={"center"}
        flex={1}
        gap={4}
      >
        <Flex direction="column" align={"center"} flex={1}>
          <Text
            mb={1}
            sx={{
              fontSize: 18,
              fontWeight: "bold",
              alignSelf: innerWidth >= 428 ? "center" : "flex-start",
            }}
            color="#000000"
          >
            Fase dos Projetos
          </Text>
          <Flex mt={2} flex={1}>
            <Flex display={"flex"} w={300} justify="space-between">
              <Flex
                direction="column"
                align={"center"}
                w={120}
                bg={"#F4DD06"}
                py={1}
                justify={"center"}
              >
                <Text
                  mb={1}
                  sx={{ fontSize: 16, fontWeight: "600" }}
                  color="#ffffff"
                >
                  C&M
                </Text>
              </Flex>
              <Flex
                direction="column"
                align={"center"}
                w={120}
                bg={"#93E01B"}
                py={1}
                justify={"center"}
              >
                <Text
                  mb={1}
                  sx={{ fontSize: 16, fontWeight: "600" }}
                  color="#ffffff"
                >
                  Engenharia
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex mt={5} mb={5} align={"center"} justify={"center"} flex={1}>
            <Flex h={20} justify={"space-between"} direction={"column"}>
              <Text sx={{ fontSize: 16, fontWeight: "600" }} color="#F4DD06">
                {data ? data[3]?.value.toFixed(1) : 0}%
              </Text>
              <Text sx={{ fontSize: 16, fontWeight: "600" }} color="#F94144">
                {data ? data[1]?.value.toFixed(1) : 0}%
              </Text>
            </Flex>
            {grafData && <PieChart size={136} data={grafData} />}
            <Flex h={20} justify={"space-between"} direction={"column"}>
              <Text sx={{ fontSize: 16, fontWeight: "600" }} color="#93E01B">
                {data ? data[2]?.value.toFixed(1) : 0}%
              </Text>
              <Text sx={{ fontSize: 16, fontWeight: "600" }} color="#2E69FD">
                {data ? data[0]?.value.toFixed(1) : 0}%
              </Text>
            </Flex>
          </Flex>
          <Flex mb={1} flex={1}>
            <Flex display={"flex"} w={300} justify="space-between">
              <Flex
                direction="column"
                align={"center"}
                w={120}
                bg={"#F94144"}
                py={1}
                justify={"center"}
              >
                <Text
                  mb={1}
                  sx={{ fontSize: 16, fontWeight: "600" }}
                  color="#ffffff"
                >
                  Suprimentos
                </Text>
              </Flex>
              <Flex
                direction="column"
                align={"center"}
                w={120}
                bg={"#2E69FD"}
                py={1}
                justify={"center"}
              >
                <Text
                  mb={1}
                  sx={{ fontSize: 16, fontWeight: "600" }}
                  color="#ffffff"
                >
                  Pré-projeto
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
