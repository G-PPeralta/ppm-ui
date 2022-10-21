/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";

import { Flex, Heading, Text } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import ContainerPagina from "components/ContainerPagina";
import Sidebar from "components/SideBar";
import TituloPagina from "components/TituloPagina";

import { useBudgetDetail } from "hooks/useBudgetDetail";

import { BudgetDetailTable } from "./components/BudgetDetailTable";
import ModalCustoDiario from "./components/ModalCustoDiario";
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
          <ContainerPagina>
            <TituloPagina botaoVoltar={true}>
              Gerencial do Orçamento
            </TituloPagina>

            <Heading
              as="h3"
              size="md"
              fontFamily={"Mulish"}
              fontWeight={"bold"}
              noOfLines={1}
            >
              {titulo?.sonda_nome}
            </Heading>
            <Text>{titulo?.poco_nome}</Text>
            <ModalCustoDiario id={id} />

            <BudgetDetailTable data={budgetFilter} />
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
