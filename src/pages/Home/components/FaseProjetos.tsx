import { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import PieChart from "components/PieChart";

import { getGates } from "services/get/Dashboard";

interface Data {
  gate: string;
  qtde: number;
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
  const [isVisible, setIsVisible] = useState(false);

  const engenhariaIndex = data.findIndex(
    (chave) => chave.gate === "Engenharia"
  );

  const cemIndex = data.findIndex((chave) => chave.gate === "C&M");

  const suprimentos = data.findIndex((chave) => chave.gate === "Suprimentos");

  const preProjetos = data.findIndex((chave) => chave.gate === "Pré-Projeto");

  const NãoIniciado = data.findIndex((chave) => chave.gate === "Não Iniciado");

  const Gate1 = data.findIndex((chave) => chave.gate === "Gate 1");

  const Gate2 = data.findIndex((chave) => chave.gate === "Gate 2");

  const AprovacaoSolicitante = data.findIndex(
    (chave) => chave.gate === "Aprovação do Solicitante"
  );

  const HoldGate1 = data.findIndex((chave) => chave.gate === "Hold Gate 1");

  const hold = data.findIndex((chave) => chave.gate === "Hold");

  const Concluido = data.findIndex((chave) => chave.gate === "Concluído");

  const aDefinir = data.findIndex((chave) => chave.gate === "A definir");

  const aprovacaoGate1 = data.findIndex(
    (chave) => chave.gate === "Aprovação Gate 1 - Luna"
  );

  const reprovado = data.findIndex((chave) => chave.gate === "Reprovado");

  const inicio = data.findIndex((chave) => chave.gate === "Início");

  const emAndamento = data.findIndex((chave) => chave.gate === "Em andamento");

  // console.log(data);

  const grafData = [
    {
      name: "Engenharia",
      value: data ? Number(Number(data[engenhariaIndex]?.pct).toFixed(2)) : 0,
      color: "#9EC1CF",
    },
    {
      name: "C&M",
      value: data ? Number(Number(data[cemIndex]?.pct).toFixed(2)) : 0,
      color: "#9EE09E",
    },
    {
      name: "Suprimentos",
      value: data ? Number(Number(data[suprimentos]?.pct).toFixed(2)) : 0,
      color: "#FF6663",
    },
    {
      name: "Pré-Projeto",
      value: data ? Number(Number(data[preProjetos]?.pct).toFixed(2)) : 0,
      color: "#FEB144",
    },
    {
      name: "Outros",
      value: data
        ? Number(
            Number(
              data[NãoIniciado]?.pct +
                data[Gate1]?.pct +
                data[Gate2]?.pct +
                data[AprovacaoSolicitante]?.pct +
                data[hold]?.pct +
                data[HoldGate1]?.pct +
                data[Concluido]?.pct +
                data[aDefinir]?.pct +
                data[aprovacaoGate1]?.pct +
                data[reprovado]?.pct +
                data[inicio]?.pct +
                data[emAndamento]?.pct
            ).toFixed(2)
          )
        : 0,
      color: "#9370DB",
    },
  ];

  const hoverProps = {
    "Não Iniciado": data
      ? Number(Number(data[NãoIniciado]?.pct).toFixed(2))
      : 0,
    "Aprovação do Solicitante": data
      ? Number(Number(data[AprovacaoSolicitante]?.pct).toFixed(2))
      : 0,
    "Hold Gate 1": data ? Number(Number(data[HoldGate1]?.pct).toFixed(2)) : 0,
    "Gate 1": data ? Number(Number(data[Gate1]?.pct).toFixed(2)) : 0,
    "Gate 2": data ? Number(Number(data[Gate2]?.pct).toFixed(2)) : 0,
    Concluído: data ? Number(Number(data[Concluido]?.pct).toFixed(2)) : 0,
    Hold: data ? Number(Number(data[hold]?.pct).toFixed(2)) : 0,
    "A definir": data ? Number(Number(data[aDefinir]?.pct).toFixed(2)) : 0,
    "Aprovação Gate 1 - Luna": data
      ? Number(Number(data[aprovacaoGate1]?.pct).toFixed(2))
      : 0,
    Reprovado: data ? Number(Number(data[reprovado]?.pct).toFixed(2)) : 0,
    Inicio: data ? Number(Number(data[inicio]?.pct).toFixed(2)) : 0,
    "Em Andamento": data
      ? Number(Number(data[emAndamento]?.pct).toFixed(2))
      : 0,
  };

  return (
    <Flex
      w={"100%"}
      align="center"
      justify="center"
      bg={"#EDF2F7"}
      flex={1}
      h={"100%"}
    >
      <Popover isOpen={isVisible} placement="left-end">
        <PopoverContent w={"fit-content"}>
          <PopoverBody w={"fit-content"}>
            <Box>
              <Box>
                <Text color={"#1C1B1B"} fontWeight="700">
                  Não Iniciado:{" "}
                  <span
                    style={{
                      fontFamily: "Mulish",
                      fontWeight: 400,
                    }}
                  >
                    {data ? data[NãoIniciado]?.qtde : 0} -{" "}
                    {hoverProps["Não Iniciado"]}%
                  </span>
                </Text>
              </Box>
              <Box>
                <Text color={"#1C1B1B"} fontWeight="700">
                  Aprovação do Solicitante:{" "}
                  <span
                    style={{
                      fontFamily: "Mulish",
                      fontWeight: 400,
                    }}
                  >
                    {data ? data[AprovacaoSolicitante]?.qtde : 0} -{" "}
                    {hoverProps["Aprovação do Solicitante"]}%
                  </span>
                </Text>
              </Box>
              <Box>
                <Text color={"#1C1B1B"} fontWeight="700">
                  Hold Gate 1:{" "}
                  <span
                    style={{
                      fontFamily: "Mulish",
                      fontWeight: 400,
                    }}
                  >
                    {data ? data[HoldGate1]?.qtde : 0} -{" "}
                    {hoverProps["Hold Gate 1"]}%
                  </span>
                </Text>
              </Box>
              <Box>
                <Text color={"#1C1B1B"} fontWeight="700">
                  Gate 1:{" "}
                  <span
                    style={{
                      fontFamily: "Mulish",
                      fontWeight: 400,
                    }}
                  >
                    {data ? data[Gate1]?.qtde : 0} - {hoverProps["Gate 1"]}%
                  </span>
                </Text>
              </Box>
              <Box>
                <Text color={"#1C1B1B"} fontWeight="700">
                  Gate 2 :{" "}
                  <span
                    style={{
                      fontFamily: "Mulish",
                      fontWeight: 400,
                    }}
                  >
                    {data ? data[Gate2]?.qtde : 0} - {hoverProps["Gate 2"]}%
                  </span>
                </Text>
              </Box>
              <Box>
                <Text color={"#1C1B1B"} fontWeight="700">
                  Concluído:{" "}
                  <span
                    style={{
                      fontFamily: "Mulish",
                      fontWeight: 400,
                    }}
                  >
                    {data ? data[Concluido]?.qtde : 0} - {hoverProps.Concluído}%
                  </span>
                </Text>
              </Box>
              <Box>
                <Text color={"#1C1B1B"} fontWeight="700">
                  Hold:{" "}
                  <span
                    style={{
                      fontFamily: "Mulish",
                      fontWeight: 400,
                    }}
                  >
                    {data ? data[hold]?.qtde : 0} - {hoverProps.Hold}%
                  </span>
                </Text>
              </Box>
              <Box>
                <Text color={"#1C1B1B"} fontWeight="700">
                  A definir:{" "}
                  <span
                    style={{
                      fontFamily: "Mulish",
                      fontWeight: 400,
                    }}
                  >
                    {data ? data[aDefinir]?.qtde : 0} -{" "}
                    {hoverProps["A definir"]}%
                  </span>
                </Text>
              </Box>
              <Box>
                <Text color={"#1C1B1B"} fontWeight="700">
                  Aprovação Gate 1 - Luna:{" "}
                  <span
                    style={{
                      fontFamily: "Mulish",
                      fontWeight: 400,
                    }}
                  >
                    {data ? data[aprovacaoGate1]?.qtde : 0} -{" "}
                    {hoverProps["Aprovação Gate 1 - Luna"]}%
                  </span>
                </Text>
              </Box>
              <Box>
                <Text color={"#1C1B1B"} fontWeight="700">
                  Reprovado:{" "}
                  <span
                    style={{
                      fontFamily: "Mulish",
                      fontWeight: 400,
                    }}
                  >
                    {data ? data[reprovado]?.qtde : 0} - {hoverProps.Reprovado}%
                  </span>
                </Text>
              </Box>
              <Box>
                <Text color={"#1C1B1B"} fontWeight="700">
                  Início:{" "}
                  <span
                    style={{
                      fontFamily: "Mulish",
                      fontWeight: 400,
                    }}
                  >
                    {data ? data[inicio]?.qtde : 0} - {hoverProps.Inicio}%
                  </span>
                </Text>
              </Box>
              <Box>
                <Text color={"#1C1B1B"} fontWeight="700">
                  Em Andamento:{" "}
                  <span
                    style={{
                      fontFamily: "Mulish",
                      fontWeight: 400,
                    }}
                  >
                    {data ? data[emAndamento]?.qtde : 0} -{" "}
                    {hoverProps["Em Andamento"]}%
                  </span>
                </Text>
              </Box>
            </Box>
          </PopoverBody>
        </PopoverContent>
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
              <Flex display={"flex"} w={400} justify="space-between">
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
                  {data ? Number(data[cemIndex]?.pct).toFixed(2) : 0}%
                </Text>
                <Text sx={{ fontSize: 16, fontWeight: "600" }} color="#FF6663">
                  {data ? Number(data[suprimentos]?.pct).toFixed(2) : 0}%
                </Text>
              </Flex>
              {grafData && <PieChart size={142} data={grafData} />}
              <Flex h={20} justify={"space-between"} direction={"column"}>
                <Text sx={{ fontSize: 16, fontWeight: "600" }} color="#9EC1CF">
                  {data ? Number(data[engenhariaIndex]?.pct).toFixed(2) : 0}%
                </Text>
                <Text sx={{ fontSize: 16, fontWeight: "600" }} color="#FEB144">
                  {data ? Number(data[preProjetos]?.pct).toFixed(2) : 0}%
                </Text>
              </Flex>
            </Flex>
            <Text
              sx={{ fontSize: 16, fontWeight: "600" }}
              color="#9370DB"
              mt={-4}
              mb={4}
            >
              {data
                ? Number(data[NãoIniciado]?.pct + data[Gate2]?.pct).toFixed(2)
                : 0}
              %
            </Text>
            <Flex mb={1} flex={1}>
              <Flex display={"flex"} w={400} justify="space-between" gap={3}>
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
                  bg={"#9370DB"}
                  py={1}
                  justify={"center"}
                  onMouseEnter={() => setIsVisible(!isVisible)}
                  onMouseLeave={() => setIsVisible(!isVisible)}
                >
                  <PopoverAnchor>
                    <Text
                      mb={1}
                      sx={{ fontSize: 16, fontWeight: "600" }}
                      color="#ffffff"
                    >
                      Outros
                    </Text>
                  </PopoverAnchor>
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
                    Pré-Projeto
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Popover>
    </Flex>
  );
}
