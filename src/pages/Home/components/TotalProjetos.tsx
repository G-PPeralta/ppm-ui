import { useState, useEffect } from "react";

import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { TotalProjetosDashboard } from "interfaces/Services";

import StackedBarChartProjetos from "components/StackedBarChart";

import { getTotalProjetos, getTotalProjetosMes } from "services/get/Dashboard";

export default function TotalProjetosComponent() {
  const [total, setTotal] = useState(0);
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
  const [totalProjetosMes, setTotalProjetosMes] = useState<
    TotalProjetosDashboard[]
  >([] as TotalProjetosDashboard[]);

  async function handleGetTipoResponsavel() {
    const { data } = await getTotalProjetos();
    setTotal(data.totalProjetos);
    data.projetosPorStatus[1] && setIniciados(data.projetosPorStatus[1].qtd);
    // setIniciados(
    //   data.projetosPorStatus[1].qtd +
    //     data.projetosPorStatus[2].qtd +
    //     data.projetosPorStatus[3].qtd,
    // );
    data.projetosPorStatus[0] && setNaoIniciado(data.projetosPorStatus[0].qtd);
    data.projetosPorStatus[2] && setReprogramado(data.projetosPorStatus[2].qtd);
    data.projetosPorStatus[3] && setPreAprovacao(data.projetosPorStatus[3].qtd);
    data.projetosPorStatus[5] && setFinalizados(data.projetosPorStatus[5].qtd);
    data.projetosPorStatus[4] && setCancelados(data.projetosPorStatus[4].qtd);
    data.projetosPorStatus[6] && setHolds(data.projetosPorStatus[6].qtd);
    // setHolds(data.projetosPorStatus[6].qtd + data.projetosPorStatus[0].qtd);
    setPrioridadeAlta(data.prioridades.alta);
    setPrioridadeMedia(data.prioridades.media);
    setPrioridadeBaixa(data.prioridades.baixa);
    setComplexidadeAlta(data.complexidades.alta);
    setComplexidadeMedia(data.complexidades.media);
    setComplexidadeBaixa(data.complexidades.baixa);
  }

  async function fetchProjetosMes() {
    const response = await getTotalProjetosMes();
    setTotalProjetosMes(response.data);
  }

  useEffect(() => {
    handleGetTipoResponsavel();
    fetchProjetosMes();
  }, []);

  const data =
    totalProjetosMes &&
    totalProjetosMes.map((pr) => ({
      mes: pr.month,
      Iniciados: pr.iniciados,
      Finalizados: pr.finalizados,
      Cancelados: pr.cancelados,
      Holds: pr.holds,
      "Não Iniciados": pr.nao_iniciados,
      Reprogramados: pr.reprogramado,
      "Pré-Aprovação": pr.pre_aprovacao,
    }));

  // const data = [
  //   {
  //     mes: "Jan/22",
  //     Iniciados: 10,
  //     Finalizados: 10,
  //     Cancelados: 10,
  //     Holds: 10,
  //     Não_Iniciados: 10,
  //     Reprogramados: 10,
  //     Pré_Aprovação: 40,
  //   },
  //   {
  //     mes: "Fev/22",
  //     Iniciados: 10,
  //     Finalizados: 10,
  //     Cancelados: 10,
  //     Holds: 40,
  //     Não_Iniciados: 10,
  //     Reprogramados: 10,
  //     Pré_Aprovação: 10,
  //   },
  //   {
  //     mes: "Mar/22",
  //     Iniciados: 10,
  //     Finalizados: 10,
  //     Cancelados: 10,
  //     Holds: 10,
  //     Não_Iniciados: 10,
  //     Reprogramados: 40,
  //     Pré_Aprovação: 10,
  //   },
  //   {
  //     mes: "Abr/22",
  //     Iniciados: 10,
  //     Finalizados: 10,
  //     Cancelados: 10,
  //     Holds: 10,
  //     Não_Iniciados: 40,
  //     Reprogramados: 10,
  //     Pré_Aprovação: 10,
  //   },
  // ];

  const dataEntries = [
    { name: "Iniciados", color: "#649efd" },
    { name: "Finalizados", color: "#4d87e5" },
    { name: "Cancelados", color: "#3771d1" },
    { name: "Holds", color: "#2762c2" },
    { name: "Não Iniciados", color: "#1954b4" },
    { name: "Reprogramados", color: "#1048a4" },
    { name: "Pré-Aprovação", color: "#003a9a" },
  ];

  return (
    <Flex w={"100%"} align="center" justify="center" bg={"#EDF2F7"}>
      <Box
        py={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
        px={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
        w={"90%"}
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
          <Flex
            direction={"row"}
            gap={2}
            flex={1}
            // style={{ border: "1px solid red" }}
            // w="50%"
          >
            <Flex gap={2} flex={1}>
              <Flex
                px={1}
                py={5}
                bg={"#6886B6"}
                sx={{ width: 35, borderRadius: "2px" }}
                flex={1}
                justify={"center"}
                align={"start"}
                height={200}
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
                height={200}
              >
                <Flex gap={1} flex={1}>
                  <Text
                    p={1}
                    bg={"#9EE09E"}
                    sx={{
                      fontSize: 14,
                      width: "200px",
                      borderRadius: "2px",
                    }}
                    color="#ffffff"
                  >
                    {iniciados} Projetos Iniciados
                  </Text>
                  <Text
                    p={1}
                    sx={{ fontSize: 14, fontWeight: "600" }}
                    color="#93E01B"
                  >
                    {total === 0 ? 0 : Math.round((iniciados / total) * 100)}%
                  </Text>
                </Flex>

                <Flex gap={1} flex={1}>
                  <Text
                    p={1}
                    bg={"#9EC1CF"}
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
                    {total === 0 ? 0 : Math.round((finalizados / total) * 100)}%
                  </Text>
                </Flex>

                <Flex gap={1} flex={1}>
                  <Text
                    p={1}
                    bg={"#FF6663"}
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
                    {total === 0 ? 0 : Math.round((cancelados / total) * 100)}%
                  </Text>
                </Flex>

                <Flex gap={1} flex={1}>
                  <Text
                    p={1}
                    bg={"#FEB144"}
                    sx={{ fontSize: 14, width: "200px", borderRadius: "2px" }}
                    color="#ffffff"
                  >
                    {holds + naoIniciado + preAprovacao + reprogramado} Outros
                  </Text>
                  <Text
                    p={1}
                    sx={{ fontSize: 14, fontWeight: "600" }}
                    color="#FEB144"
                  >
                    {total === 0
                      ? 0
                      : Math.round(
                          ((holds + naoIniciado + preAprovacao + reprogramado) /
                            total) *
                            100
                        )}
                    %
                  </Text>
                </Flex>

                {/* <Flex gap={1} flex={1} align={"center"}>
                  <Text
                    p={1}
                    bg={"#2762c2"}
                    sx={{ fontSize: 14, width: "200px", borderRadius: "2px" }}
                    color="#ffffff"
                  >
                    {holds} Projetos on Hold
                  </Text>
                  <Text
                    p={1}
                    sx={{ fontSize: 14, fontWeight: "600" }}
                    color="#F4DD06"
                  >
                    {total === 0 ? 0 : Math.round((holds / total) * 100)}%
                  </Text>
                </Flex>

                <Flex gap={1} flex={1} align={"center"}>
                  <Text
                    p={1}
                    bg={"#1954b4"}
                    sx={{ fontSize: 14, width: "200px", borderRadius: "2px" }}
                    color="#ffffff"
                  >
                    {naoIniciado} Projetos Não Iniciados
                  </Text>
                  <Text
                    p={1}
                    sx={{ fontSize: 14, fontWeight: "600" }}
                    color="#1954b4"
                  >
                    {total === 0 ? 0 : Math.round((naoIniciado / total) * 100)}%
                  </Text>
                </Flex>

                <Flex gap={1} flex={1} align={"center"}>
                  <Text
                    p={1}
                    bg={"#1048a4"}
                    sx={{ fontSize: 14, width: "200px", borderRadius: "2px" }}
                    color="#ffffff"
                  >
                    {reprogramado} Projetos Reprogramados
                  </Text>
                  <Text
                    p={1}
                    sx={{ fontSize: 14, fontWeight: "600" }}
                    color="#1048a4"
                  >
                    {total === 0 ? 0 : Math.round((reprogramado / total) * 100)}
                    %
                  </Text>
                </Flex>

                <Flex gap={1} flex={1} align={"center"}>
                  <Text
                    p={1}
                    bg={"#003a9a"}
                    sx={{ fontSize: 14, width: "200px", borderRadius: "2px" }}
                    color="#ffffff"
                  >
                    {preAprovacao} Projetos Pré Aprovação Diretor
                  </Text>
                  <Text
                    p={1}
                    sx={{ fontSize: 14, fontWeight: "600" }}
                    color="#003a9a"
                  >
                    {total === 0 ? 0 : Math.round((preAprovacao / total) * 100)}
                    %
                  </Text>
                </Flex> */}
              </Flex>
            </Flex>
          </Flex>

          <Flex align={"center"} justify={"center"} flex={1}>
            <StackedBarChartProjetos
              showY={false}
              sizeW={280}
              sizeH={272}
              data={data}
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
                Prioridade Projetos
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
                  Alta
                </Text>
                <Text
                  sx={{
                    fontSize: 16,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                  color="#9EE09E"
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
                  Média
                </Text>
                <Text
                  sx={{
                    fontSize: 16,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                  color="#FEB144"
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
                  Baixa
                </Text>
                <Text
                  sx={{
                    fontSize: 16,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                  color="#FF6663"
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
                  Alta
                </Text>
                <Text
                  sx={{
                    fontSize: 16,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                  color="#9EE09E"
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
                  Média
                </Text>
                <Text
                  sx={{
                    fontSize: 16,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                  color="#FEB144"
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
                  Baixa
                </Text>
                <Text
                  sx={{
                    fontSize: 16,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                  color="#FF6663"
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
