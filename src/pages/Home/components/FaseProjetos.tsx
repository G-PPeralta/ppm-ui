import { useEffect, useState } from "react";

import {
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import PieChart from "components/PieChart";

import { getGates } from "services/get/Dashboard";

interface Data {
  name: string;
  value: number;
  pct: number;
}

export default function NaoPrevistoComponent() {
  const [data, setData] = useState<Data[]>([]);

  const getData = async () => {
    const gates = await getGates();
    setData(gates.data);
  };
  // console.log("data", data);

  useEffect(() => {
    getData();
  }, []);

  const innerWidth = window.innerWidth;

  // const dataEntries = [
  //   { name: "Iniciados", color: "#9EC1CF" },
  //   { name: "Finalizados", color: "#4d87e5" },
  //   { name: "Cancelados", color: "#9EE09E" },
  //   { name: "Holds", color: "#2762c2" },
  //   { name: "Não_Iniciados", color: "#1954b4" },
  //   { name: "Reprogramados", color: "#1048a4" },
  //   { name: "Pré_Aprovação", color: "#FEB144" },
  // ];

  //   const engenhariaData =
  //   data && data.filter((x) => x.name === "Engenharia")[0].value;
  // const cMData =
  //   data && data.filter((x) => x.name === "C&M")[0].value;
  // const suprimentosData =
  //   data && data.filter((x) => x.name === "C&M")[0].value;
  // const preProjetoData =
  //   data && data.filter((x) => x.name === "C&M")[0].value;

  console.log(Number(data[3]?.pct).toFixed());

  const grafData = [
    {
      name: "Engenharia",
      value: data ? Number(Number(data[3]?.pct).toFixed(0)) : 0,
      color: "#9EC1CF",
    },
    {
      name: "C&M",
      value: data ? Number(Number(data[5]?.pct).toFixed(0)) : 0,
      color: "#9EE09E",
    },
    {
      name: "Suprimentos",
      value: data ? Number(Number(data[1]?.pct).toFixed(0)) : 0,
      color: "#FF6663",
    },
    {
      name: "Pré-projeto",
      value: data ? Number(Number(data[0]?.pct).toFixed(0)) : 0,
      color: "#FEB144",
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
              fontWeight: "700",
              fontFamily: "Mulish",
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
                bg={"#9EE09E"}
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
                bg={"#9EC1CF"}
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
              <Text sx={{ fontSize: 16, fontWeight: "600" }} color="#9EE09E">
                {data ? Number(data[5]?.pct).toFixed(0) : 0}%
              </Text>
              <Text sx={{ fontSize: 16, fontWeight: "600" }} color="#FF6663">
                {data ? Number(data[1]?.pct).toFixed(0) : 0}%
              </Text>
            </Flex>
            {grafData && <PieChart size={142} data={grafData} />}
            <Flex h={20} justify={"space-between"} direction={"column"}>
              <Text sx={{ fontSize: 16, fontWeight: "600" }} color="#9EC1CF">
                {data ? Number(data[3]?.pct).toFixed(0) : 0}%
              </Text>
              <Text sx={{ fontSize: 16, fontWeight: "600" }} color="#FEB144">
                {data ? Number(data[0]?.pct).toFixed(0) : 0}%
              </Text>
            </Flex>
          </Flex>
          <Flex mb={1} flex={1}>
            <Flex display={"flex"} w={300} justify="space-between">
              <Flex
                direction="column"
                align={"center"}
                w={120}
                bg={"#FF6663"}
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
                bg={"#FEB144"}
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
