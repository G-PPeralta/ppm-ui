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
      color: "#9370DB",
    },
    {
      name: "Outros",
      value: data
        ? Number(
            Number(
              Number(data[NãoIniciado]?.pct) +
                Number(data[Gate1]?.pct) +
                Number(data[Gate2]?.pct) +
                Number(data[AprovacaoSolicitante]?.pct) +
                Number(data[hold]?.pct) +
                Number(data[HoldGate1]?.pct) +
                Number(data[Concluido]?.pct) +
                Number(data[aDefinir]?.pct) +
                Number(data[aprovacaoGate1]?.pct) +
                Number(data[reprovado]?.pct) +
                Number(data[inicio]?.pct) +
                Number(data[emAndamento]?.pct)
            ).toFixed(2)
          )
        : Number("0").toFixed(2),
      color: "#FEB144",
    },
  ];

  const hoverProps = {
    "Não Iniciado": data[NãoIniciado]?.pct
      ? Number(Number(data[NãoIniciado]?.pct).toFixed(2))
      : 0,
    "Aprovação do Solicitante": data[AprovacaoSolicitante]?.pct
      ? Number(Number(data[AprovacaoSolicitante]?.pct).toFixed(2))
      : 0,
    "Hold Gate 1": data[HoldGate1]?.pct
      ? Number(Number(data[HoldGate1]?.pct).toFixed(2))
      : 0,
    "Gate 1": data[Gate1]?.pct
      ? Number(Number(data[Gate1]?.pct).toFixed(2))
      : 0,
    "Gate 2": data[Gate2]?.pct
      ? Number(Number(data[Gate2]?.pct).toFixed(2))
      : 0,
    Concluído: data[Concluido]?.pct
      ? Number(Number(data[Concluido]?.pct).toFixed(2))
      : 0,
    Hold: data[hold]?.pct ? Number(Number(data[hold]?.pct).toFixed(2)) : 0,
    "A definir": data[aDefinir]?.pct
      ? Number(Number(data[aDefinir]?.pct).toFixed(2))
      : 0,
    "Aprovação Gate 1 - Luna": data[aprovacaoGate1]?.pct
      ? Number(Number(data[aprovacaoGate1]?.pct).toFixed(2))
      : 0,
    Reprovado: data[reprovado]?.pct
      ? Number(Number(data[reprovado]?.pct).toFixed(2))
      : 0,
    Inicio: data[inicio]?.pct
      ? Number(Number(data[inicio]?.pct).toFixed(2))
      : 0,
    "Em Andamento": data[emAndamento]?.pct
      ? Number(Number(data[emAndamento]?.pct).toFixed(2))
      : 0,
  };

  const porcentagemOutros = Number(
    hoverProps["Não Iniciado"] +
      hoverProps["Gate 1"] +
      hoverProps["Gate 2"] +
      hoverProps["Aprovação do Solicitante"] +
      hoverProps.Hold +
      hoverProps["Hold Gate 1"] +
      hoverProps.Concluído +
      hoverProps["A definir"] +
      hoverProps["Aprovação Gate 1 - Luna"] +
      hoverProps.Reprovado +
      hoverProps.Inicio +
      hoverProps["Em Andamento"]
  );

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
                    {data[NãoIniciado]?.qtde ? data[NãoIniciado]?.qtde : 0} -{" "}
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
                    {data[AprovacaoSolicitante]?.qtde
                      ? data[AprovacaoSolicitante]?.qtde
                      : 0}{" "}
                    - {hoverProps["Aprovação do Solicitante"]}%
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
                    {data[HoldGate1]?.qtde ? data[HoldGate1]?.qtde : 0} -{" "}
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
                    {data[Gate1]?.qtde ? data[Gate1]?.qtde : 0} -{" "}
                    {hoverProps["Gate 1"]}%
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
                    {data[Gate2]?.qtde ? data[Gate2]?.qtde : 0} -{" "}
                    {hoverProps["Gate 2"]}%
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
                    {data[Concluido]?.qtde ? data[Concluido]?.qtde : 0} -{" "}
                    {hoverProps.Concluído}%
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
                    {data[hold]?.qtde ? data[hold]?.qtde : 0} -{" "}
                    {hoverProps.Hold}%
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
                    {data[aDefinir]?.qtde ? data[aDefinir]?.qtde : 0} -{" "}
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
                    {data[aprovacaoGate1]?.qtde
                      ? data[aprovacaoGate1]?.qtde
                      : 0}{" "}
                    - {hoverProps["Aprovação Gate 1 - Luna"]}%
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
                    {data[reprovado]?.qtde ? data[reprovado]?.qtde : 0} -{" "}
                    {hoverProps.Reprovado}%
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
                    {data[inicio]?.qtde ? data[inicio]?.qtde : 0} -{" "}
                    {hoverProps.Inicio}%
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
                    {data[emAndamento]?.qtde ? data[emAndamento]?.qtde : 0} -{" "}
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
                  {data[cemIndex]?.pct
                    ? Number(data[cemIndex]?.pct).toFixed(2)
                    : 0}
                  %
                </Text>
                <Text sx={{ fontSize: 16, fontWeight: "600" }} color="#FF6663">
                  {data[suprimentos]?.pct
                    ? Number(data[suprimentos]?.pct).toFixed(2)
                    : 0}
                  %
                </Text>
              </Flex>
              {grafData && <PieChart size={142} data={grafData} />}
              <Flex h={20} justify={"space-between"} direction={"column"}>
                <Text sx={{ fontSize: 16, fontWeight: "600" }} color="#9EC1CF">
                  {data[engenhariaIndex]?.pct
                    ? Number(data[engenhariaIndex]?.pct).toFixed(2)
                    : 0}
                  %
                </Text>
                <Text sx={{ fontSize: 16, fontWeight: "600" }} color="#9370DB">
                  {data[preProjetos]?.pct
                    ? Number(data[preProjetos]?.pct).toFixed(2)
                    : 0}
                  %
                </Text>
              </Flex>
            </Flex>
            <Text
              sx={{ fontSize: 16, fontWeight: "600" }}
              color="#FEB144"
              mt={-4}
              mb={4}
            >
              {porcentagemOutros
                ? porcentagemOutros.toFixed(2)
                : Number("0").toFixed(2)}
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
                  bg={"#FEB144"}
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
                  bg={"#9370DB"}
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
