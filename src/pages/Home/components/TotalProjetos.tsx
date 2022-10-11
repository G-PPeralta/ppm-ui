import { useState, useEffect } from "react";

import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import StackedBarChart from "components/StackedBarChart";

import { getTotalProjetos } from "services/get/Dashboard";

export default function TotalProjetosComponent() {
  const [total, setTotal] = useState(1);
  const [iniciados, setIniciados] = useState(0);
  const [finalizados, setFinalizados] = useState(0);
  const [cancelados, setCancelados] = useState(0);
  const [holds, setHolds] = useState(0);
  const [naoIniciado, setNaoIniciado] = useState(0);
  const [reprogramado, setReprogramado] = useState(0);
  const [preAprovacao, setPreAprovacao] = useState(0);
  const [prioridadeAlta, setPrioridadeAlta] = useState(0);
  const [prioridadeMedia, setPrioridadeMedia] = useState(0);
  const [prioridadeBaixa, setPrioridadeBaixa] = useState(0);
  const [complexidadeAlta, setComplexidadeAlta] = useState(0);
  const [complexidadeMedia, setComplexidadeMedia] = useState(0);
  const [complexidadeBaixa, setComplexidadeBaixa] = useState(0);

  async function handleGetTipoResponsavel() {
    const { data } = await getTotalProjetos();
    // console.log(data);
    setTotal(data.totalProjetos);
    setIniciados(data.projetosPorStatus[1].qtd);
    // setIniciados(
    //   data.projetosPorStatus[1].qtd +
    //     data.projetosPorStatus[2].qtd +
    //     data.projetosPorStatus[3].qtd,
    // );
    setNaoIniciado(data.projetosPorStatus[0].qtd);
    setReprogramado(data.projetosPorStatus[2].qtd);
    setPreAprovacao(data.projetosPorStatus[3].qtd);
    setFinalizados(data.projetosPorStatus[5].qtd);
    setCancelados(data.projetosPorStatus[4].qtd);
    setHolds(data.projetosPorStatus[6].qtd);
    // setHolds(data.projetosPorStatus[6].qtd + data.projetosPorStatus[0].qtd);
    setPrioridadeAlta(data.prioridades.alta);
    setPrioridadeMedia(data.prioridades.media);
    setPrioridadeBaixa(data.prioridades.baixa);
    setComplexidadeAlta(data.complexidades.alta);
    setComplexidadeMedia(data.complexidades.media);
    setComplexidadeBaixa(data.complexidades.baixa);
  }

  useEffect(() => {
    handleGetTipoResponsavel();
  }, []);

  const dataMock = [
    {
      month: "Jan/22",
      Iniciados: 10,
      Finalizados: 10,
      Cancelados: 10,
      Holds: 10,
      Não_Iniciados: 10,
      Reprogramados: 10,
      Pré_Aprovação: 40,
    },
    {
      month: "Fev/22",
      Iniciados: 10,
      Finalizados: 10,
      Cancelados: 10,
      Holds: 40,
      Não_Iniciados: 10,
      Reprogramados: 10,
      Pré_Aprovação: 10,
    },
    {
      month: "Mar/22",
      Iniciados: 10,
      Finalizados: 10,
      Cancelados: 10,
      Holds: 10,
      Não_Iniciados: 10,
      Reprogramados: 40,
      Pré_Aprovação: 10,
    },
    {
      month: "Abr/22",
      Iniciados: 10,
      Finalizados: 10,
      Cancelados: 10,
      Holds: 10,
      Não_Iniciados: 40,
      Reprogramados: 10,
      Pré_Aprovação: 10,
    },
  ];

  const dataEntries = [
    { name: "Iniciados", color: "#93E01B" },
    { name: "Finalizados", color: "#2E69FD" },
    { name: "Cancelados", color: "#F94144" },
    { name: "Holds", color: "#F4DD06" },
    { name: "Não_Iniciados", color: "#aaaaaa" },
    { name: "Reprogramados", color: "#ffa70f" },
    { name: "Pré_Aprovação", color: "#c50ffc" },
  ];

  return (
    <Flex w={"100%"} align="center" justify="center" bg={"#EDF2F7"}>
      <Box
        py={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
        px={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
        w={"100%"}
        bg={"white"}
        boxShadow={{
          base: "none",
          sm: useColorModeValue("md", "md-dark"),
        }}
        borderRadius={"xl"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        flex={1}
        gap={4}
      >
        <Text
          sx={{
            fontSize: 18,
            fontWeight: "bold",
            width: "100%",
            textAlign: "flex-start",
          }}
          color="#000000"
        >
          Total de Projetos
        </Text>

        <Box
          display="flex"
          flexDirection={{ base: "column", lg: "row" }}
          w={"100%"}
          justifyContent={"space-between"}
          flex={1}
          gap={4}
        >
          <Flex direction={"row"} gap={2} flex={1}>
            <Flex gap={2} flex={1}>
              <Flex
                px={1}
                py={5}
                bg={"#0047BB"}
                sx={{ width: "36px", borderRadius: "2px" }}
                flex={1}
                justify={"center"}
                align={"start"}
              >
                <Text
                  sx={{
                    fontSize: 16,
                    writingMode: "vertical-rl",
                    transform: "scale(-1)",
                  }}
                  color="#ffffff"
                >
                  {total} Projetos
                </Text>
              </Flex>

              <Flex
                flex={3}
                direction={"column"}
                justify={"space-between"}
                gap={2}
              >
                <Flex gap={1} flex={1} align={"center"}>
                  <Text
                    p={1}
                    bg={"#93E01B"}
                    sx={{ fontSize: 14, width: "200px", borderRadius: "2px" }}
                    color="#ffffff"
                  >
                    {iniciados} Projetos Iniciados
                  </Text>
                  <Text
                    p={1}
                    sx={{ fontSize: 14, fontWeight: "600" }}
                    color="#93E01B"
                  >
                    {Math.round((iniciados / total) * 100)}%
                  </Text>
                </Flex>

                <Flex gap={1} flex={1} align={"center"}>
                  <Text
                    p={1}
                    bg={"#2E69FD"}
                    sx={{ fontSize: 14, width: "200px", borderRadius: "2px" }}
                    color="#ffffff"
                  >
                    {finalizados} Projetos Finalizados
                  </Text>
                  <Text
                    p={1}
                    sx={{ fontSize: 14, fontWeight: "600" }}
                    color="#0239C3"
                  >
                    {Math.round((finalizados / total) * 100)}%
                  </Text>
                </Flex>

                <Flex gap={1} flex={1} align={"center"}>
                  <Text
                    p={1}
                    bg={"#F94144"}
                    sx={{ fontSize: 14, width: "200px", borderRadius: "2px" }}
                    color="#ffffff"
                  >
                    {cancelados} Projetos Cancelados
                  </Text>
                  <Text
                    p={1}
                    sx={{ fontSize: 14, fontWeight: "600" }}
                    color="#F94144"
                  >
                    {Math.round((cancelados / total) * 100)}%
                  </Text>
                </Flex>

                <Flex gap={1} flex={1} align={"center"}>
                  <Text
                    p={1}
                    bg={"#F4DD06"}
                    sx={{ fontSize: 14, width: "200px", borderRadius: "2px" }}
                    color="#ffffff"
                  >
                    {holds} Projetos Holds
                  </Text>
                  <Text
                    p={1}
                    sx={{ fontSize: 14, fontWeight: "600" }}
                    color="#F4DD06"
                  >
                    {Math.round((holds / total) * 100)}%
                  </Text>
                </Flex>

                <Flex gap={1} flex={1} align={"center"}>
                  <Text
                    p={1}
                    bg={"#aaaaaa"}
                    sx={{ fontSize: 14, width: "200px", borderRadius: "2px" }}
                    color="#ffffff"
                  >
                    {naoIniciado} Projetos Não Iniciados
                  </Text>
                  <Text
                    p={1}
                    sx={{ fontSize: 14, fontWeight: "600" }}
                    color="#aaaaaa"
                  >
                    {Math.round((naoIniciado / total) * 100)}%
                  </Text>
                </Flex>

                <Flex gap={1} flex={1} align={"center"}>
                  <Text
                    p={1}
                    bg={"#ffa70f"}
                    sx={{ fontSize: 14, width: "200px", borderRadius: "2px" }}
                    color="#ffffff"
                  >
                    {reprogramado} Projetos Reprogramados
                  </Text>
                  <Text
                    p={1}
                    sx={{ fontSize: 14, fontWeight: "600" }}
                    color="#ffa70f"
                  >
                    {Math.round((reprogramado / total) * 100)}%
                  </Text>
                </Flex>

                <Flex gap={1} flex={1} align={"center"}>
                  <Text
                    p={1}
                    bg={"#c50ffc"}
                    sx={{ fontSize: 14, width: "200px", borderRadius: "2px" }}
                    color="#ffffff"
                  >
                    {preAprovacao} Projetos Pré Aprovação Diretor
                  </Text>
                  <Text
                    p={1}
                    sx={{ fontSize: 14, fontWeight: "600" }}
                    color="#c50ffc"
                  >
                    {Math.round((preAprovacao / total) * 100)}%
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Flex align={"center"} justify={"center"} flex={1}>
            <StackedBarChart
              showY={false}
              sizeW={280}
              sizeH={272}
              data={dataMock}
              dataEntries={dataEntries}
              barW={30}
            />
          </Flex>

          <Flex
            direction={"column"}
            justifyContent={"space-between"}
            flex={1}
            gap={5}
          >
            <Box>
              <Text
                sx={{ fontSize: 16, fontWeight: "600", alignSelf: "center" }}
                color="#000000"
              >
                Projetos Prioridade
              </Text>
              <Box
                mt={2}
                sx={{
                  display: "flex",
                  alignItens: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text
                  sx={{
                    fontSize: 16,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                  color="#9FA2B4"
                >
                  Prioridade alta
                </Text>
                <Text
                  sx={{
                    fontSize: 16,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                  color="#1FBE55"
                >
                  {prioridadeAlta}
                </Text>
              </Box>
              <Box
                mt={2}
                sx={{
                  display: "flex",
                  alignItens: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text
                  sx={{
                    fontSize: 16,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                  color="#9FA2B4"
                >
                  Prioridade média
                </Text>
                <Text
                  sx={{
                    fontSize: 16,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                  color="#F4DD06"
                >
                  {prioridadeMedia}
                </Text>
              </Box>
              <Box
                mt={2}
                sx={{
                  display: "flex",
                  alignItens: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text
                  sx={{
                    fontSize: 16,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                  color="#9FA2B4"
                >
                  Prioridade baixa
                </Text>
                <Text
                  sx={{
                    fontSize: 16,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                  color="#F94144"
                >
                  {prioridadeBaixa}
                </Text>
              </Box>
            </Box>
            <Box>
              <Text
                sx={{ fontSize: 16, fontWeight: "600", alignSelf: "center" }}
                color="#000000"
              >
                Projetos Complexidade
              </Text>
              <Box
                mt={2}
                sx={{
                  display: "flex",
                  alignItens: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text
                  sx={{
                    fontSize: 16,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                  color="#9FA2B4"
                >
                  Prioridade alta
                </Text>
                <Text
                  sx={{
                    fontSize: 16,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                  color="#1FBE55"
                >
                  {complexidadeAlta}
                </Text>
              </Box>
              <Box
                mt={2}
                sx={{
                  display: "flex",
                  alignItens: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text
                  sx={{
                    fontSize: 16,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                  color="#9FA2B4"
                >
                  Prioridade média
                </Text>
                <Text
                  sx={{
                    fontSize: 16,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                  color="#F4DD06"
                >
                  {complexidadeMedia}
                </Text>
              </Box>
              <Box
                mt={2}
                sx={{
                  display: "flex",
                  alignItens: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text
                  sx={{
                    fontSize: 16,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                  color="#9FA2B4"
                >
                  Prioridade baixa
                </Text>
                <Text
                  sx={{
                    fontSize: 16,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                  color="#F94144"
                >
                  {complexidadeBaixa}
                </Text>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
