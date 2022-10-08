import { FaWarehouse } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ICardInfoProjeto } from "interfaces/DetalhamentoProjetos";
import { ProjetoProgresso } from "interfaces/Services";

import { PercentagePieChartProjetoInfo } from "components/PercentagePieChartProjetoInfo";

type infoProjetoProps = {
  infoProjeto: ICardInfoProjeto;
  progresso: ProjetoProgresso[];
  loading: boolean;
};

function CardInfoProjeto({
  infoProjeto,
  progresso,
  loading,
}: infoProjetoProps) {
  const chartsProps = [
    {
      name: "Undone",
      value: progresso
        ? 100 - Number(progresso[0].fn_cron_calc_pct_real.substring(0, 2))
        : 0,
      color: "#dddddd",
    },
    {
      name: "Done",
      value: progresso
        ? Number(progresso[0].fn_cron_calc_pct_real.substring(0, 2))
        : 0,
      color: "#00B53D",
    },
  ];
  const innerWidth = window.innerWidth;

  function formatDate(date: Date) {
    const formated = date.toString().substring(0, 10).split("-");
    return `${formated[2]}/${formated[1]}/${formated[0]}`;
  }

  return (
    <>
      <Flex
        backgroundColor={"white"}
        p={5}
        borderRadius={5}
        direction={"column"}
        flex={2}
      >
        <Box
          mb={4}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          // justifyContent={"center"}
        >
          {!loading && <PercentagePieChartProjetoInfo data={chartsProps} />}
          <Heading as="h4" size="md" ml={4}>
            {infoProjeto.nome_projeto}
          </Heading>
        </Box>

        <Flex
          justifyContent={"space-between"}
          direction={innerWidth > 520 ? "row" : "column"}
        >
          <Box>
            <Flex>
              <Box display={"flex"}>
                <Text fontWeight={"600"}>Nº:</Text>
                <Text ml={2} color={"origem.500"} fontWeight={"600"}>
                  {infoProjeto.numero}
                </Text>
              </Box>
            </Flex>
            <Flex alignItems={"center"}>
              <Text fontWeight={"600"} color={"origem.500"}>
                <FiMapPin />
              </Text>
              <Text ml={1} fontWeight={"600"}>
                Polo:
              </Text>
              <Text ml={2} color={"origem.500"} fontWeight={"600"}>
                {infoProjeto.polo}
              </Text>
            </Flex>

            <Flex alignItems={"center"}>
              <Text fontWeight={"600"} color={"origem.500"}>
                <FaWarehouse />
              </Text>
              <Text ml={1} fontWeight={"600"}>
                Local:
              </Text>
              <Text ml={2} color={"origem.500"} fontWeight={"600"}>
                {infoProjeto.local}
              </Text>
            </Flex>

            <Flex alignItems={"center"}>
              <Text fontWeight={"600"} fontSize={14}>
                Coordenador:
              </Text>
              <Text
                ml={2}
                color={"origem.500"}
                fontWeight={"600"}
                fontSize={14}
              >
                {infoProjeto.coordenador_nome === null
                  ? "Nome do Coordenador"
                  : infoProjeto.coordenador_nome}
              </Text>
            </Flex>

            <Flex alignItems={"center"}>
              <Text fontWeight={"600"} fontSize={14}>
                Responsável:
              </Text>
              <Text
                ml={2}
                color={"origem.500"}
                fontWeight={"600"}
                fontSize={14}
              >
                {infoProjeto.nome_responsavel === null
                  ? "Nome do Responsável"
                  : infoProjeto.nome_responsavel}
              </Text>
            </Flex>

            <Flex alignItems={"center"}>
              <Text fontWeight={"600"} fontSize={14}>
                Área Demandada:
              </Text>
              <Text
                ml={2}
                color={"origem.500"}
                fontWeight={"600"}
                fontSize={14}
              >
                {infoProjeto.demanda}
              </Text>
            </Flex>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={innerWidth > 520 ? "flex-end" : "flex-start"}
            justifyContent={innerWidth > 520 ? "end" : "start"}
          >
            <Flex alignItems={"center"}>
              <Text fontWeight={"600"} fontSize={14}>
                Início:
              </Text>
              <Text
                ml={2}
                color={"origem.500"}
                fontWeight={"600"}
                fontSize={14}
              >
                {infoProjeto.data_inicio === null
                  ? "01/01/1900"
                  : formatDate(infoProjeto.data_inicio)}
              </Text>
            </Flex>

            <Flex alignItems={"center"}>
              <Text fontWeight={"600"} fontSize={14}>
                Término:
              </Text>
              <Text
                ml={2}
                color={"origem.500"}
                fontWeight={"600"}
                fontSize={14}
              >
                {infoProjeto.data_fim === null
                  ? "31/12/1900"
                  : formatDate(infoProjeto.data_fim)}
              </Text>
            </Flex>

            <Flex alignItems={"center"}>
              <Text fontWeight={"600"} fontSize={14}>
                Atraso:
              </Text>
              <Text
                ml={2}
                color={"origem.500"}
                fontWeight={"600"}
                fontSize={14}
              >
                5 dias
              </Text>
            </Flex>

            <Flex alignItems={"center"}>
              <Text fontWeight={"600"} fontSize={14}>
                Atualização:
              </Text>
              <Text
                ml={2}
                color={"origem.500"}
                fontWeight={"600"}
                fontSize={14}
              >
                12/08/2022
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default CardInfoProjeto;
