//  CRIADO EM: 6/2022
//  AUTOR: Bruno Fracaro, Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Valores não previstos.

import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import { useDashboard } from "contexts/Dashboard";

export default function NaoPrevistoComponent() {
  const { loading, valorNaoPrevisto, porcentagemNaoPrevisto } = useDashboard();

  return (
    <Flex
      py={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
      px={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
      w={"100%"}
      bg={"white"}
      boxShadow={useColorModeValue("md", "md-dark")}
      borderRadius={"xl"}
      flex={1}
      align={"center"}
      justify={"center"}
    >
      <Box
        w={"100%"}
        sx={{ display: "flex" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Text
            mb={1}
            sx={{
              fontSize: 18,
              fontWeight: "700",
              fontFamily: "Mulish",
              alignSelf: "center",
            }}
            color="#000000"
          >
            Não Previsto
          </Text>
          <Box display={"flex"}>
            <Text
              ml={2}
              sx={{
                fontSize: 18,
                fontWeight: "700",
                fontFamily: "Mulish",
                alignSelf: "center",
              }}
              color="#000000"
            >
              {!loading && valorNaoPrevisto <= 0 ? (
                <p>
                  {Math.abs(valorNaoPrevisto)
                    .toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                    .substring(0, 2)}
                  <span style={{ color: "#FF6663" }}>
                    {Math.abs(valorNaoPrevisto)
                      .toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                      .substring(2)}
                  </span>
                </p>
              ) : (
                <p>
                  R$ <span style={{ color: "#FF6663" }}>0,00</span>
                </p>
              )}
            </Text>
          </Box>
        </Box>
        <Flex
          justifyContent="center"
          borderRadius="2px"
          flexDir={"row"}
          alignItems="center"
          bg={"#FF6663"}
          h="48px"
          w="62px"
          p="8px"
          gap="8px"
          sx={{ height: "100%", alignItems: "center", borderRadius: "2px" }}
        >
          <Text
            p={1}
            sx={{
              fontSize: 18,
              fontWeight: "700",
              fontFamily: "Mulish",
              alignSelf: "center",
            }}
            color="#ffffff"
          >
            {!loading && porcentagemNaoPrevisto.toFixed(0).replace(".", ",")}%
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
