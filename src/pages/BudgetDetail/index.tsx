//  CRIADO EM: 07/2022
//  AUTOR: Felipe Mateus
//  DESCRIÇÃO DO ARQUIVO: Tela de orçamento detalhado.

/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";

import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import ContainerPagina from "components/ContainerPagina";
import Sidebar from "components/SideBar";
import TituloPagina from "components/TituloPagina";

import { useBudgetDetail } from "hooks/useBudgetDetail";

import { BudgetDetailTable } from "./components/BudgetDetailTable";
import { TotalTable } from "./components/TotalTable";

import "./budgetDetail.css";

export function BudgetDetail() {
  const { id } = useParams();

  const { budgetFilter, titulo, totalizacao, loading, toogleRender } =
    useBudgetDetail(id || null);

  return (
    <div>
      <Sidebar>
        {!loading ? (
          <ContainerPagina>
            <Flex mt={-2} ml={-5} mb={-7}>
              <TituloPagina botaoVoltar={true}>
                Acompanhamento Financeiro
              </TituloPagina>
            </Flex>
            <Flex>
              <Box p="4">
                <Heading
                  fontFamily={"Mulish"}
                  fontWeight={"700"}
                  fontSize={"24px"}
                  noOfLines={1}
                >
                  {titulo?.sonda_nome}
                </Heading>
                <Text
                  fontFamily={"Mulish"}
                  fontWeight={"400"}
                  fontSize={"20px"}
                >
                  {titulo?.poco_nome}
                </Text>
              </Box>
              <Spacer />
            </Flex>
            <BudgetDetailTable
              data={budgetFilter}
              toogleRender={toogleRender}
            />
            <TotalTable data={totalizacao} />
          </ContainerPagina>
        ) : (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}
      </Sidebar>
    </div>
  );
}
