import * as React from "react";
import { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoIosWallet } from "react-icons/io";
import { useParams } from "react-router-dom";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { InfoFinanceira } from "interfaces/Services";

import {
  getCPiSPi,
  getInfoFinanceiro,
} from "services/get/DetalhamentoProjetos";

function CardOrcamento() {
  const { id } = useParams();
  const [cpiSpi, setCpiSpi] = useState({ cpi: 0, spi: 0 });
  const [loading, setLoading] = useState(false);
  const [infoFinanceira, setInfoFinanceira] = useState([] as InfoFinanceira[]);

  async function handleGetCpiSpi() {
    if (id) {
      setLoading(true);
      const reqGet = await getCPiSPi(Number(id));
      setCpiSpi(reqGet.data);
      setLoading(false);
    }
  }

  async function handleGetInfoFinanceira() {
    if (id) {
      const { data } = await getInfoFinanceiro(id);
      setInfoFinanceira(data);
    }
  }

  useEffect(() => {
    handleGetCpiSpi();
    handleGetInfoFinanceira();
    setLoading(false);
  }, []);

  const naoPrevisto =
    Number(infoFinanceira[0]?.realizado) - Number(infoFinanceira[0]?.planejado);

  return (
    <>
      <Flex
        backgroundColor={"white"}
        p={5}
        borderRadius={5}
        direction={"column"}
        flex={2}
        justify={"space-between"}
      >
        <Box mb={5}>
          <Box display={"flex"} alignItems={"center"}>
            <Heading as="h4" size="lg" color={"origem.300"}>
              <IoIosWallet />
            </Heading>
            <Heading as="h4" size="md" ml={2}>
              Orçamento
            </Heading>
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <Text fontSize={14} fontWeight={600}>
              R$
            </Text>
            <Text fontSize={18} ml={2} fontWeight={600}>
              {infoFinanceira[0]?.planejado.toLocaleString() + ",00"}
            </Text>
          </Box>
        </Box>

        <Flex direction={"row"} gap={4} wrap={"wrap"}>
          <Flex justify={"space-between"} direction={"column"} flex={1} gap={2}>
            <Flex alignItems={"center"} flex={1}>
              <Box flex={1}>
                <Box display={"flex"} alignItems={"center"}>
                  <Text fontSize={16} fontWeight={600}>
                    Remanescente
                  </Text>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Text fontSize={14} fontWeight={600}>
                    R$
                  </Text>
                  <Text fontSize={16} ml={2} fontWeight={600}>
                    {(
                      Number(infoFinanceira[0]?.planejado) -
                      Number(infoFinanceira[0]?.realizado)
                    ).toLocaleString() + ",00"}
                  </Text>
                </Box>
              </Box>
              <Box
                display={"flex"}
                justifyItems={"center"}
                justifyContent={"center"}
                alignItems="center"
                bg={"#059502"}
                ml={4}
                height={"56px"}
                width={"56px"}
                borderRadius={4}
              >
                <Text
                  p={1}
                  color="#ffffff"
                  fontSize={"16px"}
                  fontWeight={"600"}
                >
                  {(
                    ((Number(infoFinanceira[0]?.planejado) -
                      Number(infoFinanceira[0]?.realizado)) /
                      Number(infoFinanceira[0]?.planejado)) *
                    100
                  ).toLocaleString() + "%"}
                </Text>
              </Box>
            </Flex>
            <Flex alignItems={"center"} flex={1}>
              <Box flex={1}>
                <Box display={"flex"} alignItems={"center"}>
                  <Text fontSize={16} fontWeight={600}>
                    Realizado
                  </Text>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Text fontSize={14} fontWeight={600}>
                    R$
                  </Text>
                  <Text fontSize={16} ml={2} fontWeight={600}>
                    {infoFinanceira[0]?.realizado.toLocaleString() + ",00"}
                  </Text>
                </Box>
              </Box>
              <Box
                display={"flex"}
                justifyItems={"center"}
                justifyContent={"center"}
                alignItems="center"
                bg={"#2E69FD"}
                ml={4}
                height={"56px"}
                width={"56px"}
                borderRadius={4}
              >
                <Text
                  p={1}
                  color="#ffffff"
                  fontWeight={"600"}
                  fontSize={"16px"}
                >
                  {(
                    (Number(infoFinanceira[0]?.realizado) /
                      Number(infoFinanceira[0]?.planejado)) *
                    100
                  ).toLocaleString() + "%"}
                </Text>
              </Box>
            </Flex>
          </Flex>

          <Flex justify={"space-between"} direction={"column"} flex={1} gap={2}>
            <Flex alignItems={"center"} flex={1}>
              <Box flex={1}>
                <Box display={"flex"} alignItems={"center"}>
                  <Text fontSize={16} fontWeight={600}>
                    Não Previsto
                  </Text>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Text fontSize={14} fontWeight={600}>
                    R$
                  </Text>
                  <Text fontSize={16} ml={2} fontWeight={600}>
                    {naoPrevisto > 0
                      ? naoPrevisto.toLocaleString() + ",00"
                      : "0,00"}
                  </Text>
                </Box>
              </Box>
              <Box
                display={"flex"}
                justifyItems={"center"}
                justifyContent={"center"}
                alignItems="center"
                bg={"#CC0000"}
                height={"56px"}
                width={"56px"}
                borderRadius={4}
              >
                <Text
                  p={1}
                  color="#ffffff"
                  fontSize={"16px"}
                  fontWeight={"600"}
                >
                  {naoPrevisto > 0
                    ? (Number(naoPrevisto) /
                        Number(infoFinanceira[0]?.planejado)) *
                        100 +
                      "%"
                    : "0%"}
                </Text>
              </Box>
            </Flex>
            <Flex alignItems={"center"} flex={1} gap={2}>
              <Box
                display={"flex"}
                alignItems={"center"}
                flex={1}
                justifyContent={"center"}
                flexWrap={"wrap"}
                gap={1}
              >
                <Text color={"#00B53D"} fontSize={20}>
                  {(cpiSpi && cpiSpi.cpi) == 1 ? (
                    <BsCheckCircleFill />
                  ) : (
                    <BsCheckCircleFill color={"red"} />
                  )}
                </Text>
                <Text fontSize={16} fontWeight={600}>
                  CPI = {!loading && cpiSpi.cpi.toLocaleString()}
                </Text>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                flex={1}
                justifyContent={"center"}
                flexWrap={"wrap"}
                gap={1}
              >
                <Text color={"#00B53D"} fontSize={20}>
                  {cpiSpi && cpiSpi.spi == 1 ? (
                    <BsCheckCircleFill />
                  ) : (
                    <BsCheckCircleFill color={"red"} />
                  )}
                </Text>
                <Text fontSize={16} fontWeight={600}>
                  SPI = {!loading && cpiSpi.spi.toLocaleString()}
                </Text>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default CardOrcamento;
