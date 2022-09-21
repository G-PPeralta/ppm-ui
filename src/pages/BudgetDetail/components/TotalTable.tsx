import { FiPrinter } from "react-icons/fi";

import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  IconButton,
  Tbody,
  Text,
} from "@chakra-ui/react";
import { BudgetDetail } from "models/Budget.model";

export function TotalTable(props: { data: BudgetDetail[] }) {
  return (
    <>
      <TableContainer mt={4} mb={3} ml={1}>
        <Table variant="striped">
          <Thead>
            <Tr backgroundColor={"blue"} color="white">
              <Th color="white">Item</Th>
              <Th color="white" maxWidth="1.5">
                <Text className={"noprint"}>
                  Imprimir
                  <IconButton
                    color={"white"}
                    backgroundColor="transparent"
                    aria-label="imprimir"
                    icon={<FiPrinter />}
                    onClick={() => window.print()}
                  />
                </Text>
              </Th>
              <Th color="white" align="center">
                Valor
              </Th>
            </Tr>
          </Thead>
          <Tbody scrollBehavior={"smooth"}>
            <Tr>
              <Td>Inicio das Atividades</Td>
              <Td></Td>
              <Td>23/04/2022</Td>
            </Tr>
            <Tr>
              <Td>Data Atual (Final)</Td>
              <Td></Td>
              <Td>23/04/2022</Td>
            </Tr>
            <Tr>
              <Td>Dias de Operação</Td>
              <Td></Td>
              <Td>-</Td>
            </Tr>

            <Tr>
              <Td>Custo Diario Acumulado R$</Td>
              <Td></Td>
              <Td>-</Td>
            </Tr>
            <Tr>
              <Td>Custo Diario Acumulado US$</Td>
              <Td></Td>
              <Td>-</Td>
            </Tr>

            <Tr>
              <Td>Custo Total Realizado R$</Td>
              <Td></Td>
              <Td>-</Td>
            </Tr>

            <Tr>
              <Td>Custo Total Realizado US$</Td>
              <Td></Td>
              <Td>-</Td>
            </Tr>

            <Tr>
              <Td>Custo Total Previsto R$</Td>
              <Td></Td>
              <Td>-</Td>
            </Tr>

            <Tr>
              <Td>Custo Total Previsto U$</Td>
              <Td></Td>
              <Td>-</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
