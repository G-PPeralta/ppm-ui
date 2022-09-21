import {
  Box,
  Flex,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import Sidebar from "components/SideBar";

import { useBudgetDetail } from "hooks/useBudgetDetail";

import { BudgetDetailTable } from "./components/BudgetDetailTable";
import { TotalTable } from "./components/TotalTable";

// const OBJETO = [
//   {
//     atividade: "Sonda Worker",
//     data: "14/08/2022",
//     BRT: "1",
//     servicos: {
//       id: "1",
//       nome: "Mobilização/Desmobilização",
//       fornecedor: "-",
//       total: 1,
//       previsto: 1,
//       realizado: 1,
//     },
//   },
// ];

export function BudgetDetail() {
  const { budgetFilter } = useBudgetDetail();

  return (
    <div>
      <Sidebar>
        <Stack spacing="8">
          <Flex
            w={useBreakpointValue({ base: "100%", md: "auto" })}
            align="center"
            justify="center"
            bg={useBreakpointValue({ base: "white", sm: "#EDF2F7" })}
          >
            <Box
              py={{ base: "0", sm: "16" }}
              px={{ base: "4", sm: "10" }}
              w={useBreakpointValue({
                base: "20rem",
                sm: "35rem",
                md: "60rem",
                lg: "80rem",
              })}
              bg={useBreakpointValue({ base: "transparent", sm: "white" })}
              boxShadow={{
                base: "none",
                sm: useColorModeValue("md", "md-dark"),
              }}
              borderRadius={{ base: "none", sm: "xl" }}
            >
              <BudgetDetailTable data={budgetFilter} />
              <TotalTable data={budgetFilter} />
            </Box>
          </Flex>
        </Stack>
      </Sidebar>
    </div>
  );
}
