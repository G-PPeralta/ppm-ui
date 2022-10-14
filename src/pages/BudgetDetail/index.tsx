/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";

import {
  Box,
  Flex,
  Heading,
  Stack,
  useBreakpointValue,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";

import { useBudgetDetail } from "hooks/useBudgetDetail";

import { BudgetDetailTable } from "./components/BudgetDetailTable";
import { TotalTable } from "./components/TotalTable";

import "./budgetDetail.css";

export function BudgetDetail() {
  const { id } = useParams();

  const { budgetFilter, titulo, totalizacao, loading } = useBudgetDetail(
    id || null
  );

  return (
    <div>
      <Sidebar>
        {!loading ? (
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
                <Heading as="h2" size="lg" textAlign={"start"}>
                  Gerencial do Orçamento
                </Heading>

                <Heading as="h3" size="md" noOfLines={1}>
                  {titulo?.sonda_nome}
                </Heading>
                <Text>{titulo?.poco_nome}</Text>

                <BudgetDetailTable data={budgetFilter} />
                <TotalTable data={totalizacao} />
              </Box>
            </Flex>
          </Stack>
        ) : (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}
      </Sidebar>
    </div>
  );
}
