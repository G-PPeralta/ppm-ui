// import { useEffect, useState } from "react";

import { useState } from "react";
import { AiOutlineRise } from "react-icons/ai";

import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

// import { TotalOrcamento } from "interfaces/Services";

// import { getOrcamentoTotal } from "services/get/Dashboard";

import { useDashboard } from "contexts/Dashboard";

export default function TotalOrcamentosComponent() {
  // const [totalOrcamento, setTotalOrcamento] = useState<TotalOrcamento[]>(
  //   [] as TotalOrcamento[]
  // );
  // const [loading, setLoading] = useState(true);

  // async function handleGetTotalOrcamento() {
  //   const reqGet = await getOrcamentoTotal();

  //   setTotalOrcamento(reqGet.data[0].total);
  // }

  // useEffect(() => {
  //   handleGetTotalOrcamento();
  //   setLoading(false);
  // }, []);

  // const valorFormatado = totalOrcamento.toLocaleString();
  const { loading, valorTotalOrcamento } = useDashboard();
  const [colour, setColour] = useState("#FEFEFE");

  const vlrATratar = valorTotalOrcamento * 1;
  const vlrTratado = vlrATratar
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
    .split(",")[0];

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
        flex={1}
      >
        <Box flex={1}>
          <Text
            w={"200px"}
            mb={1}
            sx={{ fontSize: 16, fontWeight: "bold", alignSelf: "center" }}
            color="#000000"
          >
            Total de Orçamento
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
              sx={{ fontSize: 16, fontWeight: "600", alignSelf: "center" }}
              color="#000000"
            >
              {!loading && valorTotalOrcamento === 0 ? (
                <p>
                  R$ <span style={{ color: "#9EE09E" }}>0,00</span>
                </p>
              ) : (
                <div>
                  {vlrTratado.substring(0, 2)}
                  <span style={{ color: "#9EE09E" }}>
                    {vlrTratado.substring(2)}
                  </span>
                </div>
              )}
            </Text>
          </Box>
        </Box>
        <Box
          // sx={{ height: "100%", alignItems: "center" }}
          style={{
            background: "#9EE09E",
            width: "62px",
            height: "48px",
            left: "266px",
          }}
        >
          <AiOutlineRise
            color={colour}
            size={50}
            onMouseEnter={() => setColour("#5E94F6")}
            onMouseLeave={() => setColour("#FEFEFE")}
          />
        </Box>
      </Box>
    </Flex>
  );
}
