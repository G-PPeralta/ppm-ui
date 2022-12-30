import { BsArrowRightShort } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { Flex, Heading, IconButton, Text } from "@chakra-ui/react";

// import { formatDate } from "utils/formatDate";
import { validateDate } from "utils/validateDate";

import { deleteCampanha } from "services/delete/DeleteCampanha";

type Poco = {
  id?: number;
  comp_pct: number;
  finalplanejado: string;
  id_campanha: number;
  id_poco: number;
  inicioplanejado: string;
  pct_plan: string;
  pct_real: string;
  poco: string;
  sonda: string;
  ind_alerta?: number;
  ind_status?: number;
  existe_cronograma?: boolean;
};

type Props = {
  poco: Poco;
  index: number;
  refresh: () => void;
};

function CardPIR({ poco, index, refresh }: Props) {
  const navigate = useNavigate();
  const dataInicioFormatada = poco.inicioplanejado;
  const dataFimFormatada = poco.finalplanejado;
  // const dataInicioFormatada = formatDate(new Date(poco.inicioplanejado));
  // const dataFimFormatada = formatDate(new Date(poco.finalplanejado));

  const intervencaoFoiIniciada = index === 0 && poco.pct_real !== "0";

  const transfer = () => {
    navigate(`/campanhas/atividade/${poco.id}`, {
      state: {
        poco,
        intervencaoFoiIniciada,
      },
    });
  };

  const transferToCronograma = (
    idCampanha: number,
    idAtividade: number | undefined
  ) => {
    navigate(`/estatisticas/cronograma/${idCampanha}/${idAtividade}`);
  };

  function deleteIntervencao(idCampanha: number, idAtividade: number) {
    deleteCampanha(idCampanha, idAtividade);
    refresh();
  }

  return (
    <>
      <Flex direction={"row"} gap={4} position={"relative"}>
        <Flex align={"center"} justify={"center"}>
          <Heading as="h3" size="sm" textAlign={"center"} width={"60px"}>
            {intervencaoFoiIniciada ? "Atual" : `${index + 1}º`}
          </Heading>
        </Flex>
        {poco.existe_cronograma ? (
          <IconButton
            icon={<BsArrowRightShort size={24} />}
            aria-label="Ir para o cronograma de execução"
            position={"absolute"}
            right={2}
            top={2}
            size={"sm"}
            backgroundColor={"transparent"}
            color={"white"}
            borderRadius={10}
            _hover={{
              backgroundColor: "white",
              color: validateDate(
                Number(poco.pct_plan),
                Number(poco.comp_pct),
                Number(poco.pct_real),
                poco.finalplanejado,
                Number(poco.ind_alerta),
                Number(poco.ind_status)
              ),
            }}
            onClick={() => {
              transferToCronograma(poco.id_campanha, poco.id_poco);
            }}
            zIndex={2}
          />
        ) : null}

        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          backgroundColor={validateDate(
            Number(poco.pct_plan),
            Number(poco.comp_pct),
            Number(poco.pct_real),
            poco.finalplanejado,
            Number(poco.ind_alerta),
            Number(poco.ind_status)
          )}
          px={5}
          py={3}
          borderRadius={12}
          _hover={{
            cursor: "pointer",
          }}
          gap={2}
          minW={"220px"}
          position={"relative"}
          onClick={() => transfer()}
        >
          <Flex>
            <Text
              fontSize={"sm"}
              color={poco.ind_alerta === 1 ? "#000000" : "#FEFEFE"}
              fontWeight={"bold"}
            >
              {poco.poco}
            </Text>
          </Flex>
          <Flex direction={"column"} w={"100%"}>
            <Flex direction={"row"} justify={"space-between"} w={"100%"}>
              <Text
                fontSize={"sm"}
                color={poco.ind_alerta === 1 ? "#000000" : "#FEFEFE"}
                fontWeight={"bold"}
                textAlign={"start"}
                flex={1}
              >
                Data Início:
              </Text>
              <Text
                fontSize={"sm"}
                color={poco.ind_alerta === 1 ? "#000000" : "#FEFEFE"}
                fontWeight={"semi-bold"}
                textAlign={"end"}
                ml={1}
                flex={1}
              >
                {dataInicioFormatada}
              </Text>
            </Flex>
            <Flex direction={"row"} justify={"space-between"} w={"100%"}>
              <Text
                fontSize={"sm"}
                color={poco.ind_alerta === 1 ? "#000000" : "#FEFEFE"}
                fontWeight={"bold"}
                textAlign={"start"}
                flex={1}
              >
                Data Fim:
              </Text>
              <Text
                fontSize={"sm"}
                color={poco.ind_alerta === 1 ? "#000000" : "#FEFEFE"}
                fontWeight={"semi-bold"}
                textAlign={"end"}
                ml={1}
                flex={1}
              >
                {dataFimFormatada}
              </Text>
            </Flex>
            <Flex direction={"row"} justify={"space-between"} w={"100%"}>
              <Text
                fontSize={"sm"}
                color={poco.ind_alerta === 1 ? "#000000" : "#FEFEFE"}
                fontWeight={"bold"}
                textAlign={"start"}
                flex={1}
              >
                Planejado:
              </Text>
              <Text
                fontSize={"sm"}
                color={poco.ind_alerta === 1 ? "#000000" : "#FEFEFE"}
                fontWeight={"semi-bold"}
                textAlign={"end"}
                ml={1}
                flex={1}
              >
                {`${poco.pct_plan}%`}
              </Text>
            </Flex>
            <Flex direction={"row"} justify={"space-between"} w={"100%"}>
              <Text
                fontSize={"sm"}
                color={poco.ind_alerta === 1 ? "#000000" : "#FEFEFE"}
                fontWeight={"bold"}
                textAlign={"start"}
                flex={1}
              >
                Realizado:
              </Text>
              <Text
                fontSize={"sm"}
                color={poco.ind_alerta === 1 ? "#000000" : "#FEFEFE"}
                fontWeight={"semi-bold"}
                textAlign={"end"}
                ml={1}
                flex={1}
              >
                {`${poco.pct_real}%`}
              </Text>
            </Flex>
            <Flex justify={"center"} w={"100%"} mt={2}>
              <IconButton
                icon={<FiTrash2 size={18} />}
                aria-label="Ir para o cronograma de execução"
                w={"20px"}
                size={"sm"}
                backgroundColor={"transparent"}
                color={"white"}
                borderRadius={10}
                _hover={{
                  backgroundColor: "white",
                  color: validateDate(
                    Number(poco.pct_plan),
                    Number(poco.comp_pct),
                    Number(poco.pct_real),
                    poco.finalplanejado,
                    Number(poco.ind_alerta),
                    Number(poco.ind_status)
                  ),
                }}
                onClick={() => {
                  deleteIntervencao(poco.id_campanha, poco.id_poco);
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default CardPIR;
