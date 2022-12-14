import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import PieChartGraphic from "./PieChartGraph";

export default function Performance() {
  return (
    <Box
      py={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
      px={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
      w={"90%"}
      bg={"white"}
      boxShadow={{
        base: "none",
        sm: useColorModeValue("md", "md-dark"),
      }}
      borderRadius={"xl"}
      display={"flex"}
      flexDirection={"column"}
      flex={1}
    >
      <Flex bg={"white"} justifyContent="space-between" dir="column">
        <Flex
          direction={"row"}
          justify={"center"}
          align={"flex-start"}
          gap={12}
        >
          <Flex direction={"column"}>
            <Text
              sx={{
                fontSize: 24,
                fontWeight: "700",
                fontFamily: "Mulish",
                width: "100%",
                textAlign: "flex-end",
              }}
              color="black"
            >
              Performance
            </Text>
            <Flex ml={-100} mt={-70}>
              <PieChartGraphic />
            </Flex>
          </Flex>
          <Flex direction={"column"} mb={20}>
            <Text
              sx={{
                fontSize: 24,
                fontWeight: "700",
                fontFamily: "Mulish",
                width: "100%",
                textAlign: "flex-start",
              }}
              color="black"
            >
              Últimos 6 Meses
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
