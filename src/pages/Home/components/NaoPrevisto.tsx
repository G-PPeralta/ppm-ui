// import { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

// import { TotalNaoPrevisto, TotalOrcamento } from "interfaces/Services";

// import { getOrcamentoTotal, getTotalNaoPrevisto } from "services/get/Dashboard";

import { useDashboard } from "contexts/Dashboard";

export default function NaoPrevistoComponent() {
  // const [totalNaoPrevisto, setTotalNaoPrevisto] = useState<TotalNaoPrevisto[]>(
  //   [] as TotalNaoPrevisto[]
  // );
  // const [totalOrcamento, setTotalOrcamento] = useState<TotalOrcamento[]>(
  //   [] as TotalOrcamento[]
  // );
  // const [loading, setLoading] = useState(false);

  // async function handleGetTotalOrcamento() {
  //   const reqGet = await getOrcamentoTotal();

  //   setTotalOrcamento(reqGet.data[0].total);
  // }

  // async function handleGetTotalNaoPrevisto() {
  //   setLoading(true);
  //   const reqGet = await getTotalNaoPrevisto();

  //   setTotalNaoPrevisto(reqGet.data[0].totalNaoPrevisto);
  //   setLoading(false);
  // }

  // useEffect(() => {
  //   handleGetTotalOrcamento();
  //   handleGetTotalNaoPrevisto();
  //   setLoading(false);
  // }, []);

  // const valorFormatado = totalNaoPrevisto && totalNaoPrevisto.toLocaleString();
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
            sx={{ fontSize: 16, fontWeight: "bold", alignSelf: "center" }}
            color="#000000"
          >
            Não Previsto
          </Text>
          <Box display={"flex"}>
            <Text
              sx={{ fontSize: 12, fontWeight: "600", alignSelf: "center" }}
              color="#000000"
            >
              R$
            </Text>
            <Text
              ml={2}
              sx={{ fontSize: 18, fontWeight: "600", alignSelf: "center" }}
              color="#000000"
            >
              {!loading && valorNaoPrevisto.toLocaleString().split(",")[0]}
            </Text>
          </Box>
        </Box>
        <Box
          justifyContent="center"
          alignItems="center"
          bg={"#F94144"}
          sx={{ height: "100%", alignItems: "center", borderRadius: "2px" }}
        >
          <Text
            p={1}
            sx={{ fontSize: 20, fontWeight: "600", alignSelf: "center" }}
            color="#ffffff"
          >
            {/* {!totalNaoPrevisto ||
            !totalOrcamento ||
            isNaN(Number(totalNaoPrevisto)) ||
            isNaN(Number(totalOrcamento))
              ? 0
              : (
                  (Number(totalNaoPrevisto) / Number(totalOrcamento)) *
                  100
                ).toFixed()} */}
            {!loading && porcentagemNaoPrevisto}%
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
