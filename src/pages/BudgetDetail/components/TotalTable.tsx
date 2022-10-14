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

import { formatDate } from "utils/formatDate";
import { formatReal } from "utils/formatReal";
Moment.globalLocale = "pt-br";

export function TotalTable(props: { data: Totalizacao | undefined }) {
  const { data } = props;

  return (
    <>
      <TableContainer mt={4} mb={3} ml={1}>
        <Table variant="striped">
          <Thead>
            <Tr backgroundColor={"blue"} color="white">
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
              <Th color="white" align="center">
                Valor
              </Th>
            </Tr>
          </Thead>
          <Tbody scrollBehavior={"smooth"}>
            <Tr>
              <Td>Inicio das Atividades</Td>
              <Td></Td>
              <Td> {formatDate(new Date(data?.inicio || "now()"))}</Td>
            </Tr>
            <Tr>
              <Td>Data Atual (Final)</Td>
              <Td></Td>
              <Td> {formatDate(new Date(data?.fim || "now()"))} </Td>
            </Tr>
            <Tr>
              <Td>Dias de Operação</Td>
              <Td></Td>
              <Td>
                <Moment from={data?.inicio} date={data?.fim} />
              </Td>
            </Tr>

            <Tr>
              <Td>Custo Diario Acumulado R$</Td>
              <Td></Td>
              <Td>{formatReal(data?.custoDiarioTotalBRL || 0)}</Td>
            </Tr>
            <Tr>
              <Td>Custo Diario Acumulado US$</Td>
              <Td></Td>
              <Td>{formatReal(data?.custoDiarioTotalUSD || 0)}</Td>
            </Tr>

            <Tr>
              <Td>Custo Total Realizado R$</Td>
              <Td></Td>
              <Td>{formatReal(data?.custoTotalRealizadoBRL || 0)}</Td>
            </Tr>

            <Tr>
              <Td>Custo Total Realizado US$</Td>
              <Td></Td>
              <Td>{formatReal(data?.custoTotalRealizadoUSD || 0)}</Td>
            </Tr>

            <Tr>
              <Td>Custo Total Previsto R$</Td>
              <Td></Td>
              <Td>{formatReal(data?.custoTotalTotalPrevistoBRL || 0)}</Td>
            </Tr>

            <Tr>
              <Td>Custo Total Previsto U$</Td>
              <Td></Td>
              <Td>{formatReal(data?.custoTotalTotalPrevistoUSD || 0)}</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr backgroundColor={"blue"} color="white">
              <Th colSpan={2} color="white" borderBottomLeftRadius={"10px"}>
                Total
              </Th>
              <Th color="white" borderBottomRightRadius={"10px"}>
                -
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
}
