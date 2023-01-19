//  CRIADO EM: 6/2022
//  AUTOR: Bruno Fracaro, Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Card total de projetos dashboard.

import { useState, useEffect } from "react";

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
import { TotalProjetosDashboard } from "interfaces/Services";

import {
  getRanking,
  getTotalProjetos,
  getTotalProjetosMes,
} from "services/get/Dashboard";

import TotalFases from "./TotalFases";

export default function TotalProjetosComponent() {
  const [total, setTotal] = useState(0);
  const [iniciados, setIniciados] = useState(0);
  const [finalizados, setFinalizados] = useState(0);
  const [cancelados, setCancelados] = useState(0);
  const [holds, setHolds] = useState(0);
  const [naoIniciado, setNaoIniciado] = useState(0);
  const [reprogramado, setReprogramado] = useState(0);
  const [preAprovacao, setPreAprovacao] = useState(0);
  const [emAnalise, setEmAnalise] = useState(0);
  const [prioridadeAlta, setPrioridadeAlta] = useState(0);
  const [prioridadeMedia, setPrioridadeMedia] = useState(0);
  const [prioridadeBaixa, setPrioridadeBaixa] = useState(0);
  const [complexidadeAlta, setComplexidadeAlta] = useState(0);
  const [complexidadeMedia, setComplexidadeMedia] = useState(0);
  const [complexidadeBaixa, setComplexidadeBaixa] = useState(0);
  const [totalProjetosMes, setTotalProjetosMes] = useState<
    TotalProjetosDashboard[]
  >([] as TotalProjetosDashboard[]);

  const [isVisible, setIsVisible] = useState(false);

  async function handleGetTipoResponsavel() {
    const { data } = await getTotalProjetos();

    setTotal(data.totalProjetos);
    const iniciadosIndex = data.projetosPorStatus.findIndex(
      (chave: any) =>
        chave.status === "4. Em andamento" || chave.status === "3. Em andamento"
    );
    const naoIniciadosIndex = data.projetosPorStatus.findIndex(
      (chave: any) => chave.status === "1. Não Iniciado"
    );
    const reprogramadoIndex = data.projetosPorStatus.findIndex(
      (chave: any) => chave.status === "6. Reprogramado"
    );
    const preAprovacaoIndex = data.projetosPorStatus.findIndex(
      (chave: any) => chave.status === "3. Pré Aprovação Diretor"
    );
    const finalizadosIndex = data.projetosPorStatus.findIndex(
      (chave: any) => chave.status === "7. Concluído"
    );
    const canceladosIndex = data.projetosPorStatus.findIndex(
      (chave: any) => chave.status === "8. Cancelado"
    );
    const holdsIndex = data.projetosPorStatus.findIndex(
      (chave: any) => chave.status === "5. Hold"
    );
    const analiseIndex = data.projetosPorStatus.findIndex(
      (chave: any) => chave.status === "2. Em análise"
    );

    data.projetosPorStatus[iniciadosIndex] &&
      setIniciados(data.projetosPorStatus[iniciadosIndex].qtd);
    data.projetosPorStatus[naoIniciadosIndex] &&
      setNaoIniciado(data.projetosPorStatus[naoIniciadosIndex].qtd);
    data.projetosPorStatus[reprogramadoIndex] &&
      setReprogramado(data.projetosPorStatus[reprogramadoIndex].qtd);
    data.projetosPorStatus[preAprovacaoIndex] &&
      setPreAprovacao(data.projetosPorStatus[preAprovacaoIndex].qtd);
    data.projetosPorStatus[finalizadosIndex] &&
      setFinalizados(data.projetosPorStatus[finalizadosIndex].qtd);
    data.projetosPorStatus[canceladosIndex] &&
      setCancelados(data.projetosPorStatus[canceladosIndex].qtd);
    data.projetosPorStatus[holdsIndex] &&
      setHolds(data.projetosPorStatus[holdsIndex].qtd);
    data.projetosPorStatus[analiseIndex] &&
      setEmAnalise(data.projetosPorStatus[analiseIndex].qtd);
  }

  const handleGetRanking = async () => {
    const { data } = await getRanking();

    setPrioridadeAlta(data.prioridade.Alto);
    setPrioridadeMedia(data.prioridade.Médio);
    setPrioridadeBaixa(data.prioridade.Baixo);
    setComplexidadeAlta(data.complexidade.A);
    setComplexidadeMedia(data.complexidade.M);
    setComplexidadeBaixa(data.complexidade.B);
  };

  async function fetchProjetosMes() {
    const response = await getTotalProjetosMes();
    setTotalProjetosMes(response.data);
  }

  useEffect(() => {
    handleGetTipoResponsavel();
    fetchProjetosMes();
    handleGetRanking();
  }, []);

  const hoverProps = {
    holds,
    holdsPercentage: total === 0 ? 0 : Math.round((holds / total) * 100),
    preAprovacao,
    preAprovacaoPercentage:
      total === 0 ? 0 : Math.round((preAprovacao / total) * 100),
    reprogramado,
    reprogramadoPercentage:
      total === 0 ? 0 : Math.round((reprogramado / total) * 100),
    naoIniciado,
    naoIniciadoPercentage:
      total === 0 ? 0 : Math.round((naoIniciado / total) * 100),
    emAnalise,
    emAnalisePercentage:
      total === 0 ? 0 : Math.round((emAnalise / total) * 100),
  };

  const data =
    totalProjetosMes &&
    totalProjetosMes.map((pr) => ({
      mes: pr.mes,
      Iniciado: pr.iniciados,
      Finalizado: pr.finalizados,
      Cancelado: pr.cancelados,
      Outros: pr.outros,
    }));

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
      >
        <Popover isOpen={isVisible} placement="left-end">
          <PopoverContent w={"fit-content"}>
            <PopoverBody w={"fit-content"}>
              <Box>
                <Box>
                  <Text color={"#1C1B1B"} fontWeight="700">
                    Holds:{" "}
                    <span
                      style={{
                        fontFamily: "Mulish",
                        fontWeight: 400,
                      }}
                    >
                      {hoverProps.holds} - {hoverProps.holdsPercentage}%
                    </span>
                  </Text>
                </Box>
                <Box>
                  <Text color={"#1C1B1B"} fontWeight="700">
                    Projetos Pré Aprovação:{" "}
                    <span
                      style={{
                        fontFamily: "Mulish",
                        fontWeight: 400,
                      }}
                    >
                      {hoverProps.preAprovacao} -{" "}
                      {hoverProps.preAprovacaoPercentage}%
                    </span>
                  </Text>
                </Box>
                <Box>
                  <Text color={"#1C1B1B"} fontWeight="700">
                    Projetos Reprogramados:{" "}
                    <span
                      style={{
                        fontFamily: "Mulish",
                        fontWeight: 400,
                      }}
                    >
                      {hoverProps.reprogramado} -{" "}
                      {hoverProps.reprogramadoPercentage}%
                    </span>
                  </Text>
                </Box>
                <Box>
                  <Text color={"#1C1B1B"} fontWeight="700">
                    Projetos Não Iniciados:{" "}
                    <span
                      style={{
                        fontFamily: "Mulish",
                        fontWeight: 400,
                      }}
                    >
                      {hoverProps.naoIniciado} -{" "}
                      {hoverProps.naoIniciadoPercentage}%
                    </span>
                  </Text>
                </Box>
                <Box>
                  <Text color={"#1C1B1B"} fontWeight="700">
                    Projetos Em Análise:{" "}
                    <span
                      style={{
                        fontFamily: "Mulish",
                        fontWeight: 400,
                      }}
                    >
                      {hoverProps.emAnalise} - {hoverProps.emAnalisePercentage}%
                    </span>
                  </Text>
                </Box>
              </Box>
            </PopoverBody>
          </PopoverContent>

          <Text
            mb={2}
            sx={{
              fontSize: 24,
              fontWeight: "700",
              fontFamily: "Mulish",
              width: "100%",
              textAlign: "flex-start",
            }}
            color="#000000"
          >
            Total de Projetos
          </Text>

          <Box
            display="flex"
            flexWrap="wrap"
            flexDirection={{ base: "column", lg: "row" }}
            w={"100%"}
            justifyContent={"space-between"}
            flex={1}
          >
            <Box
              overflowX={"unset"}
              w={"100%"}
              h={260}
              display={"flex"}
              justifyContent={"center"}
            >
              <Flex gap={2} flex={1}>
                <Flex flex={3}>
                  <Flex
                    px={1}
                    py={5}
                    bg={"#6886B6"}
                    sx={{ width: 35, borderRadius: "2px" }}
                    justify={"center"}
                    align={"center"}
                    height={200}
                    mr={3}
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
                    direction={"column"}
                    justify={"space-between"}
                    gap={2}
                    flex={1}
                    height={200}
                  >
                    <Flex gap={1} flex={1}>
                      <Text
                        p={3}
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
                        {total === 0
                          ? 0
                          : Math.round((iniciados / total) * 100)}
                        %
                      </Text>
                    </Flex>

                    <Flex gap={1} flex={1}>
                      <Text
                        p={3}
                        bg={"#9EC1CF"}
                        sx={{
                          fontSize: 14,
                          width: "200px",
                          borderRadius: "2px",
                        }}
                        color="#ffffff"
                      >
                        {finalizados} Projetos Finalizados
                      </Text>
                      <Text
                        p={1}
                        sx={{ fontSize: 14, fontWeight: "600" }}
                        color="#0239C3"
                      >
                        {total === 0
                          ? 0
                          : Math.round((finalizados / total) * 100)}
                        %
                      </Text>
                    </Flex>

                    <Flex gap={1} flex={1}>
                      <Text
                        p={3}
                        bg={"#FF6663"}
                        sx={{
                          fontSize: 14,
                          width: "200px",
                          borderRadius: "2px",
                        }}
                        color="#ffffff"
                      >
                        {cancelados} Projetos Cancelados
                      </Text>
                      <Text
                        p={1}
                        sx={{ fontSize: 14, fontWeight: "600" }}
                        color="#F94144"
                      >
                        {total === 0
                          ? 0
                          : Math.round((cancelados / total) * 100)}
                        %
                      </Text>
                    </Flex>

                    <Flex
                      gap={1}
                      flex={1}
                      onMouseEnter={() => setIsVisible(!isVisible)}
                      onMouseLeave={() => setIsVisible(!isVisible)}
                    >
                      <PopoverAnchor>
                        <Text
                          p={3}
                          bg={"#FEB144"}
                          sx={{
                            fontSize: 14,
                            width: "200px",
                            borderRadius: "2px",
                          }}
                          color="#ffffff"
                        >
                          {holds +
                            naoIniciado +
                            preAprovacao +
                            reprogramado +
                            emAnalise}{" "}
                          Outros
                        </Text>
                      </PopoverAnchor>
                      <Text
                        p={1}
                        sx={{ fontSize: 14, fontWeight: "600" }}
                        color="#FEB144"
                      >
                        {total === 0
                          ? 0
                          : Math.round(
                              ((holds +
                                naoIniciado +
                                preAprovacao +
                                reprogramado +
                                emAnalise) /
                                total) *
                                100
                            )}
                        %
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              <Flex align={"center"} justify={"center"} flex={3}>
                <TotalFases data={data} />
              </Flex>
              <Flex direction={"column"}>
                <Flex
                  direction={"column"}
                  flex={3}
                  gap={5}
                  maxW={"200px"}
                  justify={"center"}
                  wrap={"wrap"}
                  mr={6}
                  w={300}
                >
                  <Box mt={-1}>
                    <Text
                      sx={{
                        fontSize: 15.5,
                        fontWeight: "600",
                        alignSelf: "center",
                      }}
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
                          fontSize: 15,
                          fontWeight: "600",
                          alignSelf: "center",
                        }}
                        color="#9FA2B4"
                      >
                        Alta
                      </Text>
                      <Text
                        sx={{
                          fontSize: 15,
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
                          fontSize: 15,
                          fontWeight: "600",
                          alignSelf: "center",
                        }}
                        color="#9FA2B4"
                      >
                        Média
                      </Text>
                      <Text
                        sx={{
                          fontSize: 15,
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
                          fontSize: 15,
                          fontWeight: "600",
                          alignSelf: "center",
                        }}
                        color="#9FA2B4"
                      >
                        Baixa
                      </Text>
                      <Text
                        sx={{
                          fontSize: 15,
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
                      sx={{
                        fontSize: 15.5,
                        fontWeight: "600",
                        alignSelf: "center",
                      }}
                      color="#000000"
                    >
                      Complexidade Projetos
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
                          fontSize: 15,
                          fontWeight: "600",
                          alignSelf: "center",
                        }}
                        color="#9FA2B4"
                      >
                        Alta
                      </Text>
                      <Text
                        sx={{
                          fontSize: 15,
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
                          fontSize: 15,
                          fontWeight: "600",
                          alignSelf: "center",
                        }}
                        color="#9FA2B4"
                      >
                        Média
                      </Text>
                      <Text
                        sx={{
                          fontSize: 15,
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
                          fontSize: 15,
                          fontWeight: "600",
                          alignSelf: "center",
                        }}
                        color="#9FA2B4"
                      >
                        Baixa
                      </Text>
                      <Text
                        sx={{
                          fontSize: 15,
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
              </Flex>
            </Box>
          </Box>
        </Popover>
      </Box>
    </Flex>
  );
}
