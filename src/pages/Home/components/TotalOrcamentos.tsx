//  CRIADO EM: 6/2022
//  AUTOR: Bruno Fracaro, Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Valores totais dashboard.

import { useState } from "react";
import { AiOutlineRise } from "react-icons/ai";

import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import { useDashboard } from "contexts/Dashboard";

export default function TotalOrcamentosComponent() {
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
            sx={{
              fontSize: 18,
              fontWeight: "700",
              fontFamily: "Mulish",
              alignSelf: "center",
            }}
            color="#000000"
          >
            Total de Orçamento
          </Text>
          <Box sx={{ display: "flex" }}>
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
