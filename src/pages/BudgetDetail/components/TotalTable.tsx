// import { FiPrinter } from "react-icons/fi";
import Moment from "react-moment";

import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Tfoot,
} from "@chakra-ui/react";
import { Totalizacao } from "interfaces/Budgets";
import moment from "moment";

import { formatDate } from "utils/formatDate";
import { formatReal } from "utils/formatReal";
import { formatUSD } from "utils/formatUSD";
Moment.globalLocale = "pt-br";

export function TotalTable(props: { data: Totalizacao | undefined }) {
  const { data } = props;

  return (
    <>
      <TableContainer mt={4} mb={3} ml={1}>
        <Table variant="striped" colorScheme={"strippedGray"}>
          <Thead>
            <Tr background={"origem.500"} color="white">
              <Th color="white">Item</Th>
              <Th align="right" color="white" maxWidth="1.5">
                {/* <Button
                  className={"noprint"}
                  variant="outline"
                  onClick={() => window.print()}
                >
                  Imprimir
                  <IconButton
                    color={"white"}
                    backgroundColor="transparent"
                    aria-label="imprimir"
                    icon={<FiPrinter />}
                  />
                </Button>  */}
              </Th>
              <Th color="white" textAlign="right">
                Valor
              </Th>
            </Tr>
          </Thead>
          <Tbody scrollBehavior={"smooth"}>
            <Tr>
              <Td>Início das Atividades</Td>
              <Td></Td>
              <Td textAlign="right">
                {data?.inicio ? formatDate(new Date(data?.inicio)) : "-"}
              </Td>
            </Tr>
            <Tr>
              <Td>Data Atual (Final)</Td>
              <Td></Td>
              <Td textAlign="right">
                {" "}
                {data?.fim ? formatDate(new Date(data?.fim)) : "-"}{" "}
              </Td>
            </Tr>
            <Tr>
              <Td>Dias de Operação</Td>
              <Td></Td>
              <Td textAlign="right">
                {data?.inicio && data?.fim ? (
                  <Moment diff={moment(data?.inicio)} unit="days">
                    {moment(data?.fim).toISOString()}
                  </Moment>
                ) : (
                  "-"
                )}
              </Td>
            </Tr>

            <Tr>
              <Td>Custo Diario Acumulado R$</Td>
              <Td></Td>
              <Td textAlign="right">
                {formatReal(data?.custoDiarioTotalBRL || 0)}
              </Td>
            </Tr>
            <Tr>
              <Td>Custo Diario Acumulado US$</Td>
              <Td></Td>
              <Td textAlign="right">
                {formatUSD(data?.custoDiarioTotalUSD || 0)}
              </Td>
            </Tr>

            <Tr>
              <Td>Custo Total Realizado R$</Td>
              <Td></Td>
              <Td textAlign="right">
                {formatReal(data?.custoTotalRealizadoBRL || 0)}
              </Td>
            </Tr>

            <Tr>
              <Td>Custo Total Realizado US$</Td>
              <Td></Td>
              <Td textAlign="right">
                {formatUSD(data?.custoTotalRealizadoUSD || 0)}
              </Td>
            </Tr>

            <Tr>
              <Td>Custo Total Previsto R$</Td>
              <Td></Td>
              <Td textAlign="right">
                {formatReal(data?.custoTotalTotalPrevistoBRL || 0)}
              </Td>
            </Tr>

            <Tr>
              <Td>Custo Total Previsto US$</Td>
              <Td></Td>
              <Td textAlign="right">
                {formatUSD(data?.custoTotalTotalPrevistoUSD || 0)}
              </Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr background={"origem.500"} color="white">
              <Th colSpan={2} color="white">
                Total R$
              </Th>
              <Th color="white" textAlign="right">
                {formatReal(data?.totalBRL || 0)}
              </Th>
            </Tr>
            <Tr background={"origem.500"} color="white">
              <Th colSpan={2} color="white" borderBottomLeftRadius={"10px"}>
                Total US$
              </Th>
              <Th
                color="white"
                borderBottomRightRadius={"10px"}
                textAlign="right"
              >
                {formatUSD(data?.totalUSD || 0)}
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
}
