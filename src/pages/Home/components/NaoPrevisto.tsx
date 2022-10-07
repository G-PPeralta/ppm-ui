import { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { TotalNaoPrevisto } from "interfaces/Services";

import { getTotalNaoPrevisto } from "services/get/Dashboard";

export default function NaoPrevistoComponent() {
  const [totalNaoPrevisto, setTotalNaoPrevisto] = useState<TotalNaoPrevisto[]>(
    [] as TotalNaoPrevisto[]
  );
  const [loading, setLoading] = useState(false);

  async function handleGetTotalNaoPrevisto() {
    setLoading(true);
    const reqGet = await getTotalNaoPrevisto();

    setTotalNaoPrevisto(reqGet.data[0].totalNaoPrevisto);
    setLoading(false);
  }

  useEffect(() => {
    handleGetTotalNaoPrevisto();
    setLoading(false);
  }, []);

  const valorFormatado = totalNaoPrevisto && totalNaoPrevisto.toLocaleString();
  return (
    <Stack spacing="8">
      <Flex
        w={"100%"}
        align="center"
        justify="center"
        bg={useBreakpointValue({ base: "white", sm: "#EDF2F7" })}
      >
        <Box
          py={{ base: "0", sm: "4" }}
          px={{ base: "0", sm: "4" }}
          w={"100%"}
          bg={useBreakpointValue({ base: "transparent", sm: "white" })}
          boxShadow={{
            base: "none",
            sm: useColorModeValue("md", "md-dark"),
          }}
          borderRadius={{ base: "none", sm: "xl" }}
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
                sx={{ fontSize: 16, fontWeight: "600", alignSelf: "center" }}
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
                  {!loading && valorFormatado}
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
                10%
              </Text>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Stack>
  );
}
