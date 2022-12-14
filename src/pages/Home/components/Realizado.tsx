// import { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

// import { TotalOrcamento, TotalRealizado } from "interfaces/Services";

// import { getOrcamentoTotal, getTotalRealizado } from "services/get/Dashboard";

import { useDashboard } from "contexts/Dashboard";

export default function RealizadoComponent() {
  // const [totalRealizado, setTotalRealizado] = useState<TotalRealizado[]>(
  //   [] as TotalRealizado[]
  // );
  // const [orcamento, setTotalOrcamento] = useState<TotalOrcamento[]>();
  // const [loading, setLoading] = useState(false);

  // async function handleGetTotalRealizado() {
  //   setLoading(true);
  //   const reqGet = await getTotalRealizado();

  //   setTotalRealizado(reqGet.data[0].totalRealizado);
  //   setLoading(false);
  // }

  // async function handleGetTotalOrcamento() {
  //   const reqGet = await getOrcamentoTotal();

  //   setTotalOrcamento(reqGet.data[0].total);
  // }

  // useEffect(() => {
  //   handleGetTotalOrcamento();
  //   handleGetTotalRealizado();
  //   setLoading(false);
  // }, []);

  // const valorFormatado = totalRealizado && totalRealizado.toLocaleString();
  const { loading, valorRealizado, porcentagemRealizado } = useDashboard();

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
            Realizado
          </Text>
          <Box sx={{ display: "flex" }}>
            {/* <Text
              sx={{ fontSize: 12, fontWeight: "600", alignSelf: "center" }}
              color="#000000"
            >
              R$
            </Text> */}
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
              {!loading && valorRealizado === 0 ? (
                <p>
                  R$ <span style={{ color: "#9EC1CF" }}>0,00</span>
                </p>
              ) : (
                <div>
                  {valorRealizado
                    .toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                    .split(",")[0]
                    .substring(0, 2)}
                  <span style={{ color: "#9EC1CF" }}>
                    {valorRealizado
                      .toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                      .split(",")[0]
                      .substring(2)}
                  </span>
                </div>
              )}
            </Text>
          </Box>
        </Box>
        <Flex
          justifyContent="center"
          borderRadius="2px"
          flexDir={"row"}
          alignItems="center"
          bg={"#9EC1CF"}
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
            {/* {!totalRealizado ||
            !orcamento ||
            isNaN(Number(totalRealizado)) ||
            isNaN(Number(orcamento))
              ? 0
              : ((Number(totalRealizado) / Number(orcamento)) * 100).toFixed(2)} */}
            {!loading && porcentagemRealizado.toFixed(0).replace(".", ",")}%
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
